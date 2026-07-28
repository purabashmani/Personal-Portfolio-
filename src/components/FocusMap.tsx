"use client";

import { useState } from "react";

type FocusNode = { label: string; desc: string };

const NODES: FocusNode[] = [
  { label: "Venture Capital", desc: "Sourcing and backing high-potential early-stage startups." },
  { label: "Private Equity", desc: "Evaluating mature companies and value-creation plays." },
  { label: "Deal Screening", desc: "Filtering inbound startups on team, market, and traction." },
  { label: "Due Diligence", desc: "Pressure-testing a company before an investment decision." },
  { label: "Market Research", desc: "Mapping market size, dynamics, and competitive positioning." },
  { label: "Ecosystem Mapping", desc: "Charting founders, accelerators, and partners across regions." },
  { label: "Deal Flow / CRM", desc: "Building and managing a structured pipeline of opportunities." },
  { label: "Go-To-Market", desc: "Planning how a product reaches and wins its first users." },
  { label: "Product & MVP", desc: "Turning an idea into a testable minimum viable product." },
];

// Radial layout: evenly place nodes around the hub on an ellipse.
const RX = 40;
const RY = 38;
const positions = NODES.map((_, i) => {
  const angle = (-90 + (360 / NODES.length) * i) * (Math.PI / 180);
  return { x: 50 + RX * Math.cos(angle), y: 50 + RY * Math.sin(angle) };
});

export default function FocusMap() {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover !== null ? NODES[hover] : null;
  const clear = (i: number) => setHover((h) => (h === i ? null : h));

  return (
    <div>
      {/* Constellation - desktop */}
      <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-3xl overflow-visible md:block">
        {/* connecting lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {positions.map((p, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={hover === i ? "#c026d3" : "#ECE0F0"}
              strokeWidth={hover === i ? 0.6 : 0.3}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* central hub */}
        <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-pink px-3 text-center text-white shadow-[0_20px_50px_-18px_rgba(147,51,234,0.7)]">
          {active ? (
            <span className="display text-sm font-bold leading-tight">
              {active.label}
            </span>
          ) : (
            <>
              <span className="display text-3xl font-bold leading-none">9</span>
              <span className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-white/80">
                Focus areas
              </span>
            </>
          )}
        </div>

        {/* nodes */}
        {NODES.map((node, i) => (
          <button
            key={node.label}
            type="button"
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onMouseLeave={() => clear(i)}
            onBlur={() => clear(i)}
            data-cursor="Explore"
            style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
            className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-violet ${
              hover === i
                ? "scale-110 border-transparent bg-gradient-to-br from-brand-violet to-accent-crimson text-white shadow-[0_12px_30px_-10px_rgba(147,51,234,0.6)]"
                : "border-line bg-white text-ink-soft hover:border-brand-violet/40 hover:text-brand-violet"
            }`}
          >
            {node.label}
          </button>
        ))}
      </div>

      {/* caption */}
      <p className="mx-auto mt-6 hidden min-h-[2.5rem] max-w-xl text-center text-sm leading-relaxed text-ink-soft md:block">
        {active ? (
          <>
            <span className="font-semibold text-ink">{active.label}</span>:{" "}
            {active.desc}
          </>
        ) : (
          "Hover a focus area to see what it means in practice."
        )}
      </p>

      {/* Mobile fallback - clean chips */}
      <div className="flex flex-wrap gap-2.5 md:hidden">
        {NODES.map((node) => (
          <span key={node.label} className="chip px-3.5 py-1.5 text-sm text-ink-soft">
            {node.label}
          </span>
        ))}
      </div>
    </div>
  );
}
