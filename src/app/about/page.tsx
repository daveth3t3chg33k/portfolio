import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { education } from "@/lib/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dave Kamirah — CodeSavant. Full-stack engineer in Nairobi, founder of LoyalMini, frontend at Drift Consult, and a deliberate student of the low-level layer: C, Rust, WebAssembly and Linux.",
};

const principles = [
  {
    index: "01",
    title: "Ship the decision",
    body: "Software without a point of view is just plumbing. Every screen should commit to something — a default, an ordering, a clear next step.",
  },
  {
    index: "02",
    title: "Measure before claiming",
    body: "A profile, an EXPLAIN plan, a real timing — not a vibe. If I can't measure it, I don't get to call it fast.",
  },
  {
    index: "03",
    title: "Know one layer down",
    body: "React is fine until the render is slow; Node is fine until the event loop stalls. The fix usually lives one layer below the framework.",
  },
  {
    index: "04",
    title: "Boring where it counts",
    body: "Payments, auth and money movement should be unremarkable. Novelty belongs in the product, not in the settlement path.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="03"
        label="About"
        title={
          <>
            A craftsman&apos;s <em className="italic-signal">tool</em>
          </>
        }
        lede="Sharp, specific, built to be used. I work the whole surface — the architecture underneath and the milliseconds of feel on top."
        meta={[
          { k: "Based", v: "Nairobi, Kenya — EAT+03" },
          { k: "Founding", v: "LoyalMini" },
          { k: "Currently", v: "Frontend @ Drift Consult" },
          { k: "Studied", v: "Computer Science" },
        ]}
        action={{ label: "Read the stack", href: "/stack" }}
      />

      <AboutSection />
      <ExperienceSection />

      {/* education + principles */}
      <section className="border-t border-hairline bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="overline-label mb-5">Education</p>
              <h2 className="font-display text-3xl leading-tight md:text-4xl">
                {education.field}
              </h2>
              <p className="mt-3 text-muted">{education.focus}</p>
              <p className="mt-4 text-sm text-faint">{education.note}</p>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="overline-label mb-6">How I work</p>
              <div className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {principles.map((p) => (
                  <article key={p.index} className="border-t border-hairline py-6">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal">
                      {p.index}
                    </p>
                    <h3 className="mt-2 font-display text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.body}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/work" className="arrow-link text-foreground">
                  See what I&apos;ve built <span className="arrow">→</span>
                </Link>
                <Link href="/contact" className="arrow-link">
                  Get in touch <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
