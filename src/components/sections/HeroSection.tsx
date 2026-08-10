"use client";

import Link from "next/link";

/* Clean editorial hero — no 3D, no typing, just typography and a soft fade-in. */

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      aria-label="Introduction"
    >
      {/* faint oversized backdrop word */}
      <div
        className="pointer-events-none absolute -top-8 left-0 select-none font-display text-[24vw] leading-none text-paper-2/60 md:text-[17vw]"
        aria-hidden="true"
      >
        SAVANT
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 md:px-10 md:pb-20">
        <p
          className="overline-label mb-6"
          style={{ animation: "rise-in .7s .1s both" }}
        >
          Dave Kamirah · Nairobi · Open to work
        </p>

        <h1
          className="max-w-5xl font-display text-[13.5vw] leading-[0.95] md:text-7xl lg:text-8xl"
          style={{ animation: "rise-in .8s .2s both" }}
        >
          Software with
          <br />
          <em className="italic-signal">a signal</em>
          <span className="caret" aria-hidden="true" />
        </h1>

        <p
          className="mt-7 max-w-xl text-lg text-muted md:text-xl"
          style={{ animation: "rise-in .8s .3s both" }}
        >
          I&apos;m Dave — a full-stack engineer building products that don&apos;t
          just work — they carry intent. From MERN platforms and ML tooling to
          smart contracts, I ship systems with a point of view.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4"
          style={{ animation: "rise-in .8s .4s both" }}
        >
          <Link href="#work" className="btn-signal">
            See the work
            <span className="arrow">→</span>
          </Link>
          <a href="#contact" className="btn-ghost">
            Start a project
          </a>
        </div>

        {/* proof row */}
        <dl
          className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4"
          style={{ animation: "rise-in .8s .5s both" }}
        >
          {[
            ["7+", "projects shipped"],
            ["LoyalMini", "my startup — loyalty × M-PESA"],
            ["3", "core stacks — MERN, ML, Web3"],
            ["∞", "curiosity budget"],
          ].map(([num, label]) => (
            <div key={label} className="hairline-t pt-4">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl text-foreground">{num}</dd>
              <dd className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faint">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
