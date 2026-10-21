import Image from "next/image";
import { site } from "@/lib/site";

/* Statement first, portrait second, facts as a quiet ledger. */

const facts = [
  { k: "Based", v: "Nairobi, Kenya — EAT+03" },
  { k: "Founding", v: "LoyalMini — loyalty × M-PESA" },
  { k: "Currently", v: "Frontend @ Drift Consult (Rack)" },
  { k: "Studied", v: "Computer Science" },
  { k: "Digging into", v: "C, Rust, WebAssembly, Linux" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1400px] px-5 py-16 md:px-10 md:py-24"
    >
      <p className="overline-label">About</p>

      <h2 className="mt-8 max-w-4xl font-display text-4xl leading-[1] md:text-[3.6rem]">
        I write software the way a craftsman treats a tool —{" "}
        <em className="italic-signal">sharp, specific, built to be used</em>.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="space-y-6 text-base leading-relaxed text-muted md:col-span-6 md:text-lg">
          <p>
            I&apos;m Dave — also known as{" "}
            <span className="text-foreground">{site.alias}</span>. I started with
            the MERN stack and kept pulling threads: machine learning, smart
            contracts, real-time systems. What ties it together isn&apos;t the
            tech — it&apos;s the conviction that software should make a decision
            and commit to it.
          </p>
          <p>
            Right now I&apos;m founding{" "}
            <a
              href={site.startup.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground"
            >
              {site.startup.name}
            </a>
            , a loyalty engine for Kenyan retail where shoppers earn points
            automatically with Lipa Na M-PESA — and shipping{" "}
            <a
              href={site.employer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground"
            >
              {site.employer.product}
            </a>
            , a cloud POS that connects physical retail with e-commerce.
          </p>
          <p>
            I care about the whole surface: the architecture under the hood and
            the milliseconds of feel on top. Every project I touch gets both —
            which is why the study never stopped at the framework. C and Rust
            for the cost of a pointer, Linux and TCP for what a request really
            is, query plans for why a page got slow. The abstractions are fine;
            I just refuse to treat them as magic.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <figure>
            <div className="relative overflow-hidden border border-hairline bg-paper-2">
              <Image
                src="/portrait.webp"
                alt="Dave Kamirah — founder of LoyalMini, frontend developer"
                width={800}
                height={1065}
                loading="lazy"
                className="h-auto w-full grayscale transition-all duration-700 ease-out hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-2.5 flex items-baseline justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
              <span>Dave Kamirah — Nairobi</span>
              <span className="text-signal">LoyalMini founder</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-x-10 border-b border-hairline md:grid-cols-5">
        {facts.map((f) => (
          <div key={f.k} className="border-t border-hairline py-4">
            <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
              {f.k}
            </dt>
            <dd className="mt-1.5 text-sm text-foreground">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
