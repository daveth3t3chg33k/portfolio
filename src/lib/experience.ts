/* ------------------------------------------------------------------
   EXPERIENCE — a ledger: role, period, and what was actually shipped.
------------------------------------------------------------------- */

export type Role = {
  role: string;
  company: string;
  href?: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
  kind: "founder" | "work" | "foundations";
};

export const roles: Role[] = [
  {
    role: "Founder & Engineer",
    company: "LoyalMini",
    href: "https://loyalmini.com",
    period: "2026 — Present",
    location: "Nairobi",
    summary:
      "Multi-tenant loyalty engine for Kenyan retail — points accrue on Lipa Na M-PESA, merchants run the program from the Safaricom Super App.",
    points: [
      "Own the product end to end: tenant model, M-PESA integration path, merchant dashboard, positioning.",
      "Design the loyalty engine so one codebase serves many merchants with isolated programs, balances and reporting.",
      "Build for the shopkeeper's reality — no extra hardware, no cashier step that can be skipped, no app to install.",
    ],
    stack: ["M-PESA Daraja", "Multi-tenant", "Safaricom Super App", "Fintech"],
    kind: "founder",
  },
  {
    role: "Frontend Developer",
    company: "Drift Consult",
    href: "https://www.rack.business/",
    period: "Jan 2025 — Present",
    location: "Nairobi",
    summary: "Frontend for Rack — a cloud POS unifying physical retail with e-commerce.",
    points: [
      "Frontend for Rack — a cloud POS unifying physical retail with e-commerce.",
      "Seamless inventory, payments, and data access across store + online.",
      "React + modern frontend tooling, responsive across devices.",
    ],
    stack: ["React", "TypeScript", "REST", "Payments"],
    kind: "work",
  },
  {
    role: "Self-directed systems study",
    company: "C, Rust & WebAssembly",
    period: "2024 — Present",
    location: "Remote",
    summary:
      "Going down the stack on purpose — the layer under the framework, where the cost model actually lives.",
    points: [
      "C for pointers, manual allocation and data structures built by hand; Rust for ownership and borrowing.",
      "Linux and the wire: processes, file descriptors, syscalls, TCP/TLS, HTTP caching semantics.",
      "Applied upward where it pays — query plans and indexes, bundle and render profiling, WebAssembly for hot client paths.",
    ],
    stack: ["C", "Rust", "WebAssembly", "Linux", "Profiling"],
    kind: "foundations",
  },
];

export const education = {
  field: "Computer Science",
  focus: "Algorithms, data structures, systems fundamentals",
  note: "Self-taught shipping since, formal CS grounding throughout.",
};
