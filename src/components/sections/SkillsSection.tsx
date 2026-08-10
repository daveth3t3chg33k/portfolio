/* Stack index — a taxonomy, not progress bars. Skills are listed, never measured. */

const stack: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"] },
  { category: "Backend", items: ["Node.js", "Express", "REST", "GraphQL", "PostgreSQL", "MongoDB"] },
  { category: "ML & Data", items: ["Python", "TensorFlow", "TensorFlow.js", "Pandas", "SQL"] },
  { category: "Web3", items: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "DApps"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="overline-label mb-5">03 / The Stack</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              Tools I reach for
            </h2>
          </div>
          <p className="max-w-sm text-muted md:col-span-4">
            Listed, not measured. Percentages next to skills are a lie — what
            matters is what ships.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div
              key={group.category}
              className="border border-hairline p-7 transition-colors duration-300 hover:border-signal/50"
            >
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
                {group.category}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between text-[0.95rem] text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    <span>{item}</span>
                    <span className="text-faint" aria-hidden="true">
                      —
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
