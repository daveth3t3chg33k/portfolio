/* ------------------------------------------------------------------
   THE WORK — every project as an editorial record: the problem, the
   decision that resolved it, and what actually shipped.
------------------------------------------------------------------- */

export type ProjectStatus = "live" | "demo" | "shipped" | "startup";

/* A real capture of a real deployment. Nothing here is a mockup: if a project
   has no public URL, it has no shot and the case page prints a plate instead. */
export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  source: string;
  captured: string;
};

export type Project = {
  slug: string;
  index: string;
  year: string;
  title: string;
  category: string;
  tagline: string;
  role: string;
  conflict: string;
  outcome: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  status: ProjectStatus;
  featured: boolean;
  layer: "product" | "systems";
  shot?: Shot;
};

export const projects: Project[] = [
  {
    slug: "loyalmini",
    index: "01",
    year: "2026 — Present",
    title: "LoyalMini",
    category: "My startup · Fintech × Retail",
    tagline: "Loyalty that pays with M-PESA",
    role: "Founder — product, engineering, distribution",
    conflict:
      "Kenyan retailers had no cheap way to run loyalty: paper cards get lost, off-the-shelf apps are expensive, and shoppers get nothing back for coming back.",
    outcome:
      "Building LoyalMini — a multi-tenant loyalty engine where shoppers earn points automatically with Lipa Na M-PESA and merchants run their entire program from the Safaricom Super App. Loyalty that actually pays.",
    highlights: [
      "Multi-tenant by design: one engine serving many merchants, each with isolated programs, balances and reporting.",
      "Points accrue on Lipa Na M-PESA payments — no extra card, no extra app, no cashier step to forget.",
      "Merchant tooling lives inside the Safaricom Super App, so the dashboard is already in the shopkeeper's pocket.",
    ],
    stack: ["M-PESA Daraja", "Safaricom Super App", "Multi-tenant", "Loyalty Engine"],
    links: [{ label: "loyalmini.com", href: "https://loyalmini.com" }],
    status: "startup",
    featured: true,
    layer: "product",
    shot: {
      src: "/work/loyalmini.webp",
      width: 1440,
      height: 900,
      alt: "LoyalMini homepage: “Points shouldn’t die in your store. They should live in one wallet.” with the shopper app and merchant till shown on phones.",
      caption: "The live homepage — one wallet, every channel",
      source: "loyalmini.com",
      captured: "Oct 2026",
    },
  },
  {
    slug: "rack-cloud-pos",
    index: "02",
    year: "2025 — Present",
    title: "Rack — Cloud POS",
    category: "Drift Consult · Production",
    tagline: "One system for the shop floor and the website",
    role: "Frontend developer",
    conflict:
      "Retailers ran two disconnected worlds — the shop floor and the website — duplicating inventory and losing sales between them.",
    outcome:
      "Contributing the frontend to Rack, a system that streamlines retail by merging physical and online stores: seamless inventory, payments, and data access from anywhere.",
    highlights: [
      "Production React + TypeScript surface used daily by real shops, not a demo.",
      "Inventory, payments and reporting share one data model so store and web never disagree.",
      "Responsive from a counter tablet to a desktop back-office, with the fast feel retail demands.",
    ],
    stack: ["React", "TypeScript", "Cloud POS", "Payments"],
    links: [{ label: "rack.business", href: "https://www.rack.business/" }],
    status: "live",
    featured: true,
    layer: "product",
    shot: {
      src: "/work/rack-cloud-pos.webp",
      width: 1440,
      height: 900,
      alt: "Rack homepage: “The Smart Commerce Platform for Every Business”, with a shopkeeper holding a Rack till in a produce store.",
      caption: "The live homepage — built for Africa, ready for the world",
      source: "rack.business",
      captured: "Oct 2026",
    },
  },
  {
    slug: "ai-task-manager",
    index: "03",
    year: "2025",
    title: "AI Task Manager",
    category: "MERN × Machine Learning",
    tagline: "A to-do list that ranks itself",
    role: "Full-stack — design, API, model",
    conflict:
      "Plain to-do apps are passive: everything looks equally urgent, so deadlines slip and nothing surfaces.",
    outcome:
      "Built an intelligent layer that re-ranks tasks by urgency signals, suggests realistic deadlines, and serves productivity insights — so the list works for you, not the other way round.",
    highlights: [
      "Urgency scoring blends due dates, lift and completion history instead of a single sort key.",
      "Deadline suggestions calibrated against how long similar tasks actually took.",
      "Insights computed server-side in Python and served through a thin Express API.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "ML"],
    links: [{ label: "GitHub", href: "https://github.com/daveth3t3chg33k" }],
    status: "demo",
    featured: true,
    layer: "product",
  },
  {
    slug: "nft-marketplace",
    index: "04",
    year: "2025",
    title: "NFT Marketplace",
    category: "Ethereum × Solidity",
    tagline: "Contracts and UI as one product",
    role: "Full-stack — contracts + dApp",
    conflict:
      "Most marketplaces bury users in wallet friction and opaque contracts — trading feels like an obstacle course.",
    outcome:
      "Engineered a full Ethereum dApp with wallet integration, on-chain minting, and a smooth trading flow — smart contracts and UI working as one product.",
    highlights: [
      "Minting and listing logic in Solidity, with the UI reading contract state directly.",
      "Wallet connection and transaction states handled explicitly — pending, mined, failed.",
      "Gas-conscious writes: listings store the minimum on-chain, metadata lives off-chain.",
    ],
    stack: ["React", "Solidity", "Ethereum", "Web3.js"],
    links: [{ label: "GitHub", href: "https://github.com/daveth3t3chg33k" }],
    status: "demo",
    featured: false,
    layer: "product",
  },
  {
    slug: "ecommerce-platform",
    index: "05",
    year: "2025",
    title: "E-Commerce Platform",
    category: "Next.js × Payments",
    tagline: "A store that feels like the merchant's own",
    role: "Full-stack",
    conflict:
      "Small retailers get stuck between bloated platforms and half-baked plugins; the store never feels like *theirs*.",
    outcome:
      "Built a complete commerce stack with advanced product filtering, Redux cart state, authentication, and Stripe payments — fast enough to feel native.",
    highlights: [
      "Faceted filtering and cart state that survive navigation without a server round-trip.",
      "Auth and checkout split so payment intent is created only once per cart, never twice.",
      "Server-rendered product pages for real SEO, client-side interactivity where it earns its keep.",
    ],
    stack: ["Next.js", "MongoDB", "Stripe", "Redux", "Tailwind"],
    links: [{ label: "GitHub", href: "https://github.com/daveth3t3chg33k" }],
    status: "demo",
    featured: false,
    layer: "product",
  },
  {
    slug: "predictive-analytics",
    index: "06",
    year: "2025",
    title: "Predictive Analytics Dashboard",
    category: "React × TensorFlow.js",
    tagline: "Inference in the browser, not the bill",
    role: "Full-stack — visualization + model",
    conflict:
      "Data is noise until something reads it. Teams needed trends and predictions without standing up a data-science pipeline.",
    outcome:
      "Shipped a dashboard running TensorFlow.js client-side — visualizing patterns and predicting trends with zero server-side inference.",
    highlights: [
      "Model runs in the browser with TensorFlow.js, so there is no inference server to pay for or keep warm.",
      "D3 for the charts — scales, axes and interactions tuned by hand rather than a chart library's defaults.",
      "Model weights loaded lazily so the first paint is data, not a spinner.",
    ],
    stack: ["React", "TensorFlow.js", "D3.js", "Node.js", "Python"],
    links: [{ label: "GitHub", href: "https://github.com/daveth3t3chg33k" }],
    status: "demo",
    featured: false,
    layer: "product",
  },
  {
    slug: "portfolio-signal",
    index: "07",
    year: "2026",
    title: "This Portfolio — “Signal”",
    category: "Next.js · Type-led",
    tagline: "Made by a specific human",
    role: "Design + engineering",
    conflict:
      "Most portfolios are AI-slop: purple gradients, Inter, card grids, and 'Building the future' heroes. This one had to feel made by a specific human.",
    outcome:
      "Designed and built from scratch — an editorial, type-led system with restrained motion, real case notes, and zero borrowed UI patterns.",
    highlights: [
      "A design system in CSS variables: warm ink on paper, one functional accent, hairlines instead of cards.",
      "Multi-page by structure — work, per-project case notes, stack, about, contact — not one endless scroll.",
      "Server components by default; client JavaScript only where interaction actually lives.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "App Router"],
    links: [{ label: "Work index", href: "/work" }],
    status: "live",
    featured: false,
    layer: "product",
    shot: {
      src: "/work/portfolio-signal.webp",
      width: 1440,
      height: 900,
      alt: "This portfolio at desktop width: the “Software with a signal” masthead in grotesk with a serif italic, the metadata rule and the featured LoyalMini plate below.",
      caption: "This site — the page you were just reading",
      source: "local build",
      captured: "Oct 2026",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

export const projectSlugs = projects.map((p) => p.slug);
