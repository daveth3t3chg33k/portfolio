/* Experience as a ledger — role, company, what was actually done. */

const roles = [
  {
    role: "Frontend Developer",
    company: "Drift Consult",
    period: "Jan 2025 — Present",
    location: "Nairobi",
    points: [
      "Frontend for Rack — a cloud POS unifying physical retail with e-commerce",
      "Seamless inventory, payments, and data access across store + online",
      "React + modern frontend tooling, responsive across devices",
    ],
    link: { label: "rack.business", href: "https://www.rack.business/" },
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="overline-label mb-5">04 / Experience</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Where I&apos;ve <em className="italic-signal">worked</em>
          </h2>
        </div>
        <p className="max-w-sm text-muted md:col-span-4">
          One role, told through what it shipped — not a chronological dump.
        </p>
      </div>

      <div className="mt-16 space-y-0">
        {roles.map((r) => (
          <article key={r.company} className="hairline-b py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl leading-tight md:text-4xl">
                  {r.role}
                  <span className="text-faint"> — </span>
                  <a
                    href={r.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-foreground hover:text-signal"
                  >
                    {r.company}
                  </a>
                </h3>
                <ul className="mt-6 space-y-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="space-y-4 md:col-span-4 md:col-start-9">
                {[
                  ["Period", r.period],
                  ["Location", r.location],
                ].map(([k, v]) => (
                  <div key={k} className="hairline-t pt-3">
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                      {k}
                    </dt>
                    <dd className="mt-1 text-foreground">{v}</dd>
                  </div>
                ))}
                <a
                  href={r.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link pt-2"
                >
                  {r.link.label} <span className="arrow">→</span>
                </a>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
