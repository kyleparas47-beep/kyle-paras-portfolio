import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Router navigation doesn't scroll by itself: jump to the #hash target, or to the top of a new page.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);
  return null;
}
