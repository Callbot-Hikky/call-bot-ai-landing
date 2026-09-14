// Local lab check: serve the PROD static build then run Lighthouse on the
// public pages.
// Usage:
//   bun run lh            → mobile + desktop (default)
//   bun run lh mobile     → mobile only (Google's default form factor)
//   bun run lh desktop    → desktop only
//
// Static build: pages are prerendered to `dist/` and served with Bun's static
// server. Lighthouse targets public marketing pages — that's where CWV matters.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { brotliCompressSync } from "node:zlib";

// Avoid 4321 (astro dev default) so we never audit a running dev server.
const PORT = 4399;
const ROOT = "dist";
const BASE = `http://localhost:${PORT}`;

// Public pages to audit (CWV / SEO signal lives here).
const PATHS = ["/"];

const mode = (process.argv[2] ?? "both").toLowerCase();
const forms =
  mode === "mobile"
    ? ["mobile"]
    : mode === "desktop"
      ? ["desktop"]
      : ["mobile", "desktop"];

// Without these headers the bench measures a site nobody ships: Lighthouse
// computes FCP/LCP from real transfer sizes, so serving uncompressed inflates
// the simulated timeline. nginx.conf and Vercel both compress and cache —
// the bench must too, or it lies about the production page.
// NOTE: .woff2 is deliberately absent. It is already compressed; re-encoding
// makes it marginally larger.
const COMPRESSIBLE = /\.(html|css|js|json|svg|xml|txt)$/;

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const candidates = [
      `${ROOT}${pathname}`,
      `${ROOT}${pathname.replace(/\/$/, "")}/index.html`,
      `${ROOT}${pathname}.html`
    ];

    for (const candidate of candidates) {
      const file = Bun.file(candidate);

      if (await file.exists()) {
        const headers = { "content-type": file.type };

        // Hashed assets: same policy as nginx.conf.
        if (pathname.startsWith("/_astro/")) {
          headers["cache-control"] = "public, max-age=31536000, immutable";
        }

        if (COMPRESSIBLE.test(candidate)) {
          headers["content-encoding"] = "br";

          return new Response(
            brotliCompressSync(Buffer.from(await file.arrayBuffer())),
            { headers }
          );
        }

        return new Response(file, { headers });
      }
    }

    return new Response(Bun.file(`${ROOT}/404.html`), { status: 404 });
  }
});

function slug(path) {
  return path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-/, "");
}

function runLighthouse(url, form, jsonPath) {
  const flags = [
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox",
    "--output=json",
    "--output=html",
    `--output-path=${jsonPath.replace(/\.report\.json$/, "")}`
  ];

  if (form === "desktop") {
    flags.push("--preset=desktop");
  }

  return new Promise((resolve, reject) => {
    const lh = spawn("bunx", flags, { stdio: ["ignore", "ignore", "inherit"] });

    lh.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`lighthouse exited ${code}`))
    );
  });
}

const pct = (s) => (s == null ? "—" : String(Math.round(s * 100)));
const rows = [];
const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "");

try {
  for (const form of forms) {
    for (const path of PATHS) {
      // Timestamped: runs used to overwrite each other, which made two
      // measurements impossible to compare after the fact.
      const base = `lighthouse-${form}-${slug(path)}-${stamp}`;
      const jsonPath = `${base}.report.json`;

      console.error(`\n▶ Lighthouse — ${form} — ${path}`);
      await runLighthouse(`${BASE}${path}`, form, jsonPath);

      const r = JSON.parse(readFileSync(jsonPath, "utf8"));
      const c = r.categories;
      const a = r.audits;

      rows.push({
        form,
        path,
        perf: pct(c.performance?.score),
        a11y: pct(c.accessibility?.score),
        bp: pct(c["best-practices"]?.score),
        seo: pct(c.seo?.score),
        fcp: a["first-contentful-paint"]?.displayValue ?? "—",
        lcp: a["largest-contentful-paint"]?.displayValue ?? "—",
        tbt: a["total-blocking-time"]?.displayValue ?? "—",
        cls: a["cumulative-layout-shift"]?.displayValue ?? "—",
        si: a["speed-index"]?.displayValue ?? "—"
      });

      // The JSON is the exploitable source; the HTML is only a wrapper.
      console.error(`  ${jsonPath}`);
    }
  }
} finally {
  server.stop(true);
}

console.error("\n══════════ Lighthouse summary ══════════\n");
console.error(
  ["form", "page", "Perf", "A11y", "BP", "SEO", "FCP", "LCP", "TBT", "CLS", "SI"]
    .map((h) => h.padEnd(7))
    .join("")
);
for (const r of rows) {
  console.error(
    [r.form, r.path, r.perf, r.a11y, r.bp, r.seo, r.fcp, r.lcp, r.tbt, r.cls, r.si]
      .map((v) => String(v).padEnd(7))
      .join("")
  );
}
console.error("\nHTML reports: ./lighthouse-<form>-<page>.report.html\n");
