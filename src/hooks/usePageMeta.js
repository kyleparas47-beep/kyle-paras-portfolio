import { useEffect } from "react";
import { site } from "../data";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Keeps the tab title and share tags in sync during client-side navigation.
// The build also writes a static HTML file per route (see vite.config.js) for crawlers and link previews.
export function usePageMeta({ title, description = site.description } = {}) {
  useEffect(() => {
    const full = title ? `${title} — ${site.name}` : site.title;
    document.title = full;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
  }, [title, description]);
}
