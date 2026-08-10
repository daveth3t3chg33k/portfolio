"use client";

import { useState } from "react";

/* ------------------------------------------------------------------
   THE WORK — every project built/refined together, as an editorial
   index. Each row expands into a case-study note (conflict → outcome).
------------------------------------------------------------------- */

type Project = {
  index: string;
  year: string;
  title: string;
  category: string;
  conflict: string;
  outcome: string;
  stack: string[];
  links: { label: string; href: string }[];
  status: "live" | "demo" | "shipped" | "startup";
};

const projects: Project[] = [
  {
    index: "01",
    year: "2026 — Present",
    title: "LoyalMini",
    category: "My startup · Fintech × Retail",
    conflict:
      "Kenyan retailers had no cheap way to run loyalty: paper cards get lost, off-the-shelf apps are expensive, and shoppers get nothing back for coming back.",
    outcome:
      "Building LoyalMini — a multi-tenant loyalty engine where shoppers earn points automatically with Lipa Na M-PESA and merchants run their entire program from the Safaricom Super App. Loyalty that actually pays.",
    stack: ["M-PESA", "Safaricom Super App", "Retail", "Loyalty Engine"],
    links: [{ label: "loyalmini.vercel.app", href: "https://loyalmini.vercel.app/" }],
    status: "startup",
  },
  {
    index: "02",
    year: "2025",
    title: "AI Task Manager",
    category: "MERN × Machine Learning",
    conflict:
      "Plain to-do apps are passive: everything looks equally urgent, so deadlines slip and nothing surfaces.",
    outcome:
      "Built an intelligent layer that re-ranks tasks by urgency signals, suggests realistic deadlines, and serves productivity insights — so the list works for you, not the other way round.",
    stack: ["React", "Node.js", "Express", "MongoDB", "ML"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
      { label: "Live demo", href: "https://github.com/daveth3t3chg33k" },
    ],
    status: "demo",
  },
  {
    index: "03",
    year: "2025",
    title: "NFT Marketplace",
    category: "Ethereum × Solidity",
    conflict:
      "Most marketplaces bury users in wallet friction and opaque contracts — trading feels like an obstacle course.",
    outcome:
      "Engineered a full Ethereum dApp with wallet integration, on-chain minting, and a smooth trading flow — smart contracts and UI working as one product.",
    stack: ["React", "Solidity", "Ethereum", "Web3.js"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
      { label: "Live demo", href: "https://github.com/daveth3t3chg33k" },
    ],
    status: "demo",
  },
  {
    index: "04",
    year: "2025",
    title: "E-Commerce Platform",
    category: "Next.js × Payments",
    conflict:
      "Small retailers get stuck between bloated platforms and half-baked plugins; the store never feels like *theirs*.",
    outcome:
      "Built a complete commerce stack with advanced product filtering, Redux cart state, authentication, and Stripe payments — fast enough to feel native.",
    stack: ["Next.js", "MongoDB", "Stripe", "Redux", "Tailwind"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
      { label: "Live demo", href: "https://github.com/daveth3t3chg33k" },
    ],
    status: "demo",
  },
  {
    index: "05",
    year: "2025",
    title: "Predictive Analytics Dashboard",
    category: "React × TensorFlow.js",
    conflict:
      "Data is noise until something reads it. Teams needed trends and predictions without standing up a data-science pipeline.",
    outcome:
      "Shipped a dashboard running TensorFlow.js client-side — visualizing patterns and predicting trends with zero server-side inference.",
    stack: ["React", "TensorFlow.js", "D3.js", "Node.js", "Python"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
      { label: "Live demo", href: "https://github.com/daveth3t3chg33k" },
    ],
    status: "demo",
  },
  {
    index: "06",
    year: "2025 — Present",
    title: "Rack — Cloud POS",
    category: "Drift Consult · Production",
    conflict:
      "Retailers ran two disconnected worlds — the shop floor and the website — duplicating inventory and losing sales between them.",
    outcome:
      "Contributing the frontend to Rack, a system that streamlines retail by merging physical and online stores: seamless inventory, payments, and data access from anywhere.",
    stack: ["React", "TypeScript", "Cloud POS", "Payments"],
    links: [{ label: "rack.business", href: "https://www.rack.business/" }],
    status: "live",
  },
  {
    index: "07",
    year: "2026",
    title: "This Portfolio — “Signal”",
    category: "Next.js · Type-led",
    conflict:
      "Most portfolios are AI-slop: purple gradients, Inter, card grids, and 'Building the future' heroes. This one had to feel made by a specific human.",
    outcome:
      "Designed and built from scratch — an editorial, type-led system with restrained motion and zero borrowed UI patterns.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    links: [{ label: "Back to top", href: "#top" }],
    status: "live",
  },
];

function ProjectRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article className="hairline-t">
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={open}
        aria-controls={`project-${project.index}`}
        className="group grid w-full grid-cols-12 items-baseline gap-2 py-7 text-left md:py-9"
      >
        <span className="col-span-2 font-mono text-xs text-faint md:col-span-1">
          {project.index}
        </span>
        <span className="col-span-2 hidden font-mono text-xs text-faint md:block">
          {project.year}
        </span>
        <span className="col-span-8 font-display text-2xl leading-tight transition-colors duration-200 group-hover:text-signal md:col-span-5 md:text-4xl lg:text-5xl">
          {project.title}
        </span>
        <span className="col-span-8 col-start-3 hidden text-sm text-muted md:col-span-4 md:col-start-auto md:block">
          {project.category}
        </span>
        <span
          className="col-span-2 text-right font-mono text-sm transition-transform duration-300"
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            color: hovered ? "var(--signal)" : "var(--faint)",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* expandable case note */}
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
        id={`project-${project.index}`}
      >
        <div className="overflow-hidden">
          <div className="pb-9 pl-4 md:pl-16">
            <p className="max-w-2xl text-muted">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal">
                The problem{" "}
              </span>
              <br />
              {project.conflict}
            </p>
            <p className="mt-5 max-w-2xl text-foreground">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal">
                What I built{" "}
              </span>
              <br />
              {project.outcome}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border border-hairline px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-6">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    l.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="arrow-link"
                >
                  {l.label}
                  <span className="arrow">→</span>
                </a>
              ))}
              <span className="ml-auto font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faint">
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<string | null>("01");

  return (
    <section id="work" className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <header className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="overline-label mb-5">01 / The Work</p>
          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Every project, <em className="italic-signal">earned</em>
          </h2>
        </div>
        <p className="max-w-sm text-muted md:col-span-4">
          No screenshots, no stock images. Each row opens into the real story —
          the problem, the trade-off, the build. These are the things we&apos;ve
          shipped together.
        </p>
      </header>

      <div>
        {projects.map((p) => (
          <ProjectRow
            key={p.index}
            project={p}
            open={openIndex === p.index}
            onToggle={() =>
              setOpenIndex(openIndex === p.index ? null : p.index)
            }
          />
        ))}
      </div>

      <div className="hairline-b" />

      <footer className="mt-14 flex flex-wrap items-center justify-between gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
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
