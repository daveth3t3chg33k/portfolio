const socials = [
  { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
  { label: "Email", href: "mailto:mburudave@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="hairline-t">
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl leading-none md:text-5xl">
              Software with <em className="italic-signal">a signal</em>.
            </p>
            <p className="mt-4 max-w-sm text-sm text-faint">
              Designed and built by hand — no template, no borrowed UI, no
              purple gradients. Type-led and restrained.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Social">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 hairline-t pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faint">
            © {new Date().getFullYear()} Dave Kamirah · CodeSavant
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faint">
            Next.js · TypeScript · Nairobi, EAT+03
          </p>
          <a
            href="#top"
            className="link-underline font-mono text-[0.68rem] uppercase tracking-[0.15em] text-muted hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
