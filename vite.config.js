import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/data/projects.js";
import { site } from "./src/data/site.js";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// After the build, write a static HTML file per route with its own title, description and share tags.
// Link previews (LinkedIn, Messenger, Slack) and search crawlers read these without running JavaScript,
// and deep links like /projects/<slug> resolve on any static host.
function staticPages(siteUrl) {
  let outDir;
  return {
    name: "static-pages",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle() {
      const template = readFileSync(join(outDir, "index.html"), "utf8");
      const hasOgImage = existsSync("public/og-image.png");

      const render = ({ title, description, path }) => {
        const head = [];
        if (siteUrl) {
          head.push(`<link rel="canonical" href="${siteUrl}${path}" />`);
          head.push(`<meta property="og:url" content="${siteUrl}${path}" />`);
          if (hasOgImage) head.push(`<meta property="og:image" content="${siteUrl}/og-image.png" />`);
        }
        return template
          .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(description)}`)
          .replace("</head>", `${head.join("\n    ")}\n  </head>`);
      };

      const write = (file, html) => {
        const full = join(outDir, file);
        mkdirSync(join(full, ".."), { recursive: true });
        writeFileSync(full, html);
      };

      const pages = [
        { file: "index.html", path: "/", title: site.title, description: site.description },
        ...projects.map((p) => ({
          file: `projects/${p.slug}/index.html`,
          path: `/projects/${p.slug}`,
          title: `${p.title} — ${site.name}`,
          description: p.summary || p.problem,
        })),
      ];
      pages.forEach((page) => write(page.file, render(page)));
      write("404.html", render({ path: "/404", title: `Page not found — ${site.name}`, description: site.description }));

      const robots = ["User-agent: *", "Allow: /"];
      if (siteUrl) {
        robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
        const urls = pages.map((p) => `  <url><loc>${siteUrl}${p.path}</loc></url>`).join("\n");
        write(
          "sitemap.xml",
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        );
      } else {
        console.warn("\n[static-pages] VITE_SITE_URL is not set: skipping sitemap.xml, canonical and og:url tags.");
      }
      write("robots.txt", `${robots.join("\n")}\n`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = (env.VITE_SITE_URL || "").replace(/\/+$/, "");
  return {
    plugins: [react(), staticPages(siteUrl)],
    server: {
      port: 5173,
      host: true,
    },
  };
});
