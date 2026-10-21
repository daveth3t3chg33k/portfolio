import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

/* Hero as a gallery wall: a measured masthead, one statement, one real plate. */

export default function HeroSection() {
  const plate = featuredProjects.find((p) => p.shot) ?? featuredProjects[0];
  const shot = plate.shot;

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto w-full max-w-[1400px] px-5 md:px-10"
    >
      {/* masthead */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-hairline pb-4 pt-28 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint md:grid-cols-4 md:pt-32">
        <div>
          <dt className="sr-only">Role</dt>
          <dd className="text-foreground">{site.role}</dd>
        </div>
        <div>
          <dt className="sr-only">Location</dt>
          <dd>{site.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Availability</dt>
          <dd className="flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            {site.availability}
          </dd>
        </div>
        <div className="md:text-right">
          <dt className="sr-only">Year</dt>
          <dd>Portfolio — {new Date().getFullYear()}</dd>
        </div>
      </dl>

      <h1
        className="mt-12 font-display text-[15.5vw] leading-[0.85] tracking-[-0.045em] md:mt-16 md:text-[9vw] lg:text-[8.4rem]"
        style={{ animation: "rise-in .8s .05s both" }}
      >
        Software
        <br />
        with <em className="italic-signal">a signal</em>.
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-hairline pt-7 md:mt-16 md:grid-cols-12">
        <p
          className="max-w-md text-lg leading-relaxed text-muted md:col-span-6"
          style={{ animation: "rise-in .8s .15s both" }}
        >
          I&apos;m Dave — a full-stack engineer building products that don&apos;t
          just work, they carry intent. MERN platforms, ML tooling, smart
          contracts, and the low-level layer underneath all of it.
        </p>

        <dl className="grid grid-cols-2 gap-6 md:col-span-3 md:grid-cols-1 md:gap-4">
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Founding
            </dt>
            <dd className="mt-1 text-sm">
              <a
                href={site.startup.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {site.startup.name}
              </a>{" "}
              <span className="text-muted">— loyalty × M-PESA</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Frontend
            </dt>
            <dd className="mt-1 text-sm">
              {site.employer.name}{" "}
              <span className="text-muted">— {site.employer.product}</span>
            </dd>
          </div>
        </dl>

        <div className="flex flex-col items-stretch gap-3 md:col-span-3">
          <Link href="/work" className="btn-signal justify-between">
            See the work <span className="arrow">→</span>
          </Link>
          <Link href="/contact" className="btn-ghost justify-between">
            Start a project
          </Link>
        </div>
      </div>

      {/* featured plate */}
      {shot && (
        <figure className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline pt-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
              Featured — {plate.title}
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
              {shot.source} · {shot.captured}
            </p>
          </div>

          <div className="overflow-hidden border-x border-b border-hairline bg-paper-2">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              priority
              unoptimized
              sizes="(min-width: 1400px) 1320px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
            <span className="text-sm text-muted">{plate.tagline}</span>
            <Link href={`/work/${plate.slug}`} className="arrow-link">
              Case file <span className="arrow">→</span>
            </Link>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
