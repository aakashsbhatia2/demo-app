import { useEffect, useState } from "react";

import { CLOCK_TICK_MS } from "@/constants/run";

export function useNow(isTicking: boolean) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isTicking) return;
    const interval = setInterval(() => setNow(Date.now()), CLOCK_TICK_MS);
    return () => clearInterval(interval);
  }, [isTicking]);

  return now;
}
