import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist", "public");
const templatePath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHead(seo) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonical = escapeHtml(seo.canonical);
  const ogImage = escapeHtml(seo.ogImage);
  const ogUrl = escapeHtml(seo.ogUrl);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${ogUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ].join("\n    ");
}

function build404Head() {
  return [
    `<title>404 — Page Not Found | Brandon Fire & Safety Equipment Co Inc</title>`,
    `<meta name="robots" content="noindex, follow" />`,
  ].join("\n    ");
}

// Build-time guard: catch a broken prerender (empty body, missing/duplicate
// H1 or title) before it ships instead of silently serving blank pages.
function assertValid(url, html) {
  const errors = [];
  const titles = (html.match(/<title>/g) || []).length;
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (titles !== 1) errors.push(`expected 1 <title>, found ${titles}`);
  if (h1s !== 1) errors.push(`expected 1 <h1>, found ${h1s}`);
  if (html.includes("<!--app-html-->")) errors.push("body placeholder not replaced");
  if (html.includes("<!--app-head-->")) errors.push("head placeholder not replaced");
  if (errors.length) {
    throw new Error(`Prerender validation failed for "${url}": ${errors.join("; ")}`);
  }
}

// Framer Motion serializes its `initial` animation state into inline styles
// (opacity:0, transform offsets). Because the client uses createRoot().render()
// (not hydration), the prerendered DOM is only for crawlers and first paint, so
// we neutralize the hidden state to keep the static content genuinely visible.
function revealMotion(html) {
  return html
    .replace(/opacity:\s*0(?=[;"])/g, "opacity:1")
    .replace(/transform:[^;"]*translate[^;"]*/g, "transform:none");
}

const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  root,
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "warn",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { seoByPath, prerenderRoutes } = await vite.ssrLoadModule("/src/lib/seo.ts");
  const template = fs.readFileSync(templatePath, "utf-8");

  for (const url of prerenderRoutes) {
    const seo = seoByPath[url];
    const appHtml = revealMotion(render(url));
    const html = template
      .replace("<!--app-head-->", buildHead(seo))
      .replace("<!--app-html-->", appHtml);
    assertValid(url, html);

    const outPath =
      url === "/"
        ? templatePath
        : path.join(distDir, url.replace(/^\//, ""), "index.html");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`prerendered ${url} -> ${path.relative(root, outPath)}`);
  }

  // Netlify serves /404.html with a real 404 status for any path that does not
  // match a static file, so unknown URLs return a proper 404 instead of a soft
  // 404 (homepage content with a 200 status).
  const notFoundHtml = template
    .replace("<!--app-head-->", build404Head())
    .replace("<!--app-html-->", revealMotion(render("/__not-found__")));
  assertValid("/404", notFoundHtml);
  const notFoundPath = path.join(distDir, "404.html");
  fs.writeFileSync(notFoundPath, notFoundHtml);
  console.log(`prerendered 404 -> ${path.relative(root, notFoundPath)}`);
} finally {
  await vite.close();
}
