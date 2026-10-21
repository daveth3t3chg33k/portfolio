import Link from "next/link";
import { navItems, site, socials } from "@/lib/site";

const elsewhere = [
  { label: "LoyalMini", href: site.startup.href },
  { label: "Rack", href: site.employer.href },
  { label: "GitHub", href: socials[0].href },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 pt-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl leading-none">Dave Kamirah</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Full-stack engineer in Nairobi. Product surfaces, payment rails,
              and the low-level layer underneath both.
            </p>
            <p className="mt-6 flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-faint">
              <span className="live-dot" aria-hidden="true" />
              {site.availability} · {site.location}
            </p>
          </div>

          <nav className="md:col-span-2 md:col-start-7" aria-label="Pages">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Pages
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Elsewhere">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Social">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Social
            </p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-underline text-sm text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-5 md:flex-row md:items-center">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
            © {new Date().getFullYear()} Dave Kamirah
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
            Next.js · TypeScript · set in Geist &amp; Fraunces
          </p>
          <Link
            href="/contact"
            className="arrow-link text-[0.62rem] text-foreground"
          >
            Start a project <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
