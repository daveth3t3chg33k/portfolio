import Image from "next/image";
import type { Project } from "@/lib/projects";
import { coverFor, type Cover } from "@/lib/covers";

/* ------------------------------------------------------------------
   THE PLATE — one image per case file, set like a page in a monograph:
   a numbered rule, the image, a caption. A project with a public URL
   prints its real capture; one without prints the cover plate drawn for
   its case, labelled as a drawing rather than passed off as a screenshot.
------------------------------------------------------------------- */

const statusLabel = {
  live: "Live",
  demo: "Demo build",
  shipped: "Shipped",
  startup: "In build",
  repo: "Open source",
} as const;

function StackTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
      {items.map((s) => (
        <li
          key={s}
          className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function CoverPlate({ project, cover }: { project: Project; cover: Cover }) {
  return (
    <div className="relative overflow-hidden border-x border-b border-hairline bg-paper">
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes="(min-width: 1400px) 1320px, 100vw"
        className="h-auto w-full"
      />

      <div className="border-t border-hairline px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {project.category}
          </p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
            {project.year} · {statusLabel[project.status]} · no public
            deployment
          </p>
        </div>
        <div className="mt-5">
          <StackTags items={project.stack} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectPlate({ project }: { project: Project }) {
  const { shot } = project;
  const cover = shot ? undefined : coverFor(project.slug);
  const live = project.links.find((l) => l.href.startsWith("http"));

  return (
    <figure className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline pt-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
          Plate {project.index}
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          {shot
            ? `${shot.source} · ${shot.captured}`
            : cover
              ? `Drawn plate · ${cover.motif}`
              : "Case plate · no capture"}
        </p>
      </div>

      {shot ? (
        <div className="relative overflow-hidden border-x border-b border-hairline bg-paper-2">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 1400px) 1320px, 100vw"
            unoptimized
            className="h-auto w-full"
          />
        </div>
      ) : cover ? (
        <CoverPlate project={project} cover={cover} />
      ) : (
        <div className="border-x border-b border-hairline bg-paper px-6 py-14 md:px-14">
          <p className="font-display text-[2.6rem] leading-none">
            <em className="italic-signal">Specimen</em>
          </p>
          <div className="mt-10">
            <StackTags items={project.stack} />
          </div>
        </div>
      )}

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <span className="max-w-xl text-sm text-muted">
          {shot
            ? shot.caption
            : cover
              ? `${project.tagline} — cover plate drawn for this case, not a screenshot.`
              : `${project.tagline} — no public URL to capture, so the case is set as a plate.`}
        </span>
        {live && (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link"
          >
            {live.label} <span className="arrow">→</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
