"use client";

import { useEffect, useState } from "react";
import { toIsoDate } from "./day";

function msUntilMidnight(now = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next.getTime() - now.getTime() + 1000;
}

/** Today's date that also rolls over at midnight and when a tab comes back from the background. */
export function useToday() {
  const [today, setToday] = useState(() => toIsoDate(new Date()));

  useEffect(() => {
    const refresh = () => setToday(toIsoDate(new Date()));
    let timer = window.setTimeout(function tick() {
      refresh();
      timer = window.setTimeout(tick, msUntilMidnight());
    }, msUntilMidnight());

    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return today;
}
