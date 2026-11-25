"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import { treatments } from "@/lib/site";
import { BodyFigure } from "./BodyFigure";
import spine from "@/lib/lottie/spine.json";
import neck from "@/lib/lottie/neck.json";
import joint from "@/lib/lottie/joint.json";
import ecg from "@/lib/lottie/ecg.json";
import neuron from "@/lib/lottie/neuron.json";
import vestibular from "@/lib/lottie/vestibular.json";

const animations = { spine, neck, joint, ecg, neuron, vestibular };
const CYCLE_MS = 5200;

/** Interactive body map: hotspots on a figure select a condition; the panel shows its details. */
export function TreatmentsExplorer() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const anim = useRef<HTMLDivElement>(null);
  const player = useRef<AnimationItem | null>(null);
  const inView = useRef(false);
  const [visible, setVisible] = useState(false);

  const select = useCallback((i: number) => {
    setAuto(false); // stop the tour once the visitor takes over
    setActive(i);
  }, []);

  // Auto-tour while on screen, until the visitor interacts
  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => {
      if (inView.current && !document.hidden) setActive((a) => (a + 1) % treatments.length);
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, [auto]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        setVisible(e.isIntersecting);
        if (e.isIntersecting) player.current?.play();
        else player.current?.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Swap the large animation when the condition changes
  useEffect(() => {
    let cancelled = false;
    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled || !anim.current) return;
      player.current?.destroy();
      player.current = lottie.loadAnimation({
        container: anim.current,
        renderer: "svg",
        loop: true,
        autoplay: inView.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        animationData: structuredClone(animations[treatments[active].anim]),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [active]);

  useEffect(() => () => player.current?.destroy(), []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((active + 1) % treatments.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((active - 1 + treatments.length) % treatments.length);
    }
  };

  const t = treatments[active];

  return (
    <div className={`explorer ${visible ? "" : "is-paused"}`} ref={root}>
      <BodyFigure active={active} onSelect={select} />

      <div className="explorer-panel" aria-live="polite">
        <div className="panel-top">
          <div className="panel-anim" ref={anim} aria-hidden="true" />
          <div>
            <span className="panel-area">{t.area}</span>
            <span className="panel-count">
              {String(active + 1).padStart(2, "0")} / {String(treatments.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <h3 key={t.id} className="panel-title">{t.title}</h3>
        <p className="panel-text">{t.text}</p>
        <ul className="panel-tags">
          {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="panel-progress">
          <span key={`${active}-${auto}`} className={auto ? "is-running" : ""} style={{ animationDuration: `${CYCLE_MS}ms` }} />
        </div>
        <div className="explorer-tabs" role="tablist" aria-label="Conditions" onKeyDown={onKey}>
          {treatments.map((tr, i) => (
            <button
              key={tr.id}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? "is-on" : ""}
              onClick={() => select(i)}
            >
              {tr.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
