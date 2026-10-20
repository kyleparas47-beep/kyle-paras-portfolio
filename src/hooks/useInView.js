import { useEffect, useState } from "react";

// Flips to true the first time `ref` scrolls into view, then stops observing.
export function useInView(ref, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}
