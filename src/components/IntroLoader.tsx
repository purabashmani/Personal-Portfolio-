"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

/**
 * Full-screen intro shown on every visit. A neon spiral blooms into a wide
 * circle over a deep plum-black backdrop, then disperses. The title fades in
 * and the loader auto-advances into the portfolio. The visitor can also click
 * (or press Enter / Space / Esc) anywhere to skip straight in with the same
 * smooth fade.
 */
const TITLE_IN_MS = 900; // when the title fades in
const AUTO_ADVANCE_MS = 5000; // when the loader starts fading out on its own
const FADE_MS = 800; // fade-out duration

export default function IntroLoader() {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const dismissedRef = useRef(false);

  // Smoothly fade the loader out, then unmount. Runs at most once, whether
  // triggered by the auto-advance timer or by the visitor clicking.
  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setExiting(true);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "auto" });
      setMounted(false);
    }, FADE_MS);
  }, []);

  // Lock scroll while the loader is up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Title reveal + auto-advance
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const titleTimer = setTimeout(
      () => setTitleVisible(true),
      reduce ? 200 : TITLE_IN_MS
    );
    // On reduced motion, keep the intro brief
    const advanceTimer = setTimeout(dismiss, reduce ? 1400 : AUTO_ADVANCE_MS);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(advanceTimer);
    };
  }, [dismiss]);

  if (!mounted) return null;

  return (
    <div
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          e.preventDefault();
          dismiss();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Enter site"
      className={`fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[#0a0512] outline-none transition-opacity ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
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

      {/* Title card */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-1000 ease-out ${
          titleVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="block text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
          Purab Ashmaniwala
        </span>
        <span className="mt-3 block gradient-brand text-2xl font-semibold uppercase tracking-[0.2em] md:text-3xl">
          Explore my work
        </span>
      </div>

      {/* Subtle skip hint */}
      <div
        className={`pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.25em] text-white/35 transition-opacity duration-1000 ${
          titleVisible && !exiting ? "opacity-100" : "opacity-0"
        }`}
      >
        Click anywhere to enter
      </div>
    </div>
  );
}
