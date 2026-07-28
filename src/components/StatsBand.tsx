"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { value: 2.6, decimals: 1, prefix: "$", suffix: "B", label: "Portfolio simulated" },
  { value: 150, suffix: "+", label: "Angel investors supported" },
  { value: 5, suffix: "K+", label: "Content views" },
  { value: 3, label: "Internships" },
];

// Count up to the target with an ease-out. Defaults to the true value so it is
// always correct even when the animation cannot run (reduced motion, hidden
// tab). Restarts from 0 when `active` turns true and frames are available.
function useCountUp(target: number, active: boolean, duration = 1300) {
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
      setVal(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const v = useCountUp(stat.value, active);
  const shown =
    stat.decimals && stat.decimals > 0
      ? v.toFixed(stat.decimals)
      : Math.round(v).toLocaleString("en-US");
  return (
    <div className="text-center">
      <div className="display text-4xl font-bold leading-none tabular-nums text-white md:text-6xl">
        {stat.prefix}
        {shown}
        {stat.suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.15em] text-white/75 md:text-sm">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "-15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-brand-indigo via-brand-violet to-brand-pink px-6 py-16 md:py-20"
    >
      {/* soft light streaks for depth */}
      <div className="pointer-events-none absolute -left-16 top-0 h-full w-72 bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-full w-72 bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-10 text-center text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
          By the numbers
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
