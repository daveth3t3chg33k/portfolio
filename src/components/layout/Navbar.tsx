"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { index: "01", name: "Work", href: "#work" },
  { index: "02", name: "About", href: "#about" },
  { index: "03", name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md hairline-b" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link
          href="#top"
          className="font-mono text-sm tracking-tight text-foreground"
          aria-label="Back to top"
        >
          <span className="text-signal">dave</span>
          <span className="text-faint">.kamirah</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
            >
              <span className="mr-1.5 text-signal/70">{link.index}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:mburudave@gmail.com"
          className="btn-signal px-4! py-2! text-[0.68rem]"
        >
          Hire me
        </a>
      </div>

      {/* mobile row — three links always visible, no hamburger */}
      <nav
        className="flex justify-around hairline-t px-5 py-3 md:hidden"
        aria-label="Primary mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted"
          >
            <span className="mr-1 text-signal/70">{link.index}</span>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
