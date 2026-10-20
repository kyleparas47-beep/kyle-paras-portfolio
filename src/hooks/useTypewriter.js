import { useEffect, useState } from "react";

export function useTypewriter(words, reduced) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return undefined;
    }
    let wi = 0;
    let ci = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      setText(word.slice(0, Math.max(0, ci)));
      let delay = deleting ? 36 : 68;
      if (!deleting && ci === word.length) {
        delay = 1300;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        delay = 280;
      }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, [words, reduced]);
  return text;
}
