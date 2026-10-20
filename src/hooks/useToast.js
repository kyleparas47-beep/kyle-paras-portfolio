import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 1600) {
  const [message, setMessage] = useState("");
  const timer = useRef();
  const show = useCallback(
    (text) => {
      clearTimeout(timer.current);
      setMessage(text);
      timer.current = setTimeout(() => setMessage(""), duration);
    },
    [duration]
  );
  useEffect(() => () => clearTimeout(timer.current), []);
  return [message, show];
}
