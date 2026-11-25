"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import { treatments } from "@/lib/site";
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
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Swap the large animation when the condition changes
  useEffect(() => {
    let cancelled = false;
    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !anim.current) return;
      player.current?.destroy();
      player.current = lottie.loadAnimation({
        container: anim.current,
        renderer: "svg",
        loop: true,
        autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
    <div className="explorer" ref={root}>
      <div className="body-wrap">
        <svg className="body" viewBox="0 0 200 420" role="group" aria-label="Select an area of the body">
          <defs>
            <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e9f3f2" />
            </linearGradient>
            <radialGradient id="glow">
              <stop offset="0" stopColor="#0f7a7a" stopOpacity=".28" />
              <stop offset="1" stopColor="#0f7a7a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* figure */}
          <g className="figure" fill="url(#bodyFill)" stroke="#bcd6d3" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M108,64 C110.8,66.7 106.7,76.0 109,80 C111.3,84.0 116.8,85.7 122,88 C127.2,90.3 135.0,91.3 140,94 C145.0,96.7 149.3,99.0 152,104 C154.7,109.0 154.7,113.8 156,124 C157.3,134.2 158.5,150.7 160,165 C161.5,179.3 163.7,198.2 165,210 C166.3,221.8 168.0,230.0 168,236 C168.0,242.0 166.8,244.7 165,246 C163.2,247.3 159.0,247.3 157,244 C155.0,240.7 154.5,236.7 153,226 C151.5,215.3 149.7,194.3 148,180 C146.3,165.7 144.3,144.0 143,140 C141.7,136.0 141.3,147.7 140,156 C138.7,164.3 135.2,178.3 135,190 C134.8,201.7 138.7,207.7 139,226 C139.3,244.3 138.3,277.7 137,300 C135.7,322.3 132.3,343.7 131,360 C129.7,376.3 129.0,389.7 129,398 C129.0,406.3 133.8,408.0 131,410 C128.2,412.0 115.7,412.0 112,410 C108.3,408.0 109.7,406.3 109,398 C108.3,389.7 108.7,376.3 108,360 C107.3,343.7 106.2,318.0 105,300 C103.8,282.0 101.8,260.3 101,252 C100.2,243.7 100.3,250.0 100,250 C99.7,250.0 99.8,243.7 99,252 C98.2,260.3 96.2,282.0 95,300 C93.8,318.0 92.7,343.7 92,360 C91.3,376.3 91.7,389.7 91,398 C90.3,406.3 91.7,408.0 88,410 C84.3,412.0 71.8,412.0 69,410 C66.2,408.0 71.0,406.3 71,398 C71.0,389.7 70.3,376.3 69,360 C67.7,343.7 64.3,322.3 63,300 C61.7,277.7 60.7,244.3 61,226 C61.3,207.7 65.2,201.7 65,190 C64.8,178.3 61.3,164.3 60,156 C58.7,147.7 58.3,136.0 57,140 C55.7,144.0 53.7,165.7 52,180 C50.3,194.3 48.5,215.3 47,226 C45.5,236.7 45.0,240.7 43,244 C41.0,247.3 36.8,247.3 35,246 C33.2,244.7 32.0,242.0 32,236 C32.0,230.0 33.7,221.8 35,210 C36.3,198.2 38.5,179.3 40,165 C41.5,150.7 42.7,134.2 44,124 C45.3,113.8 45.3,109.0 48,104 C50.7,99.0 55.0,96.7 60,94 C65.0,91.3 72.8,90.3 78,88 C83.2,85.7 88.7,84.0 91,80 C93.3,76.0 89.2,66.7 92,64 C94.8,61.3 105.2,61.3 108,64 Z" />
            <ellipse cx="100" cy="40" rx="21" ry="25" />
          </g>
          {/* spine hint */}
          <g className="spine-hint" fill="#cfe3e1">
            {[100, 113, 126, 139, 152, 165, 178, 191, 204, 217].map((y, k) => (
              <rect key={y} x={96.5 + (k > 6 ? 0.5 : 0)} y={y} width={7 + (k > 6 ? 1 : 0)} height="8.5" rx="3" />
            ))}
          </g>

          {/* hotspots */}
          {treatments.map((tr, i) => {
            const on = i === active;
            return (
              <g
                key={tr.id}
                className={`spot ${on ? "is-on" : ""}`}
                transform={`translate(${tr.spot.x} ${tr.spot.y})`}
                role="button"
                tabIndex={0}
                aria-label={`${tr.area}: ${tr.title}`}
                aria-pressed={on}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(i);
                  }
                }}
              >
                <circle r="22" fill="url(#glow)" className="spot-glow" />
                <circle r="8" className="spot-ring" />
                <circle r="3.6" className="spot-dot" />
                <circle r="16" fill="transparent" />
              </g>
            );
          })}
        </svg>
        <p className="body-hint">Tap a point on the body</p>
      </div>

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
