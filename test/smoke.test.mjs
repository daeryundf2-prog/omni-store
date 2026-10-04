/* OmniLegal storefront — smoke tests (stdlib only, run via `node --test test/`).
 *
 * Covers the fragile seams of this dependency-free static site:
 *  - studio.html's main inline <script> compiles and its DOC_TYPES table is
 *    consistent with the render dispatch (render[curLang] || render[langs[0]]).
 *  - every <script type="application/ld+json"> block is valid JSON.
 *  - settlement_config.js compiles and carries no plaintext unlock codes
 *    (only digests — the OMNI-XXXX format comment is the only legit literal).
 *  - every <loc> in sitemap.xml resolves to a real file in the repo.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const read = (rel) => readFileSync(path.join(ROOT, rel), "utf8");

const INDEX_HTML = read("index.html");
const STUDIO_HTML = read("studio.html");
const SETTLEMENT_JS = read("settlement_config.js");
const SITEMAP_XML = read("sitemap.xml");
const SITE_ORIGIN = "https://daeryundf2-prog.github.io/omni-store";

/* The main inline script is the only bare `<script>` tag (the JSON-LD and
 * settlement_config tags carry attributes). Same extraction the build
 * scripts (build_doc_pages.js / build_lang_pages.js) rely on. */
function extractMainScript(html) {
  const m = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(m, "no bare inline <script> block found");
  return m[1];
}

function extractJsonLdBlocks(html) {
  return [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]);
}

/* Evaluate the studio script with the same DOM stub the build scripts use,
 * returning its top-level bindings (DOC_TYPES etc.). Executes real init
 * code, so this doubles as a "boots cleanly" smoke check. */
function loadStudioBindings() {
  const el = () => ({
    innerHTML: "", textContent: "", value: "", dataset: {}, style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    appendChild() {}, setAttribute() {}, addEventListener() {},
    scrollIntoView() {}, querySelector: el, querySelectorAll: () => [],
    closest: el, getContext: () => ({}), toDataURL: () => "",
    setPointerCapture() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }),
  });
  const store = {};
  const sandbox = {
    window: { OMNI_SETTLEMENT: null },
    document: {
      getElementById: (id) => (String(id).startsWith("f_") ? null : el()),
      querySelector: el, querySelectorAll: () => [], addEventListener() {},
      createElement: el,
      body: { appendChild() {}, classList: { add() {}, remove() {}, toggle() {} } },
    },
    localStorage: {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = v; },
      removeItem: (k) => { delete store[k]; },
    },
    history: {}, location: {}, navigator: {},
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    crypto: require("node:crypto").webcrypto,
    URLSearchParams, TextEncoder, TextDecoder, console, setTimeout, clearTimeout,
  };
  const ctx = vm.createContext(sandbox);
  vm.runInContext(SETTLEMENT_JS, ctx, { filename: "settlement_config.js" });
  return vm.runInContext(
    extractMainScript(STUDIO_HTML) + "\n;({ DOC_TYPES, LANGUAGES, STUDIO })",
    ctx,
    { filename: "studio.html#inline-script" },
  );
}

test("studio.html main <script> block extracts and compiles", () => {
  const js = extractMainScript(STUDIO_HTML);
  assert.ok(js.includes("const DOC_TYPES"), "extracted block should contain DOC_TYPES");
  // Compiles without executing — catches unbalanced braces/backticks in edits.
  new vm.Script(js, { filename: "studio.html#inline-script" });
});

test("every application/ld+json block parses as JSON", () => {
  const indexBlocks = extractJsonLdBlocks(INDEX_HTML);
  assert.equal(indexBlocks.length, 1, "index.html should have exactly one JSON-LD block");
  const indexLd = JSON.parse(indexBlocks[0]);
  assert.ok(Array.isArray(indexLd), "index.html JSON-LD is a top-level array");
  assert.equal(indexLd.length, 2, "index.html JSON-LD array: ItemList + FAQPage");

  const studioBlocks = extractJsonLdBlocks(STUDIO_HTML);
  assert.equal(studioBlocks.length, 1, "studio.html should have exactly one JSON-LD block");
  const studioLd = JSON.parse(studioBlocks[0]);
  assert.equal(studioLd["@type"], "WebApplication");
});

test("every DOC_TYPES entry has a renderer for its fallback lang", () => {
  // Contract from the render dispatch (studio.html):
  //   activeDoc.render[curLang] || activeDoc.render[activeDoc.langs[0]]
  // Missing langs fall back to langs[0], so langs[0] MUST have a renderer.
  const { DOC_TYPES } = loadStudioBindings();
  assert.ok(Array.isArray(DOC_TYPES) && DOC_TYPES.length > 100, "DOC_TYPES should enumerate all docs");
  for (const d of DOC_TYPES) {
    assert.ok(Array.isArray(d.langs) && d.langs.length > 0, `${d.id}: langs must be a non-empty array`);
    assert.equal(
      typeof d.render?.[d.langs[0]],
      "function",
      `${d.id}: no renderer for fallback lang "${d.langs[0]}"`,
    );
    for (const key of Object.keys(d.render ?? {})) {
      assert.ok(d.langs.includes(key), `${d.id}: render key "${key}" is not a declared lang`);
    }
  }
});

test("settlement_config.js compiles and holds digests, not plaintext codes", () => {
  new vm.Script(SETTLEMENT_JS, { filename: "settlement_config.js" });
  // Unlock codes look like OMNI-XXXX; the file should only carry their
  // djb2 digests plus the OMNI-XXXX format reference in comments.
  const literals = new Set(SETTLEMENT_JS.match(/OMNI-[0-9A-Z]{4,8}/g) ?? []);
  assert.ok(
    literals.size <= 5,
    `expected <=5 OMNI-* literals (format comments), found ${literals.size}: ${[...literals].join(", ")}`,
  );

  const ctx = vm.createContext({ window: {} });
  vm.runInContext(SETTLEMENT_JS, ctx);
  const studio = ctx.window.OMNI_SETTLEMENT?.studio;
  assert.ok(studio, "window.OMNI_SETTLEMENT.studio must exist");
  assert.ok(Array.isArray(studio.unlockDigests), "studio.unlockDigests must be an array");
  for (const digest of studio.unlockDigests) {
    assert.equal(typeof digest, "string", "digests must be strings");
    assert.ok(!/OMNI-[0-9A-Z]{4,8}/.test(digest), `digest "${digest}" looks like a plaintext code`);
  }
});

test("every sitemap.xml <loc> resolves to a file in the repo", () => {
  const locs = [...SITEMAP_XML.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 0, "sitemap.xml has no <loc> entries");
  const missing = [];
  for (const url of locs) {
    assert.ok(url.startsWith(SITE_ORIGIN), `unexpected sitemap origin: ${url}`);
    const rel = url.slice(SITE_ORIGIN.length).replace(/^\//, "") || "index.html";
    if (!existsSync(path.join(ROOT, rel))) missing.push(rel);
  }
  assert.deepEqual(missing, [], "sitemap references missing files");
});
