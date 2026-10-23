import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire Dave Kamirah — full-stack engineering, product frontends and low-level performance work. Email mburudave033@gmail.com or +254 713 969 865.",
};

const steps = [
  {
    index: "01",
    title: "You write",
    body: "A paragraph is enough: what the product is, who it's for, and the deadline you're working against.",
  },
  {
    index: "02",
    title: "I reply",
    body: "Within 24 hours, always within 48 — with questions, a rough shape, and whether I'm the right person.",
  },
  {
    index: "03",
    title: "We scope",
    body: "A short, written scope: what ships first, what it costs, and what we deliberately leave out.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="04"
        label="Contact"
        title={
          <>
            Have a project with <em className="italic-signal">a signal</em>?
          </>
        }
        lede="Hiring, partnering, or arguing about stack choices — same door. Every real message gets a real reply."
        meta={[
          { k: "Based", v: site.location },
          { k: "Timezone", v: "EAT+03 · remote-friendly" },
          { k: "Reply", v: "Within 24 hours" },
          { k: "Status", v: site.availability },
        ]}
        action={{ label: "See the work", href: "/work" }}
      />

      <ContactSection />

      <section className="border-t border-hairline bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <p className="overline-label mb-8">What happens next</p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-3">
            {steps.map((s) => (
              <article key={s.index} className="border-t border-hairline py-7">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal">
                  {s.index}
                </p>
                <h2 className="mt-3 font-display text-2xl">{s.title}</h2>
                <p className="mt-2 text-muted">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-8">
            <p className="max-w-md text-sm text-faint">
              Prefer to see the engineering first? The case files carry the
              detail — problem, trade-offs, stack.
            </p>
            <Link href="/work" className="arrow-link text-foreground">
              Read the case files <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
