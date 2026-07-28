"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

// A metric is either an animated number or a short qualitative label.
type Stat =
  | {
      kind: "num";
      value: number;
      prefix?: string;
      suffix?: string;
      decimals?: number;
      label: string;
    }
  | { kind: "text"; text: string; label: string };

interface Venture {
  id: number;
  title: string;
  role: string;
  context: string;
  period: string;
  description: string;
  tags: string[];
  stats: Stat[];
  href?: string;
}

const ventures: Venture[] = [
  {
    id: 1,
    title: "Multi-Asset Portfolio Simulation",
    role: "Investing Project",
    context: "14-Week Simulation",
    period: "2026",
    description:
      "A semester-long exercise that started each team with $100K and challenged us to grow it through high-conviction, research-backed decisions. Leveraging a range of financial instruments, my team compounded the portfolio past $2.6B, then engineered an automated trading bot that generated $200K+ per week.",
    tags: ["Portfolio Strategy", "Leverage", "Algo Trading"],
    stats: [
      { kind: "num", value: 100, prefix: "$", suffix: "K", label: "Starting Capital" },
      { kind: "num", value: 2.6, decimals: 1, prefix: "$", suffix: "B", label: "Peak Value" },
      { kind: "num", value: 200, prefix: "$", suffix: "K+/wk", label: "Bot P&L" },
    ],
  },
  {
    id: 2,
    title: "Tally",
    role: "Startup Lead",
    context: "Innovation Course · Northeastern",
    period: "Fall 2025",
    description:
      "A roommate-and-landlord expense-automation platform. Led product strategy, workflow design, and MVP testing across a cross-functional team.",
    tags: ["Product", "MVP", "Fintech"],
    stats: [
      { kind: "text", text: "MVP", label: "Stage" },
      { kind: "text", text: "Fintech", label: "Sector" },
      { kind: "text", text: "Product Lead", label: "Role" },
    ],
  },
  {
    id: 3,
    title: "Scholarships Platform",
    role: "Startup Lead",
    context: "Design Thinking · Northeastern",
    period: "Fall 2025",
    description:
      "An app that streamlines access to verified local scholarships. Directed UI/UX, user research, and market outreach to maximize engagement.",
    tags: ["UI/UX", "User Research", "Access"],
    stats: [
      { kind: "text", text: "UI/UX", label: "Focus" },
      { kind: "text", text: "User Research", label: "Method" },
      { kind: "text", text: "Access", label: "Mission" },
    ],
  },
  {
    id: 4,
    title: "Snow Removal Venture",
    role: "Founder",
    context: "South Windsor, CT",
    period: "2020 - 2024",
    description:
      "Founded and scaled a neighborhood snow-removal venture through local marketing and reliable operations. It was my first taste of building something from zero.",
    tags: ["Founder", "Operations", "Marketing"],
    stats: [
      { kind: "num", value: 15, suffix: "+", label: "Clients" },
      { kind: "num", value: 40, suffix: "%", label: "Retention" },
      { kind: "num", value: 1200, prefix: "$", suffix: "+", label: "Seasonal Rev" },
    ],
  },
];

// Count up to `target` with an ease-out. Defaults to the real value (so it's
// always correct even if the animation can't run: reduced motion, background
// tab, no JS); when `active` turns true and frames are available, it restarts
// from 0 and counts up. The first rAF frame sets the 0 baseline, so a paused
// tab simply keeps showing the true number.
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!active) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatNumber({
  value,
  active,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  active: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const v = useCountUp(value, active);
  const shown =
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
  return (
    <span className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

function StatBlock({ stat, active }: { stat: Stat; active: boolean }) {
  return (
    <div className="min-w-[7rem]">
      <div className="display text-3xl md:text-4xl font-bold gradient-brand leading-none">
        {stat.kind === "num" ? (
          <StatNumber
            value={stat.value}
            active={active}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
          />
        ) : (
          stat.text
        )}
      </div>
      <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink-mute">
        {stat.label}
      </div>
    </div>
  );
}

function LedgerRow({
  v,
  open,
  onToggle,
}: {
  v: Venture;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-cursor={open ? "Close" : "Open"}
        className="group relative flex w-full items-center gap-4 py-7 text-left md:gap-8 md:py-9"
      >
        {/* gradient scan bar that grows from the left on hover / when open */}
        <span
          className={`pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-violet to-accent-crimson transition-all duration-500 ${
            open ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
          }`}
        />

        <span
          className={`display shrink-0 text-sm font-bold tabular-nums transition-colors md:text-base ${
            open ? "gradient-brand" : "text-ink-mute group-hover:text-brand-violet"
          }`}
        >
          {String(v.id).padStart(2, "0")}
        </span>

        <div className="flex-grow">
          <h3
            className={`display text-2xl font-bold leading-[1.05] transition-all duration-300 md:text-4xl ${
              open ? "gradient-brand" : "text-ink group-hover:translate-x-1"
            }`}
          >
            {v.title}
          </h3>
          <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute">
            {v.role} <span className="text-line">/</span> {v.context}
          </p>
        </div>

        <span className="hidden shrink-0 text-xs tabular-nums text-ink-mute md:block">
          {v.period}
        </span>

        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-transparent bg-gradient-to-br from-brand-violet to-accent-crimson text-white"
              : "border-line text-ink-soft group-hover:border-brand-violet/50 group-hover:text-brand-violet"
          }`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </span>
      </button>

      {/* Pure-CSS accordion: grid-rows 0fr → 1fr animates height without JS,
          so it stays robust (and resolves to the right height regardless). */}
      <div
        className="grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-8 pb-10 pl-8 md:flex-row md:items-end md:justify-between md:pl-14">
            <div className="max-w-xl">
              {/* left gradient accent */}
              <div className="relative pl-5">
                <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-gradient-to-b from-brand-violet to-accent-crimson" />
                <p className="text-sm leading-relaxed text-ink-soft">
                  {v.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {v.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] font-medium uppercase tracking-wider text-ink-mute"
                    >
                      {tag}
                    </span>
                  ))}
                  {v.href && (
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Read"
                      tabIndex={open ? 0 : -1}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-violet transition-colors hover:text-accent-crimson"
                    >
                      Read the essay
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-6 pl-5 md:pl-0">
              {v.stats.map((s) => (
                <StatBlock key={s.label} stat={s} active={open} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  // Open the showstopper (the $2.6B simulation) by default; one row at a time.
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">03 · Projects</p>
              <div className="rule-brand mb-8 mt-4" />
              <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
                <MaskReveal>Things I&apos;ve made</MaskReveal>
                <MaskReveal delay={0.1} className="gradient-brand">
                  happen.
                </MaskReveal>
              </h2>
            </div>
            <span className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-ink-mute sm:block">
              {String(ventures.length).padStart(2, "0")} selected works
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 border-t border-line">
            {ventures.map((v) => (
              <LedgerRow
                key={v.id}
                v={v}
                open={openId === v.id}
                onToggle={() => setOpenId((cur) => (cur === v.id ? null : v.id))}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
