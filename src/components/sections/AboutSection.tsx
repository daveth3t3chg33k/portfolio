"use client";

import Image from "next/image";

/* Editorial statement-first about — clean and static. */

const facts = [
  { k: "Based", v: "Nairobi, Kenya — EAT+03" },
  { k: "Founding", v: "LoyalMini — loyalty × M-PESA" },
  { k: "Currently", v: "Frontend @ Drift Consult (Rack)" },
  { k: "Studied", v: "Computer Science" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32"
    >
      <p className="overline-label mb-5">02 / About</p>

      <h2 className="max-w-4xl font-display text-4xl leading-[1.02] md:text-6xl">
        I write software the way a craftsman treats a tool —{" "}
        <em className="italic-signal">sharp, specific, and built to be used</em>
        .
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-7">
          <p>
            I&apos;m Dave — also known as{" "}
            <span className="text-foreground">CodeSavant</span>. I started with
            the MERN stack and kept pulling threads: machine learning, smart
            contracts, real-time systems. What ties it together isn&apos;t the
            tech — it&apos;s the conviction that software should make a decision
            and commit to it.
          </p>
          <p>
            Right now I&apos;m founding{" "}
            <a
              href="https://loyalmini.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground"
            >
              LoyalMini
            </a>
            , a loyalty engine for Kenyan retail where shoppers earn points
            automatically with Lipa Na M-PESA — and shipping{" "}
            <a
              href="https://www.rack.business/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground"
            >
              Rack
            </a>
            , a cloud POS that connects physical retail with e-commerce.
          </p>
          <p>
            I care about the whole surface: the architecture under the hood and
            the milliseconds of feel on top. Every project I touch gets both.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <figure className="group relative">
            <div className="relative overflow-hidden border border-hairline">
              <Image
                src="/portrait.webp"
                alt="Dave Kamirah — founder of LoyalMini, frontend developer"
                width={800}
                height={1065}
                loading="lazy"
                className="h-auto w-full grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint">
              <span>Dave Kamirah — Nairobi</span>
              <span className="text-signal">LoyalMini founder</span>
            </figcaption>
          </figure>

          <dl className="mt-8 space-y-0">
            {facts.map((f) => (
              <div key={f.k} className="hairline-t py-4">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                  {f.k}
                </dt>
                <dd className="mt-1.5 text-foreground">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
