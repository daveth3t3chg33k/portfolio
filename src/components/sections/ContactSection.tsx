"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/* Contact — posts to /api/contact, which mails the message from the server.
   If the deployment has no mail credentials, the error state hands the same
   text back as a mailto draft so nothing is lost. */

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; code?: string };

const EMPTY = { name: "", email: "", message: "", company: "" };

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const draftHref = () => {
    const subject = encodeURIComponent(
      `Project inquiry from ${form.name || "the site"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${
        form.email ? ` (${form.email})` : ""
      }`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.state === "sending") return;

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (response.ok) {
        setForm(EMPTY);
        setStatus({ state: "sent" });
        return;
      }

      setStatus({
        state: "error",
        message:
          data.message ??
          "The message didn't go through. Try again, or email me directly.",
        code: data.error,
      });
    } catch {
      setStatus({
        state: "error",
        code: "network",
        message: "No connection to the server. Email me directly instead.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-2 md:px-10 md:pb-32 md:pt-4"
    >
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="overline-label">Write</p>
          <h2 className="mt-7 font-display text-4xl leading-[1] md:text-[3.4rem]">
            Tell me what you&apos;re <em className="italic-signal">building</em>.
          </h2>
          <p className="mt-8 max-w-md text-lg text-muted">
            I reply to every real message — usually within 24 hours, always
            within 48. If you&apos;re hiring, partnering, or just want to argue
            about stack choices (or why the query planner ignored your index),
            this is the door.
          </p>

          <div className="mt-10 space-y-0">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-baseline gap-4 border-t border-hairline py-4"
            >
              <span className="w-16 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                Email
              </span>
              <span className="font-display text-xl text-foreground transition-colors group-hover:text-signal md:text-2xl">
                {site.email}
              </span>
              <span className="arrow-link ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                <span className="arrow">→</span>
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="group flex items-baseline gap-4 border-t border-hairline py-4"
            >
              <span className="w-16 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                Phone
              </span>
              <span className="font-display text-xl text-foreground transition-colors group-hover:text-signal md:text-2xl">
                {site.phone}
              </span>
              <span className="arrow-link ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                <span className="arrow">→</span>
              </span>
            </a>
          </div>
        </div>

        {status.state === "sent" ? (
          <div
            className="border-t border-hairline pt-7 md:col-span-5 md:col-start-8"
            aria-live="polite"
          >
            <p className="overline-label">Sent</p>
            <h3 className="mt-7 font-display text-3xl leading-[1.05] md:text-[2.6rem]">
              In the <em className="italic-signal">inbox</em>.
            </h3>
            <p className="mt-6 max-w-sm text-lg text-muted">
              The message is on its way to {site.email}. You&apos;ll get a reply
              within 24 hours — 48 at the outside.
            </p>
            <button
              type="button"
              onClick={() => setStatus({ state: "idle" })}
              className="btn-ghost mt-9"
            >
              Write another →
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border-t border-hairline pt-7 md:col-span-5 md:col-start-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                maxLength={120}
                value={form.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={200}
                value={form.email}
                onChange={handleChange}
                placeholder="you@studio.com"
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint"
              >
                The pitch
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                value={form.message}
                onChange={handleChange}
                placeholder="What are we building?"
                className="field resize-none"
              />
            </div>

            {/* honeypot — off-screen for people, irresistible to bots */}
            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={status.state === "sending"}
              className="btn-signal w-full justify-center disabled:cursor-wait disabled:opacity-70"
            >
              {status.state === "sending" ? "Sending…" : "Send message →"}
            </button>

            <p
              aria-live="polite"
              className={`text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] ${
                status.state === "error" ? "text-signal" : "text-faint"
              }`}
            >
              {status.state === "error" ? (
                <>
                  {status.message}{" "}
                  <a
                    href={draftHref()}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Open a draft
                  </a>
                </>
              ) : (
                "Straight to my inbox — reply within 24h"
              )}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
