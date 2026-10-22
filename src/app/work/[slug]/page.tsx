import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  projectNeighbours,
  projectSlugs,
  projects,
  type Project,
} from "@/lib/projects";
import ProjectPlate from "@/components/work/ProjectPlate";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case not found" };
  return {
    title: project.title,
    description: `${project.tagline} — ${project.outcome}`,
    openGraph: {
      title: `${project.title} — Dave Kamirah`,
      description: project.tagline,
      type: "article",
    },
  };
}

const statusCopy: Record<Project["status"], string> = {
  live: "Live in production",
  demo: "Demo build",
  shipped: "Shipped",
  startup: "In build — startup",
  repo: "Open source — on GitHub",
};

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-hairline pt-3">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <div className="mt-2 text-sm text-foreground">{children}</div>
    </div>
  );
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = projectNeighbours(slug);
  const position = String(
    projects.findIndex((p) => p.slug === slug) + 1
  ).padStart(2, "0");

  return (
    <article>
      {/* masthead */}
      <header className="mx-auto w-full max-w-[1400px] px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-36">
        <div className="flex items-center justify-between gap-4 border-b border-hairline pb-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="transition-colors hover:text-foreground">
              Dave Kamirah
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/work"
              className="transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
          <span className="tabular-nums">
            {position} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <p className="overline-label mt-10">{project.category}</p>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <h1
            className="font-display text-[13vw] leading-[0.88] md:col-span-8 md:text-[7vw] lg:text-[6.4rem]"
            style={{ animation: "rise-in .7s .05s both" }}
          >
            {project.title}
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-muted md:col-span-4">
            {project.tagline}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 md:mt-14 md:grid-cols-4">
          <Labeled label="Role">{project.role}</Labeled>
          <Labeled label="Period">{project.year}</Labeled>
          <Labeled label="Status">{statusCopy[project.status]}</Labeled>
          <Labeled label="Layer">
            {project.layer === "systems" ? "Low-level" : "Product"}
          </Labeled>
        </div>
      </header>

      <ProjectPlate project={project} />

      {/* body */}
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-2">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint md:sticky md:top-28">
              The record
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-4">
            <h2 className="font-display text-2xl leading-tight md:text-3xl">
              The problem
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {project.conflict}
            </p>

            <h2 className="mt-12 font-display text-2xl leading-tight md:text-3xl">
              What I built
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground">
              {project.outcome}
            </p>

            <h2 className="mt-12 font-display text-2xl leading-tight md:text-3xl">
              Decisions that mattered
            </h2>
            <ul className="mt-5 border-b border-hairline">
              {project.highlights.map((h, i) => (
                <li
                  key={h}
                  className="flex gap-6 border-t border-hairline py-4"
                >
                  <span className="font-mono text-[0.6rem] tabular-nums text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                Stack
              </p>
              <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-foreground">
                {project.stack.join("  /  ")}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    l.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="btn-signal"
                >
                  {l.label} <span className="arrow">→</span>
                </a>
              ))}
              <Link href="/contact" className="btn-ghost">
                Build something like this
              </Link>
            </div>
          </div>

          <aside className="md:col-span-2 md:col-start-11">
            <p className="font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-faint">
              {statusCopy[project.status]} · {project.year}
            </p>
          </aside>
        </div>
      </div>

      {/* prev / next */}
      <nav aria-label="More cases" className="border-t border-hairline">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 divide-y divide-hairline px-5 md:grid-cols-2 md:divide-x md:divide-y-0 md:px-10">
          {[prev, next].map((p, i) =>
            p ? (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`group block py-10 ${
                  i === 1 ? "md:pl-10 md:text-right" : "md:pr-10"
                }`}
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                  {i === 0 ? "← Previous" : "Next →"}
                </p>
                <p className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-signal md:text-4xl">
                  {p.title}
                </p>
                <p className="mt-2 text-sm text-muted">{p.category}</p>
              </Link>
            ) : null
          )}
        </div>
      </nav>
    </article>
  );
}
