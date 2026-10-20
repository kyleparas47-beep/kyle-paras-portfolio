import { useEffect, useState } from "react";

// Tracks which section is under the top bar. Returns null when disabled (e.g. off the home page).
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!enabled) return undefined;
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      let current = ids[0];
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top <= 120) current = node.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, enabled]);
  return enabled ? active : null;
}
