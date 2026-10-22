/*
 * Generate the cover plate for every project.
 *
 *   node scripts/generate-project-covers.mjs [slug ...]
 *
 * Each cover is drawn as SVG from a motif that belongs to the project — a
 * peer mesh, a double-entry ledger, a USSD tree, torrent pieces — using the
 * site's own ink-and-paper palette. No image model, no stock photography:
 * deterministic geometry, seeded per slug, so re-running produces the same
 * plate byte for byte.
 *
 * Text is deliberately *not* drawn here. Type is set in the component that
 * places the plate, so it stays crisp at every size and in the site's
 * licensed faces rather than a system fallback.
 *
 * These are artwork, not captures. A project with a real deployment keeps its
 * real screenshot (scripts/capture-work-shots.mjs) on the case page; covers
 * are the fallback plate, the index thumbnail and the social card.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const W = 1600;
const H = 1000;
const OUT_DIR = "public/work/covers";

const C = {
  ink: "#14140f",
  paper: "#eeece3",
  paper2: "#e2ded2",
  line: "#d6d1c3",
  faint: "#a9a294",
  signal: "#b03a1c",
};

/* ---------- deterministic noise ---------- */

function hash(s) {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function rng(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Number(v).toFixed(1);

/* Catmull-Rom → cubic Bézier: turns sampled points into a road, not a zigzag. */
function smooth(pts) {
  let d = `M${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${n(c1[0])} ${n(c1[1])}, ${n(c2[0])} ${n(c2[1])}, ${n(p2[0])} ${n(
      p2[1]
    )}`;
  }
  return d;
}

/* ---------- shared furniture: grid, crop marks, plate pips ---------- */

function furniture(index) {
  let grid = "";
  for (let x = 80; x < W; x += 80)
    grid += `<path d="M${x} 0 V ${H}" stroke="${C.line}" stroke-width="1"/>`;
  for (let y = 80; y < H; y += 80)
    grid += `<path d="M0 ${y} H ${W}" stroke="${C.line}" stroke-width="1"/>`;

  const m = 44;
  const cm = 16;
  let marks = "";
  for (const [x, y, sx, sy] of [
    [m, m, 1, 1],
    [W - m, m, -1, 1],
    [m, H - m, 1, -1],
    [W - m, H - m, -1, -1],
  ]) {
    marks += `<path d="M${x} ${y} h ${sx * cm} M${x} ${y} v ${sy * cm}" stroke="${C.ink}" stroke-width="1.6"/>`;
  }

  let pips = "";
  for (let i = 0; i < index; i++)
    pips += `<rect x="${72 + i * 16}" y="${H - 66}" width="8" height="8" fill="${C.ink}"/>`;

  return `${grid}${marks}${pips}`;
}

/* ---------- the motifs ---------- */

const motifs = {
  /* Loyalty: a card, and points accreting on a tariff of rings. */
  loyalmini: (r) => {
    const cx = 1130;
    const cy = 500;
    let out = "";
    for (let i = 1; i <= 8; i++) {
      const rad = 52 * i;
      out += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${
        i % 2 ? C.ink : C.faint
      }" stroke-width="${i % 2 ? 2 : 1.4}"${
        i % 2 ? "" : ' stroke-dasharray="14 16"'
      }/>`;
      for (let d = 0; d < 2; d++) {
        const a = r() * Math.PI * 2;
        out += `<circle cx="${n(cx + Math.cos(a) * rad)}" cy="${n(
          cy + Math.sin(a) * rad
        )}" r="6.5" fill="${i === 4 && d === 0 ? C.signal : C.ink}"/>`;
      }
    }

    const card = `<g transform="rotate(-8 415 520)">
      <rect x="180" y="370" width="470" height="300" rx="20" fill="${C.paper2}" stroke="${C.ink}" stroke-width="3"/>
      <rect x="216" y="410" width="126" height="15" fill="${C.ink}"/>
      <rect x="216" y="440" width="74" height="13" fill="${C.faint}"/>
      <path d="M216 512 H 614" stroke="${C.line}" stroke-width="2"/>
      ${[0, 1, 2, 3, 4]
        .map(
          (i) =>
            `<circle cx="${252 + i * 58}" cy="588" r="12" fill="${
              i === 4 ? C.signal : C.ink
            }"/>`
        )
        .join("")}
    </g>`;

    const tether = `<path d="M690 566 C 810 566, 860 530, 928 500" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="8 12"/>`;

    return `${out}${card}${tether}`;
  },

  /* Retail: shelves of stock, and the receipt that reconciles them. */
  "rack-cloud-pos": (r) => {
    let shelves = "";
    [300, 520, 740].forEach((y, row) => {
      shelves += `<path d="M150 ${y} H 1010" stroke="${C.ink}" stroke-width="3"/>`;
      let x = 150;
      let k = 0;
      while (x < 960) {
        const w = 88 + r() * 104;
        const h = 66 + r() * 54;
        const hot = row === 1 && k === 2;
        shelves += `<rect x="${n(x)}" y="${n(y - h)}" width="${n(
          w
        )}" height="${n(h)}" fill="${hot ? C.signal : C.paper2}" stroke="${
          C.ink
        }" stroke-width="1.8"/>`;
        shelves += `<path d="M${n(x + 16)} ${n(y - 18)} h ${n(w - 32)}" stroke="${
          hot ? C.paper : C.faint
        }" stroke-width="2"/>`;
        x += w + 26;
        k++;
      }
    });

    let receipt = "";
    for (let y = 200; y < 800; y += 34) {
      receipt += `<path d="M1140 ${y} h ${n(90 + r() * 170)}" stroke="${
        r() < 0.22 ? C.ink : C.faint
      }" stroke-width="2"/>`;
      receipt += `<path d="M1390 ${y} h 34" stroke="${C.faint}" stroke-width="2"/>`;
    }
    for (let i = 0; i < 12; i++)
      receipt += `<rect x="${1140 + i * 13}" y="828" width="${
        i % 3 ? 2 : 5
      }" height="46" fill="${C.ink}"/>`;

    const strip = `<g transform="rotate(2 1280 500)">
      <rect x="1100" y="150" width="360" height="770" fill="#f7f5ef" stroke="${C.ink}" stroke-width="2.5"/>
      ${receipt}
    </g>`;

    return `${shelves}${strip}`;
  },

  /* P2P media: peers, links, and pieces in transit. */
  "peer-play": (r) => {
    /* A swarm reads better as a loose lattice than as scattered points: every
       peer links to its neighbours, and the seed travels along one row. */
    const cols = 6;
    const rows = 3;
    const pts = [];
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        pts.push({
          col,
          row,
          x: 210 + col * 236 + (r() - 0.5) * 74,
          y: 250 + row * 250 + (r() - 0.5) * 84,
        });

    const at = (col, row) => pts[row * cols + col];
    let out = "";
    pts.forEach((p) => {
      const links = [];
      if (p.col < cols - 1) links.push(at(p.col + 1, p.row));
      if (p.row < rows - 1) links.push(at(p.col, p.row + 1));
      if ((p.col + p.row) % 2 === 0 && p.col < cols - 2)
        links.push(at(p.col + 2, p.row));
      links.forEach((q) => {
        const dashed = (p.col + p.row) % 3 === 1 && q.col !== p.col;
        out += `<path d="M${n(p.x)} ${n(p.y)} L ${n(q.x)} ${n(q.y)}" stroke="${
          C.ink
        }" stroke-width="${dashed ? 1.6 : 2.2}" opacity="${
          dashed ? 0.5 : 0.85
        }"${dashed ? ' stroke-dasharray="8 10"' : ""}/>`;
      });
    });

    const a = at(1, 1);
    const b = at(4, 1);
    out += `<path d="M${n(a.x)} ${n(a.y)} L ${n(b.x)} ${n(b.y)}" stroke="${
      C.signal
    }" stroke-width="4"/>`;
    for (let t = 0.14; t < 0.9; t += 0.19)
      out += `<rect x="${n(a.x + (b.x - a.x) * t - 7)}" y="${n(
        a.y + (b.y - a.y) * t - 7
      )}" width="14" height="14" fill="${C.signal}"/>`;

    out += pts
      .map((p) => {
        const hot = (p.row === 1 && p.col === 1) || (p.row === 1 && p.col === 4);
        return `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${
          hot ? 17 : 11
        }" fill="${hot ? C.signal : C.paper}" stroke="${C.ink}" stroke-width="2.5"/>`;
      })
      .join("");

    return out;
  },

  /* Split payments: one payment, three destinations, books that balance. */
  conduit: (r) => {
    const inY = 400;
    let out = `<path d="M140 ${inY} H 480" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="480" cy="${inY}" r="14" fill="${C.ink}"/>`;

    [280, 400, 540].forEach((y, i) => {
      const hot = i === 1;
      out += `<path d="M480 ${inY} H 610 Q 668 ${inY} 668 ${y} H 1180" fill="none" stroke="${
        hot ? C.signal : C.ink
      }" stroke-width="${hot ? 5 : 3.5}"/>`;
      out += `<circle cx="1200" cy="${y}" r="21" fill="none" stroke="${
        hot ? C.signal : C.ink
      }" stroke-width="3.5"/>`;
      out += `<circle cx="1200" cy="${y}" r="7" fill="${hot ? C.signal : C.ink}"/>`;
    });

    out += `<path d="M140 720 H 1180" stroke="${C.ink}" stroke-width="2.5"/>
      <path d="M660 646 V 866" stroke="${C.ink}" stroke-width="2"/>`;

    for (let i = 0; i < 5; i++) {
      const y = 668 + i * 38;
      const left = 110 + r() * 300;
      const right = 110 + r() * 300;
      const hot = i === 2;
      out += `<path d="M636 ${y} H ${n(636 - left)}" stroke="${
        hot ? C.signal : C.ink
      }" stroke-width="9" opacity="${hot ? 1 : 0.85}"/>`;
      out += `<path d="M684 ${y} H ${n(684 + right)}" stroke="${
        hot ? C.signal : C.faint
      }" stroke-width="9" opacity="${hot ? 1 : 0.55}"/>`;
    }

    return out;
  },

  /* USSD: a menu tree walked inside a 180-second carrier window. */
  kagoroute: (r) => {
    let out = `<path d="M262 240 V 700" stroke="${C.ink}" stroke-width="3"/>`;
    const levels = [250, 400, 550, 700];
    const xs = [520, 780, 1040];

    levels.forEach((y, li) => {
      out += `<rect x="248" y="${y - 15}" width="30" height="30" fill="${
        C.paper
      }" stroke="${C.ink}" stroke-width="2.5"/>`;
      const count = 2 + (li % 2);
      for (let k = 0; k < count; k++) {
        const x = xs[k];
        const hot = li === 1 && k === 1;
        out += `<path d="M278 ${y} H ${x - 27}" stroke="${C.faint}" stroke-width="2" stroke-dasharray="6 8"/>`;
        out += `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" fill="${
          hot ? C.signal : C.paper
        }" stroke="${C.ink}" stroke-width="2.5"/>`;
        for (let t = 0; t < 2 + ((li + k) % 2); t++)
          out += `<path d="M${x - 36} ${y + 44 + t * 20} h ${
            34 + ((li * 7 + k * 5 + t * 11) % 64)
          }" stroke="${C.faint}" stroke-width="2"/>`;
      }
    });

    out += `<path d="M262 236 C 900 96, 1488 412, 1312 838" fill="none" stroke="${C.signal}" stroke-width="2.5" stroke-dasharray="10 12"/>
      <circle cx="1312" cy="838" r="9" fill="${C.signal}"/>`;

    return out;
  },

  /* Fleet telemetry: routes drawn over a road grid, one geofence. */
  vektorfleet: (r) => {
    let out = "";
    for (let i = 0; i < 5; i++)
      out += `<path d="M130 ${210 + i * 150} H 1470" stroke="${C.line}" stroke-width="${
        i === 2 ? 2.4 : 1.4
      }" opacity="0.8"/>`;
    for (let i = 0; i < 6; i++)
      out += `<path d="M${220 + i * 210} 150 V 870" stroke="${C.line}" stroke-width="${
        i % 3 === 0 ? 2.4 : 1.4
      }" opacity="0.8"/>`;

    out += `<circle cx="1084" cy="392" r="184" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="10 12"/>`;

    const routes = [];
    [740, 540, 320].forEach((base, k) => {
      const pts = [];
      for (let s = 0; s < 6; s++) {
        const x = 210 + s * 232 + (r() - 0.5) * 64;
        const y =
          base + Math.sin(s * 1.1 + k * 2.1) * 96 + (r() - 0.5) * 54;
        pts.push([x, Math.max(240, Math.min(800, y))]);
      }
      routes.push({ pts, hot: k === 0 });
    });

    routes.forEach((rt) => {
      out += `<path d="${smooth(rt.pts)}" fill="none" stroke="${
        rt.hot ? C.signal : C.ink
      }" stroke-width="${rt.hot ? 4.5 : 2.4}" opacity="${
        rt.hot ? 1 : 0.65
      }" stroke-linecap="round"/>`;

      rt.pts.forEach(([x, y], i) => {
        const last = i === rt.pts.length - 1;
        if (i === 0)
          out += `<circle cx="${n(x)}" cy="${n(y)}" r="7" fill="${
            rt.hot ? C.signal : C.ink
          }"/>`;
        else if (last)
          out += `<circle cx="${n(x)}" cy="${n(y)}" r="11" fill="${
            rt.hot ? C.signal : C.paper
          }" stroke="${rt.hot ? C.signal : C.ink}" stroke-width="2.5"/>`;
        else
          out += `<rect x="${n(x - 4)}" y="${n(y - 4)}" width="8" height="8" fill="${
            rt.hot ? C.signal : C.ink
          }" opacity="${rt.hot ? 0.9 : 0.45}"/>`;
      });
    });

    return out;
  },

  /* Torrents: a piece grid, most of it missing, one rarest piece in flight. */
  flotilla: (r) => {
    const cols = 17;
    const rows = 10;
    const size = 58;
    const gap = 12;
    const ox = (W - (cols * (size + gap) - gap)) / 2;
    const oy = (H - (rows * (size + gap) - gap)) / 2 - 8;
    const rare = { c: 9, r: 4 };

    let out = "";
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = ox + col * (size + gap);
        const y = oy + row * (size + gap);
        const isRare = col === rare.c && row === rare.r;
        const near =
          Math.abs(col - rare.c) <= 1 &&
          Math.abs(row - rare.r) <= 1 &&
          !isRare;

        if (isRare) {
          out += `<rect x="${n(x)}" y="${n(y)}" width="${size}" height="${size}" fill="${C.signal}"/>`;
        } else if (near) {
          out += `<rect x="${n(x)}" y="${n(y)}" width="${size}" height="${size}" fill="none" stroke="${C.signal}" stroke-width="2"/>
            <rect x="${n(x)}" y="${n(y)}" width="${n(size * 0.45)}" height="${size}" fill="${C.signal}" opacity="0.32"/>`;
        } else if (r() < 0.13) {
          out += `<rect x="${n(x)}" y="${n(y)}" width="${size}" height="${size}" fill="${C.ink}"/>`;
        } else {
          out += `<rect x="${n(x + 0.5)}" y="${n(y + 0.5)}" width="${size}" height="${size}" fill="none" stroke="${
            C.faint
          }" stroke-width="1.4"/>`;
        }
      }
    }

    const cx = ox + rare.c * (size + gap) + size / 2;
    const cy = oy + rare.r * (size + gap) + size / 2;
    out += `<path d="M110 ${n(cy)} C 300 ${n(cy - 150)}, 400 ${n(
      cy + 130
    )}, ${n(cx - size / 2)} ${n(cy)}" fill="none" stroke="${
      C.ink
    }" stroke-width="2" stroke-dasharray="9 11"/>
    <path d="M1490 ${n(cy - 40)} C 1330 ${n(cy - 230)}, 1130 ${n(
      cy + 160
    )}, ${n(cx + size / 2)} ${n(cy)}" fill="none" stroke="${
      C.ink
    }" stroke-width="2" stroke-dasharray="9 11"/>`;

    return out;
  },

  /* Chat: one hub, bounded fan-out, delivery marks on the wire. */
  "chat-server": (r) => {
    const cx = 800;
    const cy = 500;
    let out = `<circle cx="${cx}" cy="${cy}" r="420" fill="none" stroke="${C.line}" stroke-width="1.6" stroke-dasharray="4 10"/>
      <circle cx="${cx}" cy="${cy}" r="204" fill="none" stroke="${C.line}" stroke-width="1.4" stroke-dasharray="4 10"/>`;

    const N = 16;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + 0.12;
      const rad = 336 + (i % 3) * 48;
      const x = cx + Math.cos(a) * rad;
      const y = cy + Math.sin(a) * rad * 0.78;
      out += `<path d="M${cx} ${cy} L ${n(x)} ${n(y)}" stroke="${C.faint}" stroke-width="1.8"/>`;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="${
        i === 3 ? 14 : 9
      }" fill="${i === 3 ? C.signal : C.paper}" stroke="${C.ink}" stroke-width="2"/>`;
      if (i === 3) {
        out += `<circle cx="${n(x)}" cy="${n(y)}" r="34" fill="none" stroke="${C.signal}" stroke-width="2"/>
          <circle cx="${n(x)}" cy="${n(y)}" r="54" fill="none" stroke="${C.signal}" stroke-width="1.4" opacity="0.5"/>`;
      }
      if (i % 3 === 0)
        out += `<rect x="${n(cx + Math.cos(a) * rad * 0.52 - 6)}" y="${n(
          cy + Math.sin(a) * rad * 0.78 * 0.52 - 6
        )}" width="12" height="12" fill="${C.ink}"/>`;
    }

    out += `<rect x="${cx - 80}" y="${cy - 80}" width="160" height="160" rx="6" fill="${
      C.paper2
    }" stroke="${C.ink}" stroke-width="3.5"/>
      <circle cx="${cx}" cy="${cy}" r="14" fill="${C.signal}"/>`;

    return out;
  },

  /* The portfolio itself: stacked pages, a baseline grid, one signal line. */
  "portfolio-signal": (r) => {
    let out = "";
    for (let i = 2; i >= 0; i--) {
      out += `<rect x="${512 + i * 28}" y="${150 + i * 28}" width="540" height="540" fill="${
        i === 0 ? C.paper : "none"
      }" stroke="${i === 0 ? C.ink : C.faint}" stroke-width="${
        i === 0 ? 3 : 1.8
      }"/>`;
    }
    for (let i = 0; i < 7; i++)
      out += `<path d="M552 ${234 + i * 68} H 1012" stroke="${C.line}" stroke-width="1.6"/>`;

    out += `<g transform="translate(102 -34)"><path d="M846 322 C 746 278, 586 300, 584 392 C 582 464, 722 490, 806 528 C 896 568, 892 682, 768 704 C 670 720, 594 684, 572 632" fill="none" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/></g>`;

    let wave = "M96 884";
    for (let x = 96; x <= 1504; x += 46) {
      const spike = (x - 96) % 322 < 92 ? 54 : 0;
      wave += ` L ${x} ${n(884 - (r() * 54 + spike))}`;
    }
    out += `<path d="${wave}" fill="none" stroke="${C.signal}" stroke-width="2.5"/>`;

    return out;
  },

  /* Machine-ranked tasks: bars, urgency meters, a sort arrow. */
  "ai-task-manager": (r) => {
    let out = `<path d="M1122 720 V 236 M1098 268 L 1122 230 L 1146 268" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;

    for (let i = 0; i < 8; i++) {
      const y = 210 + i * 88;
      const len = Math.max(140, 760 - i * 76 + r() * 62);
      const top = i === 0;
      out += `<rect x="160" y="${y - 10}" width="20" height="20" fill="${
        top ? C.signal : "none"
      }" stroke="${C.ink}" stroke-width="1.6"/>`;
      out += `<rect x="240" y="${y - 15}" width="${n(len)}" height="30" fill="${
        top ? C.signal : C.paper2
      }" stroke="${C.ink}" stroke-width="2"/>`;
      out += `<path d="M240 ${y} H ${n(240 + len * 0.55)}" stroke="${
        top ? C.paper : C.faint
      }" stroke-width="3"/>`;
      for (let k = 0; k < 5; k++)
        out += `<rect x="${1240 + k * 26}" y="${y - 12}" width="18" height="24" fill="${
          k < 5 - Math.floor(i * 0.6) ? C.ink : "none"
        }" stroke="${C.ink}" stroke-width="1.4"/>`;
      out += `<path d="M200 ${y - 16} V ${y + 16}" stroke="${C.faint}" stroke-width="2"/>`;
    }

    return out;
  },

  /* Tokens: a hexagonal lattice, one minted, metadata kept off-chain. */
  "nft-marketplace": (r) => {
    const R = 84;
    const dx = R * Math.sqrt(3);
    const dy = R * 1.5;
    const hex = (x, y, rad) => {
      let p = "";
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i - 30);
        p += `${i ? "L" : "M"}${n(x + rad * Math.cos(a))} ${n(
          y + rad * Math.sin(a)
        )} `;
      }
      return `${p}Z`;
    };

    let out = "";
    let lit = null;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 7; col++) {
        const x = 300 + col * dx + (row % 2 ? dx / 2 : 0);
        const y = 180 + row * dy;
        if (x + R > 1420) continue;
        const isLit = row === 2 && col === 3;
        const filled =
          isLit || (row === 1 && col === 4) || (row === 3 && col === 1);
        if (isLit) lit = { x, y };
        out += `<path d="${hex(x, y, R - 6)}" fill="${
          isLit ? C.signal : filled ? C.paper2 : "none"
        }" stroke="${filled ? C.ink : C.faint}" stroke-width="${
          filled ? 3 : 1.4
        }"/>`;
        if (isLit) out += `<path d="${hex(x, y, R - 22)}" fill="none" stroke="${C.paper}" stroke-width="2"/>`;
      }
    }

    if (lit) {
      const bx = lit.x + 196;
      const by = lit.y - 286;
      out += `<rect x="${n(bx)}" y="${n(by)}" width="96" height="96" fill="none" stroke="${
        C.ink
      }" stroke-width="2" stroke-dasharray="8 8"/>
        <path d="M${n(lit.x + 46)} ${n(lit.y - 52)} L ${n(bx)} ${n(
        by + 72
      )}" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="6 8"/>`;
    }

    return out;
  },

  /* Commerce: a filter rail, a catalogue, and the cart. */
  "ecommerce-platform": (r) => {
    let out = "";
    for (let i = 0; i < 5; i++) {
      const y = 250 + i * 108;
      out += `<rect x="160" y="${y}" width="26" height="26" fill="${
        i === 1 ? C.signal : "none"
      }" stroke="${C.ink}" stroke-width="2"/>`;
      out += `<path d="M206 ${y + 13} H ${300 + (i % 3) * 42}" stroke="${C.faint}" stroke-width="2"/>`;
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const x = 420 + col * 242;
        const y = 160 + row * 202;
        const hot = row === 1 && col === 2;
        out += `<rect x="${x}" y="${y}" width="204" height="172" fill="${
          C.paper2
        }" stroke="${hot ? C.signal : C.ink}" stroke-width="${hot ? 3.5 : 1.8}"/>`;
        out += `<circle cx="${x + 102}" cy="${y + 70}" r="${
          40 + ((row * 4 + col) % 3) * 10
        }" fill="none" stroke="${hot ? C.signal : C.faint}" stroke-width="1.8"/>`;
        out += `<path d="M${x + 40} ${y + 140} H ${x + 146}" stroke="${
          C.ink
        }" stroke-width="3"/>`;
        if (hot)
          out += `<path d="M${x + 132} ${y + 28} l 48 0 l -8 36 l -32 0 Z" fill="${C.signal}"/>`;
      }
    }

    out += `<path d="M1046 796 h 38 l 38 92 h 152 l 36 -66 h -208" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="1142" cy="916" r="16" fill="none" stroke="${C.ink}" stroke-width="3"/>
      <circle cx="1254" cy="916" r="16" fill="none" stroke="${C.ink}" stroke-width="3"/>`;

    return out;
  },

  /* Inference: a measured series, then a forecast that admits its range. */
  "predictive-analytics": (r) => {
    let out = `<path d="M220 200 V 800 H 1400" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
    for (let i = 1; i < 6; i++)
      out += `<path d="M220 ${800 - i * 100} H 1400" stroke="${C.line}" stroke-width="1.4"/>`;
    for (let i = 1; i < 6; i++)
      out += `<path d="M${220 + i * 196} 200 V 800" stroke="${C.line}" stroke-width="1.4"/>`;
    for (let i = 1; i < 6; i++)
      out += `<path d="M204 ${800 - i * 100} H 220" stroke="${C.faint}" stroke-width="2"/>`;
    for (let i = 1; i < 6; i++)
      out += `<path d="M${220 + i * 196} 800 v 16" stroke="${C.faint}" stroke-width="2"/>`;

    const pts = [];
    for (let i = 0; i < 9; i++)
      pts.push([
        240 + i * 100,
        Math.max(290, Math.min(730, 690 - i * 20 + (r() - 0.5) * 150)),
      ]);

    out += `<path d="M${pts.map(([x, y]) => `${n(x)} ${n(y)}`).join(" L ")}" fill="none" stroke="${
      C.ink
    }" stroke-width="4" stroke-linejoin="round"/>`;
    pts.forEach(
      ([x, y]) =>
        (out += `<circle cx="${n(x)}" cy="${n(y)}" r="7" fill="${C.paper}" stroke="${
          C.ink
        }" stroke-width="2.5"/>`)
    );

    const [lx, ly] = pts[pts.length - 1];
    out += `<path d="M${n(lx)} ${n(ly)} C 1180 ${n(ly - 60)}, 1280 340, 1400 330 L 1400 440 C 1280 452, 1180 ${n(
      ly + 30
    )}, ${n(lx)} ${n(ly)} Z" fill="${C.signal}" opacity="0.12" stroke="none"/>
      <path d="M${n(lx)} ${n(ly)} C 1180 ${n(ly - 60)}, 1280 350, 1400 340" fill="none" stroke="${
      C.signal
    }" stroke-width="3" stroke-dasharray="9 10"/>
      <path d="M${n(lx)} ${n(ly)} C 1180 ${n(ly + 30)}, 1280 440, 1400 430" fill="none" stroke="${
      C.signal
    }" stroke-width="2" stroke-dasharray="4 10"/>
      <path d="M${n(lx)} 220 V 800" stroke="${C.faint}" stroke-width="2"/>`;

    return out;
  },

  /* The earliest build: strips of set-up, one punchline. */
  "chuck-norris-jokes": (r) => {
    let out = "";
    for (let i = 0; i < 5; i++) {
      const x = 176 + (i % 3) * 58;
      const y = 224 + i * 140;
      const w = 700 + ((i * 137) % 220);
      out += `<rect x="${x}" y="${y}" width="${w}" height="86" fill="${C.paper2}" stroke="${C.ink}" stroke-width="2"/>`;
      let tx = x + 28;
      while (tx < x + w - 120) {
        const len = 42 + r() * 82;
        out += `<path d="M${n(tx)} ${y + 34} h ${n(len)}" stroke="${C.faint}" stroke-width="3"/>`;
        tx += len + 18;
      }
      out += `<path d="M${x + 28} ${y + 58} h ${n(w * 0.42)}" stroke="${C.faint}" stroke-width="2"/>`;
      out += `<rect x="${x + w - 58}" y="${y + 26}" width="30" height="34" fill="${
        i === 1 ? C.signal : C.ink
      }"/>`;
    }

    const bx = 1352;
    const by = 430;
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r1 = 46;
      const r2 = 92 + (i % 3) * 30;
      out += `<path d="M${n(bx + Math.cos(a) * r1)} ${n(by + Math.sin(a) * r1)} L ${n(
        bx + Math.cos(a) * r2
      )} ${n(by + Math.sin(a) * r2)}" stroke="${C.signal}" stroke-width="${
        i % 2 ? 2 : 3.5
      }" stroke-linecap="round"/>`;
    }

    return out;
  },
};

/* ---------- plates ---------- */

const PLATES = [
  ["loyalmini", 1],
  ["rack-cloud-pos", 2],
  ["peer-play", 3],
  ["conduit", 4],
  ["kagoroute", 5],
  ["vektorfleet", 6],
  ["flotilla", 7],
  ["chat-server", 8],
  ["portfolio-signal", 9],
  ["ai-task-manager", 10],
  ["nft-marketplace", 11],
  ["ecommerce-platform", 12],
  ["predictive-analytics", 13],
  ["chuck-norris-jokes", 14],
];

const only = process.argv.slice(2);
const targets = only.length
  ? PLATES.filter(([slug]) => only.includes(slug))
  : PLATES;

mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, index] of targets) {
  const draw = motifs[slug];
  if (!draw) {
    console.error(`no motif for ${slug}`);
    process.exitCode = 1;
    continue;
  }

  const r = rng(hash(slug));
  const body = draw(r);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${C.paper}"/>
    <g opacity="0.55">${furniture(index)}</g>
    <g stroke-linecap="round" stroke-linejoin="round">${body}</g>
  </svg>`;

  const out = join(OUT_DIR, `${slug}.webp`);
  const info = await sharp(Buffer.from(svg))
    .webp({ quality: 88, effort: 6 })
    .toFile(out);

  console.log(
    `${slug.padEnd(22)} ${info.width}×${info.height}  ${(
      info.size / 1024
    ).toFixed(0)} kB`
  );
}
