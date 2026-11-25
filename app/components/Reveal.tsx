"use client";

import { useEffect } from "react";

/** Adds a gentle fade-up to elements marked with data-reveal as they scroll into view. */
export function Reveal() {
  // Mark the page as "scrolling" so heavy animations can pause until the finger lifts
  useEffect(() => {
    const root = document.documentElement;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (!root.classList.contains("is-scrolling")) {
        root.classList.add("is-scrolling");
        window.dispatchEvent(new Event("scrollstart"));
      }
      clearTimeout(t);
      t = setTimeout(() => {
        root.classList.remove("is-scrolling");
        window.dispatchEvent(new Event("scrollend-idle"));
      }, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("reveal-ready");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
