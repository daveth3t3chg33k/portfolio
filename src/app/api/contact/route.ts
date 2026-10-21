import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/* The contact form posts here; this handler sends the mail through Resend.
   The API key never leaves the server.

   POST { name, email, message, company }
   `company` is a honeypot — a real person never fills it in.

   200 delivered · 400 bad input · 429 throttled
   501 no mail credentials on this deployment · 502 provider refused */

const RESEND_ENDPOINT =
  process.env.RESEND_API_URL ?? "https://api.resend.com/emails";

const LIMITS = { name: 120, email: 200, message: 5000 };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function allow(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = { name: string; email: string; message: string };

function read(body: unknown): Payload | string {
  if (typeof body !== "object" || body === null) return "Malformed submission.";
  const { name, email, message, company } = body as Record<string, unknown>;

  if (typeof company === "string" && company.trim() !== "") {
    return "Malformed submission.";
  }
  if (typeof name !== "string" || name.trim().length < 2) {
    return "A name helps me answer properly.";
  }
  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return "That email address doesn't look right.";
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return "Tell me a little more — ten characters at least.";
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return "That message is longer than the form can carry. Email me directly.";
  }

  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );
}

function compose({ name, email, message }: Payload) {
  const paragraphs = escapeHtml(message)
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1a1a1a">${p.replace(
          /\n/g,
          "<br />"
        )}</p>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 24px;background:#f4f2ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto">
      <tr>
        <td style="border-top:1px solid #d8d4c8;padding:20px 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a8578">
          Portfolio enquiry — ${escapeHtml(site.name)}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 24px">
          <h1 style="margin:0;font-size:26px;line-height:1.2;color:#111">${escapeHtml(name)}</h1>
          <a href="mailto:${escapeHtml(email)}" style="display:inline-block;margin-top:6px;font-size:14px;color:#b03a1c;text-decoration:none">${escapeHtml(email)}</a>
        </td>
      </tr>
      <tr>
        <td style="border-top:1px solid #d8d4c8;padding-top:24px">${paragraphs}</td>
      </tr>
      <tr>
        <td style="border-top:1px solid #d8d4c8;padding-top:16px;font-size:12px;color:#8a8578">
          Sent from the contact form at ${escapeHtml(site.alias)}. Reply directly to this email to answer ${escapeHtml(name)}.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Portfolio enquiry — ${site.name}`,
    "",
    `${name} <${email}>`,
    "",
    message,
    "",
    "Reply directly to this email to answer.",
  ].join("\n");

  return { html, text, subject: `Portfolio enquiry — ${name}` };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? `Portfolio <onboarding@resend.dev>`;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        message: "Direct sending isn't configured on this deployment.",
      },
      { status: 501 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
        message: "A few messages in a row already — try again in ten minutes.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body", message: "Malformed submission." },
      { status: 400 }
    );
  }

  const payload = read(body);
  if (typeof payload === "string") {
    return NextResponse.json(
      { ok: false, error: "invalid_fields", message: payload },
      { status: 400 }
    );
  }

  const { html, text, subject } = compose(payload);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("[contact] provider unreachable", error);
    return NextResponse.json(
      {
        ok: false,
        error: "provider_unreachable",
        message: "Couldn't reach the mail service. Try again in a moment.",
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const detail = (await response.text().catch(() => "")).slice(0, 500);
    console.error(`[contact] provider refused ${response.status}`, detail);
    return NextResponse.json(
      {
        ok: false,
        error: "provider_refused",
        message: "The mail service refused that one. Email me directly instead.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
