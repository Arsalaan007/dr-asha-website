"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `to` once the number scrolls into view. Server-renders the final value. */
export function CountUp({ to, suffix = "", ms = 1400 }: { to: number; suffix?: string; ms?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / ms);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, ms]);

  return (
    <span ref={el} className="count">
      {n}
      {suffix}
    </span>
  );
}
