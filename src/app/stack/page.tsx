import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SkillsSection from "@/components/sections/SkillsSection";
import LowLevelSection from "@/components/sections/LowLevelSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "The full stack — frontend, backend and data, ML, Web3, and the low-level layer underneath: C, Rust, WebAssembly, Linux, concurrency, query plans and profiling.",
};

export default function StackPage() {
  return (
    <>
      <PageHeader
        index="02"
        label="Stack"
        title={
          <>
            Top to <em className="italic-signal">bottom</em>
          </>
        }
        lede="Eight languages, five layers. Listed by where they sit in the machine — not by how confident a progress bar says I am."
        meta={[
          { k: "Languages", v: "TypeScript · Python · Solidity · C · Rust" },
          { k: "Frontend", v: "React · Next.js · TypeScript" },
          { k: "Backend", v: "Node · Postgres · MongoDB" },
          { k: "Low-level", v: "C · Rust · WASM · Linux" },
        ]}
        action={{ label: "See the work", href: "/work" }}
      />

      <SkillsSection />
      <LowLevelSection />

      <section className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="overline-label mb-5">How it compounds</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              A low-level habit is a{" "}
              <em className="italic-signal">cheap habit</em> — it just pays out
              later.
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="btn-ghost">
              About me
            </Link>
            <Link href="/contact" className="btn-signal">
              Work together <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
