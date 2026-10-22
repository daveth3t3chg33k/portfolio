import Image from "next/image";
import type { Project } from "@/lib/projects";

/* ------------------------------------------------------------------
   THE PLATE — one real capture per case file, set like a page in a
   monograph: a numbered rule, the image, a caption. Never a card and
   never a mockup. Projects without a live URL print a typographic
   plate instead of pretending to have a screenshot.
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

function TypographicPlate({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden border-x border-b border-hairline bg-paper">
      <span
        className="pointer-events-none absolute -bottom-[0.18em] right-4 select-none font-display text-[34vw] leading-none tracking-[-0.06em] text-paper-2 md:right-10 md:text-[15vw]"
        aria-hidden="true"
      >
        {project.index}
      </span>

      <div className="relative px-6 py-14 md:px-14 md:py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {project.category}
          </p>
          <p className="mt-6 font-display text-[2.6rem] leading-none md:text-[3.4rem]">
            <em className="italic-signal">Specimen</em>
          </p>
          <p className="mt-4 max-w-sm font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
            {project.year} · {statusLabel[project.status]} · no public
            deployment
          </p>
          <div className="mt-12">
            <StackTags items={project.stack} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPlate({ project }: { project: Project }) {
  const { shot } = project;
  const live = project.links.find((l) => l.href.startsWith("http"));

  return (
    <figure className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline pt-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
          Plate {project.index}
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          {shot ? `${shot.source} · ${shot.captured}` : "Case plate · no capture"}
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
      ) : (
        <TypographicPlate project={project} />
      )}

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <span className="max-w-xl text-sm text-muted">
          {shot
            ? shot.caption
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
