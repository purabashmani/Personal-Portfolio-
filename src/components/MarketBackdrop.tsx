"use client";

import { motion } from "framer-motion";

/**
 * Subtle finance/markets motif behind the hero: a faint chart grid plus a
 * slow, drifting upward gradient "market line" with an area fill and a few
 * candlesticks. Tinted in the brand palette, low opacity. The drift uses a
 * Framer x-animation, so prefers-reduced-motion (via MotionConfig) freezes it.
 */
const LINE =
  "0,300 60,280 120,300 180,250 240,270 300,210 360,240 420,180 480,200 540,140 600,170 660,110 720,140 800,70";

function ChartUnit() {
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="none"
      className="h-full w-[100vw] shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mkline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="55%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="mkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* candlesticks */}
      {[80, 200, 340, 470, 600, 720].map((cx, i) => {
        const up = i % 2 === 0;
        const h = 40 + (i % 3) * 26;
        const y = 150 + (i % 4) * 18;
        return (
          <g key={cx} stroke={up ? "#c026d3" : "#e11d48"} strokeWidth="2">
            <line x1={cx} y1={y - 18} x2={cx} y2={y + h + 18} opacity="0.5" />
            <rect
              x={cx - 7}
              y={y}
              width="14"
              height={h}
              fill={up ? "#c026d3" : "#e11d48"}
              opacity="0.16"
            />
          </g>
        );
      })}

      {/* area under the line */}
      <polygon points={`0,400 ${LINE} 800,400`} fill="url(#mkfill)" />
      {/* market line */}
      <polyline
        points={LINE}
        fill="none"
        stroke="url(#mkline)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MarketBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint chart grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(147,51,234,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* drifting market line (two units for a seamless loop) */}
      <motion.div
        className="absolute bottom-0 left-0 flex h-[55%] w-[200vw] opacity-[0.4]"
        animate={{ x: ["0vw", "-100vw"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <ChartUnit />
        <ChartUnit />
      </motion.div>
    </div>
  );
}
