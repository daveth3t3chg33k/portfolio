"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { coverFor } from "@/lib/covers";

/* ------------------------------------------------------------------
   THE WORK — a numbered index, not a card grid. Hairline rows, one
   accordion note at a time. "link" mode points straight at case files.
------------------------------------------------------------------- */

const statusLabel: Record<Project["status"], string> = {
  live: "live",
  demo: "demo",
  shipped: "shipped",
  startup: "startup",
  repo: "open source",
};

function RowGrid({
  project,
  trailing,
}: {
  project: Project;
  trailing: React.ReactNode;
}) {
  return (
    <>
      <span className="col-span-2 font-mono text-[0.62rem] tabular-nums tracking-[0.1em] text-faint md:col-span-1">
        {project.index}
      </span>
      <span className="index-title col-span-8 font-display text-2xl leading-none md:col-span-5 md:text-[2.4rem]">
        {project.title}
      </span>
      <span className="col-span-8 col-start-3 hidden text-sm text-muted md:col-span-3 md:col-start-auto md:block">
        {project.category}
      </span>
      <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint md:col-span-2 md:block md:text-right">
        {project.year}
      </span>
      {trailing}
    </>
  );
}

/* A real capture always wins over the drawn cover — the cover is only what a
   project without a deployment gets. */
function PlateThumb({ project }: { project: Project }) {
  const cover = coverFor(project.slug);
  const image = project.shot ?? cover;
  if (!image) return null;

  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 320px, 100vw"
        className="h-auto w-full border border-hairline"
      />
      <figcaption className="mt-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint">
        {project.shot
          ? `Capture · ${project.shot.source}`
          : `Plate ${project.index} · ${cover!.motif}`}
      </figcaption>
    </figure>
  );
}

function StackTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="border border-hairline px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function ExpandRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="border-t border-hairline">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`project-${project.slug}`}
        className="index-row group grid w-full grid-cols-12 items-baseline gap-2 py-6 text-left md:py-8"
      >
        <RowGrid
          project={project}
          trailing={
            <span
              className="col-span-2 text-right font-mono text-sm text-faint transition-transform duration-300 group-hover:text-signal md:col-span-1"
              style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              +
            </span>
          }
        />
      </button>

      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
        id={`project-${project.slug}`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-1" />
            <div className="md:col-span-3 md:col-start-2">
              <PlateThumb project={project} />
            </div>
            <div className="md:col-span-5 md:col-start-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                The problem
              </p>
              <p className="mt-2 max-w-xl text-muted">{project.conflict}</p>

              <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                What I built
              </p>
              <p className="mt-2 max-w-xl text-foreground">{project.outcome}</p>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <StackTags items={project.stack} />

              <div className="mt-6 flex flex-col items-start gap-3">
                <Link
                  href={`/work/${project.slug}`}
                  className="arrow-link text-foreground"
                >
                  Read the case file <span className="arrow">→</span>
                </Link>
                {project.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="arrow-link"
                  >
                    {l.label} <span className="arrow">→</span>
                  </a>
                ))}
                <span className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                  {statusLabel[project.status]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function LinkRow({ project }: { project: Project }) {
  return (
    <article className="border-t border-hairline">
      <Link
        href={`/work/${project.slug}`}
        className="index-row group grid grid-cols-12 items-baseline gap-2 py-6 md:py-7"
      >
        <RowGrid
          project={project}
          trailing={
            <span className="col-span-2 text-right font-mono text-sm text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal md:col-span-1">
              →
            </span>
          }
        />
      </Link>
    </article>
  );
}

export function ProjectIndex({
  items = projects,
  mode = "expand",
}: {
  items?: Project[];
  mode?: "expand" | "link";
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    items[0]?.slug ?? null
  );

  return (
    <div className="border-b border-hairline">
      {items.map((project) =>
        mode === "expand" ? (
          <ExpandRow
            key={project.slug}
            project={project}
            open={openSlug === project.slug}
            onToggle={() =>
              setOpenSlug(openSlug === project.slug ? null : project.slug)
            }
          />
        ) : (
          <LinkRow key={project.slug} project={project} />
        )
      )}
    </div>
  );
}

/* Full section, used by /work */
export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32"
    >
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <p className="overline-label">Index — all work</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          {String(projects.length).padStart(2, "0")} projects · open a row
        </p>
      </div>

      <ProjectIndex mode="expand" />

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          More in the archive on GitHub
        </p>
        <a
          href="https://github.com/daveth3t3chg33k"
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link"
        >
          daveth3t3chg33k <span className="arrow">→</span>
        </a>
      </footer>
    </section>
  );
}
