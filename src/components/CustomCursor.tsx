"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * russellnumo-style custom cursor: a small dot that tracks the pointer 1:1 and
 * a ring that lags behind (spring). The ring grows over interactive elements
 * and can show a label via [data-cursor="..."]. Disabled on touch devices and
 * for prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 38, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      if (t) {
        setHovering(true);
        setLabel(t.getAttribute("data-cursor") || "");
      }
    };
    const out = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.("a, button, [data-cursor]");
      if (t) {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot (1:1) */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-brand-violet" />
      </motion.div>

      {/* Ring (lagging spring) */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-brand-violet/60 transition-[width,height,background-color] duration-200 ease-out ${
            hovering ? "h-16 w-16 bg-brand-violet/10" : "h-9 w-9"
          }`}
        >
          {label && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-violet">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
