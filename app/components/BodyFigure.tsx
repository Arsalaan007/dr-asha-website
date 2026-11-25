"use client";

import { useRef, useState } from "react";
import { treatments } from "@/lib/site";

type Id = (typeof treatments)[number]["id"];
const idx = (id: Id) => treatments.findIndex((t) => t.id === id);

/** Two-layer rounded "capsule" limb: outline + fill, so it can be highlighted and rotated. */
function Cap({ d, w, part }: { d: string; w: number; part: string }) {
  return (
    <g className={`cap ${part}`}>
      <path d={d} className="cap-o" strokeWidth={w + 2.6} />
      <path d={d} className="cap-f" strokeWidth={w} />
    </g>
  );
}

/**
 * Articulated mannequin. Each condition sets a "mode" class that animates the matching
 * joint (neck tilt, arm raise, knee bend…) and highlights that body part.
 * Hotspots live inside the moving groups, so they travel with the body.
 */
export function BodyFigure({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; i: number } | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mode = treatments[active].id;

  const move = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -6, y: px * 10 });
    setTip((t) => (t ? { ...t, x: e.clientX - r.left, y: e.clientY - r.top } : t));
  };

  // pointer + keyboard handlers for anything that maps to a condition
  const hit = (id: Id) => {
    const i = idx(id);
    return {
      "data-hit": id,
      onClick: () => onSelect(i),
      onPointerEnter: (e: React.PointerEvent) => {
        const r = wrap.current!.getBoundingClientRect();
        setTip({ x: e.clientX - r.left, y: e.clientY - r.top, i });
      },
      onPointerLeave: () => setTip(null),
    };
  };

  const Spot = ({ id }: { id: Id }) => {
    const i = idx(id);
    const t = treatments[i];
    const on = i === active;
    return (
      <g
        className={`spot ${on ? "is-on" : ""}`}
        transform={`translate(${t.spot.x} ${t.spot.y})`}
        role="button"
        tabIndex={0}
        aria-label={`${t.area}: ${t.title}`}
        aria-pressed={on}
        {...hit(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(i);
          }
        }}
      >
        <circle r="20" className="spot-glow" />
        <circle r="7.5" className="spot-ring" />
        <circle r="3.4" className="spot-dot" />
        <circle r="15" fill="transparent" />
      </g>
    );
  };

  return (
    <div
      className="body-wrap"
      ref={wrap}
      onPointerMove={move}
      onPointerLeave={() => {
        setTilt({ x: 0, y: 0 });
        setTip(null);
      }}
    >
      <svg
        className={`body mode-${mode}`}
        viewBox="-50 0 300 420"
        role="group"
        aria-label="Interactive body map — select an area"
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <defs>
          <radialGradient id="glow">
            <stop offset="0" stopColor="#0f6f8c" stopOpacity=".3" />
            <stop offset="1" stopColor="#0f6f8c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="brainGlow">
            <stop offset="0" stopColor="#3fb2d4" stopOpacity=".85" />
            <stop offset="1" stopColor="#3fb2d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="100" cy="410" rx="46" ry="6" className="floor-shadow" />

        <g className="g-sway">
          {/* legs (behind torso) */}
          <g className="g-legL">
            <Cap d="M116 236 L120 320" w={20} part="part-legL" />
            <Cap d="M120 320 L122 394" w={16} part="part-legL" />
            <Cap d="M122 400 L134 402" w={10} part="part-legL" />
          </g>
          <g className="g-legR" {...hit("surgery")}>
            <Cap d="M84 236 L80 320" w={20} part="part-legR" />
            <g className="g-shinR">
              <Cap d="M80 320 L78 394" w={16} part="part-legR" />
              <Cap d="M78 400 L66 402" w={10} part="part-legR" />
              <Spot id="surgery" />
            </g>
          </g>

          {/* upper body pivots at the hips */}
          <g className="g-upper">
            <g className="g-armL" {...hit("joints")}>
              <Cap d="M138 98 L148 158" w={14} part="part-armL" />
              <g className="g-foreL">
                <Cap d="M148 158 L154 216" w={12} part="part-armL" />
                <circle cx="155" cy="226" r="7" className="cap-hand part-armL" />
              </g>
            </g>
            <g className="g-armR" {...hit("joints")}>
              <Cap d="M62 98 L52 158" w={14} part="part-armR" />
              <g className="g-foreR">
                <Cap d="M52 158 L46 216" w={12} part="part-armR" />
                <circle cx="45" cy="226" r="7" className="cap-hand part-armR" />
              </g>
              <Spot id="joints" />
            </g>

            <g className="part-torso" {...hit("back")}>
              <path
                className="torso"
                d="M72 85 C88 80 112 80 128 85 C142 89 147 98 145 112 C142 134 137 150 135 168 C133 188 136 208 138 229 C120 241 80 241 62 229 C64 208 67 188 65 168 C63 150 58 134 55 112 C53 98 58 89 72 85 Z"
              />
              <g className="spine">
                {[100, 113, 126, 139, 152, 165, 178, 191, 204, 217].map((y, k) => (
                  <rect key={y} x={96.5} y={y} width="7" height="8.5" rx="3" style={{ "--k": k } as React.CSSProperties} />
                ))}
              </g>
              <Spot id="back" />
            </g>

            <g className="g-head">
              <g {...hit("neck")}>
                <rect x="93" y="58" width="14" height="28" rx="6.5" className="neck part-neck" />
              </g>
              <g {...hit("stroke")}>
                <ellipse cx="100" cy="40" rx="18.5" ry="22.5" className="head part-head" />
                <ellipse cx="100" cy="33" rx="14" ry="11" fill="url(#brainGlow)" className="brain" />
              </g>
              <g className="ear-rings" transform="translate(118 44)">
                <circle r="6" />
                <circle r="6" />
                <circle r="6" />
              </g>
              <Spot id="stroke" />
              <Spot id="vestibular" />
              <Spot id="neck" />
            </g>
          </g>
        </g>
      </svg>

      {tip && (
        <div className="body-tip" style={{ left: tip.x, top: tip.y }}>
          <strong>{treatments[tip.i].area}</strong>
          <span>{treatments[tip.i].title}</span>
        </div>
      )}
      <p className="body-hint">Tap the body or a point to explore</p>
    </div>
  );
}
