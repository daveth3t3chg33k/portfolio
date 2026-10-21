/*
 * Capture the real product screenshots used by the work case files.
 *
 *   node scripts/capture-work-shots.mjs [slug ...]
 *
 * Uses headless Chrome (no extra dependency) at 2x scale, then downscales to
 * 1440px WebP so the files stay small enough to commit. Re-run it whenever a
 * product changes; captions on the site read the capture date from git, so
 * keep the two honest by updating `captured` in src/lib/projects.ts.
 *
 * Only real, live URLs belong here. A project with no public deployment gets
 * the typographic plate on its case page instead — never a mockup.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const SHOTS = [
  {
    slug: "loyalmini",
    url: "https://loyalmini.com",
    wait: 10000,
  },
  {
    slug: "rack-cloud-pos",
    url: "https://www.rack.business/",
    wait: 12000,
  },
  {
    slug: "portfolio-signal",
    url: "http://127.0.0.1:3007/",
    wait: 12000,
    // The portfolio is captured from the local dev server — run `npm run dev`
    // on this port first.
  },
];

const WIDTH = 1440;
const HEIGHT = 900;
const OUT_DIR = "public/work";
const TMP_DIR = join(tmpdir(), "work-shots");

const only = process.argv.slice(2);
const targets = only.length ? SHOTS.filter((s) => only.includes(s.slug)) : SHOTS;

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

for (const shot of targets) {
  const png = join(TMP_DIR, `${shot.slug}.png`);
  const profile = join(TMP_DIR, `profile-${shot.slug}`);

  console.log(`→ ${shot.slug}  ${shot.url}`);

  try {
    execFileSync(
      "google-chrome",
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${profile}`,
        `--window-size=${WIDTH},${HEIGHT}`,
        "--force-device-scale-factor=2",
        `--virtual-time-budget=${shot.wait}`,
        `--screenshot=${png}`,
        shot.url,
      ],
      { stdio: ["ignore", "ignore", "pipe"], timeout: 90_000 }
    );
  } catch (error) {
    console.error(`  failed: ${error.message}`);
    continue;
  }

  const out = join(OUT_DIR, `${shot.slug}.webp`);
  const info = await sharp(png)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(out);

  console.log(`  ${out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);

  rmSync(profile, { recursive: true, force: true });
}
