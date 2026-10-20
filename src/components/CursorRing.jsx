import { useEffect, useRef, useState } from "react";

const HOT_TARGETS = "a, button, .work-card, .chip, .meter, .resume-frame";

export default function CursorRing() {
  const ring = useRef(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      if (ring.current) {
        ring.current.style.left = `${e.clientX}px`;
        ring.current.style.top = `${e.clientY}px`;
      }
      const target = e.target;
      setHot(Boolean(target.closest && target.closest(HOT_TARGETS)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ring} className={`cursor-ring${hot ? " hot" : ""}`} aria-hidden="true" />;
}
