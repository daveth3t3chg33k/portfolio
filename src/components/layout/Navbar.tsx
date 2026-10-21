"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, site } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          href="/"
          className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground"
          aria-label={`${site.name} — home`}
        >
          Dave Kamirah
          <span className="ml-2 text-faint">/ {site.alias}</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navItems.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`h-[5px] w-[5px] transition-colors ${
                    active ? "bg-signal" : "bg-hairline group-hover:bg-muted"
                  }`}
                  aria-hidden="true"
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <a
          href={`mailto:${site.email}`}
          className="hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-foreground transition-colors hover:text-signal md:inline-flex md:items-center md:gap-1.5"
        >
          Email <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* mobile row — every page stays one tap away */}
      <nav
        className="flex items-center justify-between gap-2 border-t border-hairline px-5 py-3 md:hidden"
        aria-label="Primary mobile"
      >
        {navItems.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] ${
                active ? "text-foreground" : "text-muted"
              }`}
            >
              <span
                className={`h-[4px] w-[4px] ${active ? "bg-signal" : "bg-hairline"}`}
                aria-hidden="true"
              />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
