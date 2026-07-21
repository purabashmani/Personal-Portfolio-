"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const SECTIONS: Array<[string, string]> = [
  ["about", "01 · About"],
  ["experience", "02 · Experience"],
  ["projects", "03 · Projects"],
  ["leadership", "04 · Leadership"],
  ["contact", "05 · Contact"],
];

/**
 * russellnumo-style scroll indicator: a live progress percentage plus the
 * current section label, fixed to the bottom-right corner.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState("Intro");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = SECTIONS.find(([id]) => id === entry.target.id);
            if (match) setActive(match[1]);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden items-center gap-3 select-none md:flex">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-mute">
        {active}
      </span>
      <span className="h-3 w-px bg-line" />
      <span className="font-mono text-xs tabular-nums font-semibold text-brand-violet">
        {String(pct).padStart(2, "0")}%
      </span>
    </div>
  );
}
