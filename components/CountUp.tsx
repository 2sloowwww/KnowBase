"use client";

import { useEffect, useRef, useState } from "react";
import { formatRupeesFull } from "@/lib/format";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const FORMATTERS = {
  int: (n: number) => String(n),
  rupees: (n: number) => formatRupeesFull(n),
} as const;

/**
 * Always renders the real, correct final value by default (SSR-safe, crawlable, no
 * flash of "0" for no-JS clients or bots). Only animates from 0 when the element
 * starts off-screen at mount and is later scrolled into view — content already
 * visible on load is never touched, so the true figure is never briefly wrong.
 */
export function CountUp({
  end,
  duration = 1600,
  format,
}: {
  end: number;
  duration?: number;
  format: keyof typeof FORMATTERS;
}) {
  const formatFn = FORMATTERS[format];
  const [value, setValue] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    let cancelled = false;
    const resetId = requestAnimationFrame(() => {
      if (!cancelled) setValue(0);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const startTime = performance.now();
          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.round(end * easeOutExpo(progress)));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      cancelAnimationFrame(resetId);
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {formatFn(value)}
    </span>
  );
}
