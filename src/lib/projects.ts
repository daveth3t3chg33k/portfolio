/* ------------------------------------------------------------------
   THE WORK — every project as an editorial record: the problem, the
   decision that resolved it, and what actually shipped.
------------------------------------------------------------------- */

export type ProjectStatus = "live" | "demo" | "shipped" | "startup" | "repo";

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

/* Optional deep dive into a system underneath a product, printed on the case
   page as labelled notes — the layer a screenshot can never show. `rust` adds
   the implementation particulars for systems written in Rust, optionally with
   a real listing from the source. */
export type EngineNote = { label: string; body: string };

export type CodeListing = { caption: string; code: string };

export type Engine = {
  lede: string;
  notes: EngineNote[];
  rust?: {
    lede: string;
    notes: EngineNote[];
    listing?: CodeListing;
  };
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
  engine?: Engine;
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
      "Building LoyalMini — a multi-tenant loyalty engine where shoppers earn points automatically with Lipa Na M-PESA and merchants run their entire program from the Safaricom Super App. The engine itself is Rust (Axum on Tokio) over PostgreSQL and Redis: Safaricom posts the payment, the engine resolves the tenant, credits an append-only ledger and updates the balance and tier in the same transaction, and the cashier can look up or spend points at the till. Nothing is claimed twice, nothing is stored as a float, and the shopkeeper never opens a dashboard to make it work.",
    highlights: [
      "Multi-tenant by design: one engine serving many merchants, each with isolated programs, balances and reporting.",
      "Points accrue on Lipa Na M-PESA payments — no extra card, no extra app, no cashier step to forget.",
      "Every credit is written once: a UNIQUE M-Pesa receipt plus a Redis lock make replays a no-op, not a double payout.",
      "Money and rates are integers end to end — amounts in minor units, earn rates scaled by 10,000 — so points math never drifts.",
      "Merchant tooling lives inside the Safaricom Super App, so the dashboard is already in the shopkeeper's pocket.",
    ],
    stack: [
      "Rust",
      "Axum",
      "PostgreSQL",
      "Redis",
      "M-PESA Daraja",
      "Safaricom Super App",
    ],
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
    engine: {
      lede:
        "The part a screenshot can't show: a payment lands, and six things have to be true before the shopper sees a point.",
      notes: [
        {
          label: "Ingest",
          body: "Safaricom's Daraja C2B confirmation is the only way to earn. The engine reads the payload, resolves the merchant by shortcode, upserts the shopper by normalised phone, and handles STK success from the result callback keyed on the M-Pesa receipt number.",
        },
        {
          label: "Ledger",
          body: "Points live in an append-only transactions ledger with the M-Pesa receipt as a unique key; the balance and tier row is updated inside the same PostgreSQL transaction, so there is no window where the books and the balance disagree.",
        },
        {
          label: "Idempotency",
          body: "Two guards, one cheap and one authoritative: a 24-hour Redis lock absorbs the hot replay, and the unique receipt constraint stops it if Redis is cold. A retried callback is acknowledged, never credited twice.",
        },
        {
          label: "Redemption",
          body: "Cashiers hit the POS API with the merchant's own key. Balance lookups are read-only; redeeming takes SELECT … FOR UPDATE on the balance row and rejects a reused reference, so two tills cannot spend the same points.",
        },
        {
          label: "Tenancy & auth",
          body: "One engine, many shops: keys are stored hashed and compared in constant time, a role matrix keeps merchant keys off platform-admin routes, C2B callbacks carry an HMAC-SHA256 signature over the raw body, and each merchant gets its own rate-limit window.",
        },
        {
          label: "Workers",
          body: "Outbound events are persisted before any network call, then retried with exponential backoff to a dead-letter state; stale pending STK pushes are reconciled to failed so a shopper never watches an eternal spinner.",
        },
      ],
      rust: {
        lede:
          "The engine is Rust all the way down — Axum on Tokio, SQLx against PostgreSQL, one shared state struct, one error type. These are the parts that decide how it behaves under a payment storm.",
        notes: [
          {
            label: "Layers",
            body: "One Axum Router wrapped in Tower layers: gzip/brotli compression, a 2 MB body cap, request-id generation and propagation, a per-request timeout that answers 504 instead of holding a socket, and trace spans. A Prometheus recorder is installed once at boot and /metrics renders from its handle; a from_fn middleware counts every request into an AtomicU64.",
          },
          {
            label: "State",
            body: "AppState is a Clone struct holding the PgPool, a Redis ConnectionManager, the config, broadcast senders and the metrics handle, handed to handlers by State<AppState>. Merchant auth is a real FromRequestParts implementation — ApiKeyAuth(Merchant) — whose Rejection is AppError, so an unauthenticated request never enters a handler body.",
          },
          {
            label: "Errors",
            body: "A single thiserror enum, AppError, with #[from] conversions from sqlx::Error, redis::RedisError and serde_json::Error. IntoResponse turns any variant into one JSON envelope — { error: { code, message } } — so handlers return Result<Json<T>, AppError> and never hand-build an error response.",
          },
          {
            label: "Transactions",
            body: "Credit paths are explicit: pool.begin(), upsert the customer, append to the ledger, update balance and tier, tx.commit(). Redemption takes SELECT … FOR UPDATE on the balance row inside the same transaction, so two tills serialise rather than race. sqlx::migrate! applies the whole migration set on boot.",
          },
          {
            label: "Tasks",
            body: "Four tokio::spawn loops — STK reconciliation, webhook retries, points expiry, replay-storm watchdog — share a watch::Sender<bool> for shutdown and return JoinHandles that main awaits on SIGINT/SIGTERM, so background work drains before the process exits. Live updates fan out over tokio::sync::broadcast to the SSE streams.",
          },
          {
            label: "Primitives",
            body: "sha2 for stored key hashes, subtle::ConstantTimeEq for the comparison, hmac + hex over the raw webhook body, rustls with the ring provider installed once at startup, reqwest on rustls for outbound calls. A lock-free circuit breaker — atomics behind an Arc — is staged for the Daraja and WhatsApp paths.",
          },
        ],
        listing: {
          caption:
            "src/cache.rs — the lock every C2B callback must win before it can credit a point",
          code: `pub async fn acquire_idempotency_lock(
    conn: &mut ConnectionManager,
    trans_id: &str,
    ttl_seconds: u64,
) -> Result<bool, redis::RedisError> {
    let key = format!("loyalmini:idempotency:c2b:{trans_id}");
    let result: Option<String> = redis::cmd("SET")
        .arg(&key)
        .arg("1")
        .arg("EX")
        .arg(ttl_seconds)
        .arg("NX")
        .query_async(conn)
        .await?;
    Ok(result.is_some())
}`,
        },
      },
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
    slug: "peer-play",
    index: "03",
    year: "2026 — Present",
    title: "Peer-Play",
    category: "Go × React Native · P2P media",
    tagline: "Streaming that keeps working with the radio off",
    role: "Architecture — Go backend, React Native client",
    conflict:
      "Watching anything on a Kenyan mobile connection means buffering, bundles burning, and a stream that dies the moment the signal does. Every app assumes the network stays up.",
    outcome:
      "Building a decentralized P2P media platform with an offline-first cache: a Go backend handling JWT auth bound to a device fingerprint, the catalog API and DHT bootstrap over PostgreSQL and Redis, and an Android-first React Native client carrying a Rust torrent engine behind a Turbo Module bridge — with OP-SQLite + Drizzle keeping the vault playable with no signal at all.",
    highlights: [
      "Go backend in clean architecture — auth, catalog, DHT bootstrap — with Redis caching in front of Postgres.",
      "The peer protocol runs native in Rust (librqbit) behind a Turbo Module, not in JavaScript.",
      "Offline-first vault: library, history and bookmarks survive in OP-SQLite and reconcile when the network returns.",
    ],
    stack: ["Go", "React Native", "Rust", "PostgreSQL", "Redis", "Drizzle"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/Peer-Play" },
    ],
    status: "repo",
    featured: true,
    layer: "systems",
  },
  {
    slug: "conduit",
    index: "04",
    year: "2026",
    title: "Conduit",
    category: "Rust × Fintech · Split payments",
    tagline: "Route the money, keep the books",
    role: "Solo — engine, ledger schema, dashboard",
    conflict:
      "Marketplaces, logistics apps and property managers collect one payment and owe it to several parties. Spreadsheets are slow, custom scripts break on the first duplicate webhook or gateway timeout — and nobody sane wants to custody the float.",
    outcome:
      "Built Conduit: non-custodial split-payment routing. It watches gateway webhooks, applies split rules, records every movement in a double-entry ledger, and fires payouts asynchronously off a Redis queue. It never holds the funds — it routes them and keeps the books. Rust + Axum + SQLx on the backend, Next.js on the dashboard.",
    highlights: [
      "Double-entry ledger in Postgres: every split is two rows, so balances are provable rather than assumed.",
      "Idempotent webhook handling — a replayed gateway callback cannot pay a vendor twice.",
      "Payouts leave the request path through a queue, so a slow M-PESA call never times out a checkout.",
    ],
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "Redis", "Next.js"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/CONDUIT" },
    ],
    status: "repo",
    featured: true,
    layer: "systems",
  },
  {
    slug: "kagoroute",
    index: "05",
    year: "2026",
    title: "KagoRoute",
    category: "Rust × USSD · Feature phones",
    tagline: "Your product, on a feature phone",
    role: "Solo — engine, menu DSL, dashboard",
    conflict:
      "Half the market still carries a kabambe. Reaching them means USSD: 180-second carrier timeouts, CON/END state machines, and a different aggregator per telco — so every developer writes the same telco plumbing from scratch.",
    outcome:
      "Built KagoRoute, a developer-first integration layer: publish a JSON/YAML menu schema and the engine walks the session, holds state in Redis, logs transactions to Postgres, routes through Africa's Talking, Celcom Africa and Safaricom Daraja, then webhooks completed flows back into your own backend. A Next.js dashboard doubles as a visual menu builder with live traffic and payload logs.",
    highlights: [
      "The menu schema is the contract — CON/END state handling is generated, never hand-written again.",
      "Redis-backed sessions survive mid-flow carrier timeouts and retries.",
      "Completed flows return typed events to the client's own Postgres, Node or Python backend, so phones and web share one ledger.",
    ],
    stack: ["Rust", "Axum", "Tokio", "Redis", "PostgreSQL", "Next.js"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/kago-route" },
    ],
    status: "repo",
    featured: false,
    layer: "systems",
  },
  {
    slug: "vektorfleet",
    index: "06",
    year: "2026",
    title: "VektorFleet",
    category: "Next.js × Logistics · SaaS",
    tagline: "Whatever tracker the fleet already owns",
    role: "Solo — product, engines, data model",
    conflict:
      "Logistics firms run four or five GPS vendors at once, lose fuel somewhere between the card and the tank, and cannot push drivers onto a native app. Meanwhile the regulatory clocks — NTSA, governor, insurance, county, KRA, emissions — live in six different heads.",
    outcome:
      "Built the working foundation of a hardware-agnostic, WhatsApp-native fleet platform: a canonical TelemetryPing contract with one adapter per vendor, single-pass fuel reconciliation against card volume and tank physics, a WhatsApp state machine that emits typed events, and one timeline over every compliance clock. It boots on a deterministic seeded dataset — three fleets, 14 vehicles, 30 days of trips — with no external services.",
    highlights: [
      "CarTrack, SafeRide, Teltonika Codec 8, Ruptela and JT/T 808 all normalise into one contract; adding a brand is one file.",
      "Fuel theft surfaces from a join of card volume, GPS trip index and tank physics — not a threshold on a chart.",
      "Field capture over WhatsApp with an offline-first envelope that keeps the device timestamp and replays in order.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "WhatsApp", "GPS"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/Vektor-Fleet" },
    ],
    status: "demo",
    featured: false,
    layer: "product",
  },
  {
    slug: "flotilla",
    index: "07",
    year: "2026",
    title: "Flotilla",
    category: "Rust × BitTorrent · TUI",
    tagline: "A torrent client that lives in the terminal",
    role: "Solo — protocol, engine, interface",
    conflict:
      "Terminal torrent clients either stall the interface while hashing or hide the protocol behind a progress bar. A client holding hundreds of peer connections has to stay responsive while the engine works.",
    outcome:
      "Wrote Flotilla from the wire up: bencode and info-hash verification, HTTP(S) and UDP tracker announces, the peer wire protocol, rarest-first piece selection, tit-for-tat choking, a bounded disk pipeline, magnet links via BEP 9 and DHT bootstrap via BEP 5 — all behind a Ratatui four-tab interface. The download pipeline is unit-tested; it has not yet been run against real swarms.",
    highlights: [
      "One Tokio task per peer plus a dedicated disk worker, so a stalled peer or a slow disk never freezes the TUI.",
      "Per-piece SHA-1 verification with a short retry blacklist — corrupt data is re-fetched, not trusted.",
      "Crash-safe terminal handling: a panic hook and RAII guard restore the screen, and logs never touch stdout.",
    ],
    stack: ["Rust", "Tokio", "Ratatui", "BitTorrent", "DHT"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/Flotilla-TUI" },
    ],
    status: "repo",
    featured: false,
    layer: "systems",
  },
  {
    slug: "chat-server",
    index: "08",
    year: "2026",
    title: "Chat Server",
    category: "Rust × WebSockets",
    tagline: "Rooms, history and sessions, no framework",
    role: "Solo — server, auth, frontend",
    conflict:
      "Real-time chat looks trivial until sessions, reconnects and history arrive: tokens that outlive the socket, rooms that forget you, and a database hit on every scroll.",
    outcome:
      "Built a multi-room chat server on axum and Tokio: DashMap room state with bounded broadcast fan-out, bcrypt + JWT sessions with rotating refresh tokens and theft detection, SQLite history served through cursor pagination, per-connection rate limiting and keepalive pings — served by the same process that renders the login and chat pages.",
    highlights: [
      "Refresh tokens rotate on use; replaying a rotated token revokes every session for that account.",
      "Cursor-based history resumes a socket exactly where it dropped — no full reload, no lost messages.",
      "Bounded broadcast channels mean one slow client cannot balloon the server's memory.",
    ],
    stack: ["Rust", "Axum", "Tokio", "WebSockets", "SQLite", "JWT"],
    links: [
      { label: "GitHub", href: "https://github.com/daveth3t3chg33k/Chat-Server" },
    ],
    status: "repo",
    featured: false,
    layer: "systems",
  },
  {
    slug: "portfolio-signal",
    index: "09",
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
  {
    slug: "ai-task-manager",
    index: "10",
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
    index: "11",
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
    index: "12",
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
    index: "13",
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
    slug: "chuck-norris-jokes",
    index: "14",
    year: "2025",
    title: "Chuck Norris Jokes",
    category: "React × Public API",
    tagline: "The first app that talked to a real API",
    role: "Solo — client",
    conflict:
      "Early React: learn fetching and state without a framework doing the thinking, against an API that answers with nonsense.",
    outcome:
      "A small React app over the Chuck Norris API — random jokes, browsing by category, keyword search, and Framer Motion transitions. The earliest repo still standing on the profile; kept for the record rather than for the résumé.",
    highlights: [
      "Axios fetching with loading, error and empty states handled explicitly rather than assumed.",
      "Categories read live from the API instead of hardcoded into the UI.",
      "Framer Motion transitions that respect the layout instead of fighting it.",
    ],
    stack: ["React", "Axios", "Framer Motion", "CSS"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/daveth3t3chg33k/chuck-norris-jokes-app",
      },
    ],
    status: "demo",
    featured: false,
    layer: "product",
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
