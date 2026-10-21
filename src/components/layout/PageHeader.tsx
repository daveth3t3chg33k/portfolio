import Link from "next/link";
import type { ReactNode } from "react";

/* Shared masthead for inner pages — a measured rule, one statement, metadata. */

export default function PageHeader({
  index,
  label,
  title,
  lede,
  meta,
  action,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede: string;
  meta?: { k: string; v: string }[];
  action?: { label: string; href: string };
}) {
  return (
    <header className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
      <div className="flex items-center justify-between gap-4 border-b border-hairline pb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link href="/" className="transition-colors hover:text-foreground">
            Dave Kamirah
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{label}</span>
        </nav>
        <span className="tabular-nums">{index} / 04</span>
      </div>

      <h1
        className="mt-12 max-w-5xl font-display text-[13vw] leading-[0.88] md:text-[7.2vw] lg:text-[6.4rem]"
        style={{ animation: "rise-in .7s .05s both" }}
      >
        {title}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-8 border-t border-hairline pt-7 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted">
            {lede}
          </p>
          {action && (
            <Link
              href={action.href}
              className="arrow-link mt-6 text-foreground"
            >
              {action.label} <span className="arrow">→</span>
            </Link>
          )}
        </div>

        {meta && (
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 md:col-span-6 md:col-start-7 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                  {m.k}
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{m.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
