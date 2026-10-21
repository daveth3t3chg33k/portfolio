import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import { ProjectIndex } from "@/components/sections/ProjectsSection";
import { StackPreview } from "@/components/sections/SkillsSection";
import { featuredProjects, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* selected work */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <p className="overline-label">Selected work</p>
          <Link href="/work" className="arrow-link text-foreground">
            All {String(projects.length).padStart(2, "0")} projects{" "}
            <span className="arrow">→</span>
          </Link>
        </div>

        <ProjectIndex items={featuredProjects} mode="link" />
      </section>

      {/* about + stack */}
      <section className="border-y border-hairline bg-paper">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-14 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-5">
            <p className="overline-label">About</p>
            <h2 className="mt-6 font-display text-4xl leading-[1] md:text-[3.2rem]">
              The surface and{" "}
              <em className="italic-signal">the machine</em> under it.
            </h2>
            <p className="mt-6 max-w-md text-muted">
              I&apos;m Dave — a full-stack engineer in Nairobi, founder of{" "}
              <a
                href={site.startup.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-foreground"
              >
                {site.startup.name}
              </a>
              , frontend at {site.employer.name}. I started with the MERN stack
              and kept pulling threads — ML, smart contracts, and now C, Rust and
              WebAssembly, because the cost model underneath never changes.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/about" className="arrow-link text-foreground">
                More about me <span className="arrow">→</span>
              </Link>
              <Link href="/work" className="arrow-link">
                The work <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Stack, top to bottom
            </p>
            <div className="mt-4">
              <StackPreview />
            </div>
            <Link href="/stack" className="arrow-link mt-6 inline-flex">
              Systems &amp; low-level detail <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p className="overline-label">Contact</p>

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <a
              href={`mailto:${site.email}`}
              className="inline-block font-display text-[8.5vw] leading-[0.92] tracking-[-0.04em] transition-colors hover:text-signal md:text-6xl lg:text-7xl"
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-md text-muted">
              I reply to every real message — usually within 24 hours. Hiring,
              partnering, or arguing about stack choices: same door.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <Link href="/contact" className="btn-signal w-full justify-between">
              Start a project <span className="arrow">→</span>
            </Link>
            <dl className="mt-8 space-y-4">
              {[
                ["Phone", site.phone],
                ["Location", site.location],
                ["Status", site.availability],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
