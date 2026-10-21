import Link from "next/link";
import { lowLevel } from "@/lib/stack";

/* The layer most portfolios skip — what sits under the framework. */

export default function LowLevelSection() {
  return (
    <section
      id="low-level"
      className="border-y border-hairline bg-paper"
      aria-label="Low-level experience"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="overline-label">Under the abstraction</p>
          <p className="max-w-xs font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
            The cost model that outlives every framework
          </p>
        </div>

        <h2 className="max-w-3xl font-display text-4xl leading-[1] md:text-6xl">
          Low-level, <em className="italic-signal">on purpose</em>.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-14 md:grid-cols-2">
          {lowLevel.map((note) => (
            <article key={note.index} className="border-t border-hairline py-7">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.6rem] tabular-nums text-signal">
                  {note.index}
                </span>
                <h3 className="font-display text-xl leading-tight md:text-2xl">
                  {note.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {note.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {note.keywords.map((k) => (
                  <li
                    key={k}
                    className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-6">
          <p className="max-w-xl text-sm text-muted">
            Not a list of buzzwords — a working habit. It shows up as schema
            choices, payload sizes, cache headers and the number of round-trips
            a page takes.
          </p>
          <Link href="/work" className="arrow-link text-foreground">
            See it in the work <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
