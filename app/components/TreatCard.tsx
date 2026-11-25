"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import spine from "@/lib/lottie/spine.json";
import neck from "@/lib/lottie/neck.json";
import joint from "@/lib/lottie/joint.json";
import ecg from "@/lib/lottie/ecg.json";
import neuron from "@/lib/lottie/neuron.json";
import vestibular from "@/lib/lottie/vestibular.json";

const animations = { spine, neck, joint, ecg, neuron, vestibular };
export type AnimKey = keyof typeof animations;

const IDLE = 0.6; // gentle loop
const ACTIVE = 1.8; // on hover / tap

export function TreatCard({ title, text, anim }: { title: string; text: string; anim: AnimKey }) {
  const box = useRef<HTMLSpanElement>(null);
  const player = useRef<AnimationItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    let io: IntersectionObserver | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !box.current) return;
      const a = lottie.loadAnimation({
        container: box.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: structuredClone(animations[anim]),
      });
      a.setSpeed(IDLE);
      player.current = a;
      if (reduce) return a.goToAndStop(30, true);
      // only animate while on screen
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? a.play() : a.pause()), { threshold: 0.2 });
      io.observe(box.current);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      player.current?.destroy();
    };
  }, [anim]);

  const speed = (s: number) => player.current?.setSpeed(s);

  return (
    <article
      className="card treat"
      tabIndex={0}
      onPointerEnter={() => speed(ACTIVE)}
      onPointerLeave={() => speed(IDLE)}
      onFocus={() => speed(ACTIVE)}
      onBlur={() => speed(IDLE)}
      onPointerDown={() => {
        player.current?.goToAndPlay(0, true);
        speed(ACTIVE);
      }}
    >
      <span className="icon icon-lottie" ref={box} data-lottie={anim} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
