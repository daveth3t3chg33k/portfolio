import { roles, type Role } from "@/lib/experience";

const kindLabel: Record<Role["kind"], string> = {
  founder: "Founder",
  work: "Production",
  foundations: "Foundations",
};

function RoleRow({ role }: { role: Role }) {
  return (
    <article className="border-b border-hairline py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {kindLabel[role.kind]}
          </p>
          <h3 className="font-display text-3xl leading-tight md:text-4xl">
            {role.role}
            <span className="text-faint"> — </span>
            {role.href ? (
              <a
                href={role.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-foreground hover:text-signal"
              >
                {role.company}
              </a>
            ) : (
              <span className="text-foreground">{role.company}</span>
            )}
          </h3>
          <p className="mt-4 max-w-xl text-muted">{role.summary}</p>
          <ul className="mt-6 space-y-3">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-signal"
                  aria-hidden="true"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="space-y-4 md:col-span-4 md:col-start-9">
          <div className="border-t border-hairline pt-3">
            <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
              Period
            </dt>
            <dd className="mt-1 text-foreground">{role.period}</dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
              Location
            </dt>
            <dd className="mt-1 text-foreground">{role.location}</dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
              Tools
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {role.stack.map((tool) => (
                <span
                  key={tool}
                  className="border border-hairline px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
                >
                  {tool}
                </span>
              ))}
            </dd>
          </div>
          {role.href && (
            <a
              href={role.href}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link pt-2"
            >
              {new URL(role.href).hostname} <span className="arrow">→</span>
            </a>
          )}
        </dl>
      </div>
    </article>
  );
}

export function ExperienceLedger() {
  return (
    <div>
      {roles.map((role) => (
        <RoleRow key={`${role.company}-${role.role}`} role={role} />
      ))}
    </div>
  );
}

/* Full section, used by /about */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <p className="overline-label">Experience — the ledger</p>
        <p className="max-w-sm font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
          Told through what it shipped
        </p>
      </div>

      <h2 className="max-w-3xl font-display text-4xl leading-[1] md:text-6xl">
        Where I&apos;ve <em className="italic-signal">worked</em>
      </h2>

      <div className="mt-12">
        <ExperienceLedger />
      </div>
    </section>
  );
}
