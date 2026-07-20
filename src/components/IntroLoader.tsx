"use client";

import { useEffect, useState } from "react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

/**
 * Full-screen intro shown on every visit. A neon spiral blooms into a wide
 * circle over a deep plum-black backdrop, then disperses. The title fades in,
 * and the loader AUTO-ADVANCES into the portfolio (no click required).
 */
const TITLE_IN_MS = 900; // when the title fades in
const AUTO_ADVANCE_MS = 5000; // when the loader starts fading out
const FADE_MS = 800; // fade-out duration

export default function IntroLoader() {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  // Lock scroll while the loader is up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Title reveal + auto-advance + cleanup, all driven by timers
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const titleTimer = setTimeout(
      () => setTitleVisible(true),
      reduce ? 200 : TITLE_IN_MS
    );

    // On reduced motion, keep the intro brief
    const advanceAt = reduce ? 1400 : AUTO_ADVANCE_MS;
    const advanceTimer = setTimeout(() => setExiting(true), advanceAt);
    const unmountTimer = setTimeout(() => {
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "auto" });
      setMounted(false);
    }, advanceAt + FADE_MS);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(advanceTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#0a0512] transition-opacity ease-out ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden={exiting}
    >
      {/* Spiral */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      {/* Soft vignette so the title reads cleanly */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,5,18,0.75)_100%)]" />

      {/* Title card (non-interactive; the loader advances on its own) */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-1000 ease-out ${
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="block text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
          Purab Ashmaniwala
        </span>
        <span className="mt-3 block gradient-brand text-2xl md:text-3xl font-semibold uppercase tracking-[0.2em]">
          Explore my work
        </span>
      </div>
    </div>
  );
}
