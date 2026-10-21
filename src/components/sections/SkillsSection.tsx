import { languages, stack } from "@/lib/stack";

/* Stack index — a taxonomy, not progress bars. Rows and rules, no cards. */

export function StackGroups() {
  return (
    <div className="border-b border-hairline">
      {stack.map((group) => (
        <div
          key={group.category}
          className="grid grid-cols-1 gap-4 border-t border-hairline py-7 md:grid-cols-12 md:gap-8"
        >
          <div className="md:col-span-4">
            <h3 className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground">
              {group.systems && (
                <span className="h-[5px] w-[5px] bg-signal" aria-hidden="true" />
              )}
              {group.category}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm text-faint">
              {group.blurb}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-8">
            {group.items.map((item) => (
              <li
                key={item}
                className="text-[0.95rem] text-muted transition-colors hover:text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const depthStyle: Record<string, string> = {
  daily: "text-signal",
  production: "text-foreground",
  shipped: "text-foreground",
  working: "text-muted",
  foundations: "text-faint",
};

export function LanguagesLedger() {
  return (
    <div>
      <div className="hidden border-b border-hairline pb-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint md:grid md:grid-cols-12 md:gap-6">
        <span className="md:col-span-3">Language</span>
        <span className="md:col-span-7">Where I use it</span>
        <span className="md:col-span-2 md:text-right">Depth</span>
      </div>

      {languages.map((row) => (
        <div
          key={row.language}
          className="grid grid-cols-1 items-baseline gap-1 border-b border-hairline py-4 md:grid-cols-12 md:gap-6"
        >
          <p className="font-display text-lg md:col-span-3">{row.language}</p>
          <p className="text-sm text-muted md:col-span-7">{row.use}</p>
          <p className="md:col-span-2 md:text-right">
            <span
              className={`font-mono text-[0.58rem] uppercase tracking-[0.14em] ${
                depthStyle[row.depth]
              }`}
            >
              {row.depth}
            </span>
          </p>
        </div>
      ))}

      <p className="mt-5 max-w-xl font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
        Labels are honest, not aspirational — “foundations” means studied and
        practised, not billed to a client.
      </p>
    </div>
  );
}

export function StackPreview() {
  return (
    <ul className="border-b border-hairline">
      {stack.map((group) => (
        <li
          key={group.category}
          className="flex flex-col gap-1 border-t border-hairline py-3.5 md:flex-row md:items-baseline md:gap-6"
        >
          <p className="w-44 shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {group.category}
          </p>
          <p className="text-sm text-muted">{group.items.join(" · ")}</p>
        </li>
      ))}
    </ul>
  );
}

/* Full section, used by /stack */
export default function SkillsSection() {
  return (
    <section id="stack" className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <p className="overline-label">The stack</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          Listed, not measured
        </p>
      </div>

      <StackGroups />

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="overline-label">Languages</p>
          <p className="mt-4 max-w-xs text-muted">
            Eight languages, used for different jobs. The depth column is the
            honest part.
          </p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <LanguagesLedger />
        </div>
      </div>
    </section>
  );
}
