/* ------------------------------------------------------------------
   THE STACK — a taxonomy, not progress bars. Grouped by where each
   tool sits in the machine, from the browser down to the syscall.
------------------------------------------------------------------- */

export type StackGroup = {
  category: string;
  layer: string;
  blurb: string;
  items: string[];
  systems?: boolean;
};

export const stack: StackGroup[] = [
  {
    category: "Frontend",
    layer: "The surface",
    blurb: "Where the millisecond of feel lives.",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Redux", "D3.js"],
  },
  {
    category: "Backend & Data",
    layer: "The contract",
    blurb: "APIs that behave, schemas that hold.",
    items: ["Node.js", "Express", "REST", "GraphQL", "PostgreSQL", "MongoDB", "Stripe"],
  },
  {
    category: "ML & Data",
    layer: "The inference",
    blurb: "Models small enough to actually ship.",
    items: ["Python", "TensorFlow", "TensorFlow.js", "Pandas", "NumPy"],
  },
  {
    category: "Web3",
    layer: "The ledger",
    blurb: "Contracts and clients as one product.",
    items: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Hardhat"],
  },
  {
    category: "Systems & Low-level",
    layer: "The machine",
    blurb: "What sits under every abstraction above.",
    items: [
      "C / manual memory",
      "Rust / ownership",
      "WebAssembly",
      "Linux & POSIX",
      "Threads & concurrency",
      "TCP/IP & HTTP",
      "Query plans & indexes",
      "Profilers",
    ],
    systems: true,
  },
];

/* Honest labels: what I reach for daily vs. what I reach for on purpose. */
export type LanguageRow = {
  language: string;
  use: string;
  depth: "daily" | "production" | "shipped" | "working" | "foundations";
};

export const languages: LanguageRow[] = [
  { language: "TypeScript", use: "Product surfaces, APIs, tooling", depth: "daily" },
  { language: "JavaScript", use: "Node services, browser internals", depth: "daily" },
  { language: "SQL", use: "Schemas, joins, EXPLAIN plans", depth: "daily" },
  { language: "Python", use: "Models, data wrangling, scripts", depth: "working" },
  { language: "Solidity", use: "Contracts on Ethereum", depth: "shipped" },
  { language: "Bash", use: "Deploys, glue, log digging", depth: "working" },
  { language: "C", use: "Pointers, allocation, data structures", depth: "foundations" },
  { language: "Rust", use: "Ownership, borrowing, zero-cost abstractions", depth: "foundations" },
];

/* The part of the stack most portfolios skip. */
export type LowLevelNote = {
  index: string;
  title: string;
  body: string;
  keywords: string[];
};

export const lowLevel: LowLevelNote[] = [
  {
    index: "01",
    title: "Memory & ownership",
    body: "C taught me what a pointer actually costs. Rust taught me to make that cost explicit at compile time. Both changed how I read JavaScript: where the allocation hides, when the GC will interrupt the frame, and why a shared reference across a render is a decision, not a detail.",
    keywords: ["stack vs heap", "borrowing", "reference counting", "GC pauses"],
  },
  {
    index: "02",
    title: "Concurrency & the event loop",
    body: "Threads, mutexes and race conditions first — then the event loop as a different answer to the same scheduling problem. In practice that means idempotent webhooks, bounded queues and back-pressure before reaching for a worker. M-PESA payment callbacks arrive twice; the system has to survive that.",
    keywords: ["threads", "locks", "async I/O", "back-pressure", "idempotency"],
  },
  {
    index: "03",
    title: "The wire",
    body: "TCP handshakes, HTTP semantics, JSON vs. binary payloads. Knowing what a request really is turns caching, retries and timeouts into decisions instead of guesses — and explains why a cold TLS handshake can cost more than the query it carries.",
    keywords: ["TCP/TLS", "HTTP caching", "payload size", "timeouts"],
  },
  {
    index: "04",
    title: "Storage engines",
    body: "B-trees, compound indexes, query planners. Most “slow apps” are one missing index away from fast, so I read EXPLAIN before I add a cache. Understanding the page layout underneath makes schema design cheap to get right and expensive to get wrong.",
    keywords: ["B-trees", "compound indexes", "EXPLAIN", "transactions"],
  },
  {
    index: "05",
    title: "Compilers, parsers & WASM",
    body: "Lexers, ASTs, tree-walking interpreters — the same machinery behind the TypeScript tooling I use every day. WebAssembly is where that knowledge pays off in the browser: hot paths the JIT can't win, compiled once, shipped as a binary module.",
    keywords: ["lexing", "ASTs", "type checking", "wasm modules"],
  },
  {
    index: "06",
    title: "Linux, processes & profiling",
    body: "The shell is the real IDE: processes, signals, file descriptors, pipes, systemd units, logs. Then measurement — flamegraph before optimisation, benchmark before claim. Perceived speed is a budget you spend, not a feeling you promise.",
    keywords: ["syscalls", "signals", "flamegraphs", "cold starts"],
  },
];
