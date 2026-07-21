"use client";

import { useEffect, useState } from "react";

// Portrait lives at public/portrait.jpg. Fallback keeps the hero clean until
// the file is added.
const PORTRAIT = "/portrait.jpg";
const PORTRAIT_FALLBACK = "https://i.pravatar.cc/900?img=13";

// Big circulating role words (russellnumo-style marquee rows)
const ROWS: Array<{
  text: string;
  reverse: boolean;
  gradient: boolean;
  duration: string;
}> = [
  { text: "Entrepreneur", reverse: false, gradient: false, duration: "42s" },
  { text: "Aspiring VC", reverse: true, gradient: true, duration: "55s" },
  { text: "Aspiring PE Investor", reverse: false, gradient: false, duration: "48s" },
  { text: "Founder", reverse: true, gradient: true, duration: "60s" },
];

function MarqueeRow({
  text,
  reverse,
  gradient,
  duration,
}: {
  text: string;
  reverse: boolean;
  gradient: boolean;
  duration: string;
}) {
  const chunk = Array(5).fill(text).join("    ") + "    ";
  const cls = `display font-bold uppercase leading-[0.9] tracking-tight text-[16vw] md:text-[12vw] ${
    gradient ? "gradient-brand" : "text-ink"
  }`;
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`flex shrink-0 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: duration }}
      >
        <span className={cls}>{chunk}</span>
        <span className={cls} aria-hidden="true">
          {chunk}
        </span>
      </div>
    </div>
  );
}

function RowsLayer() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[0.5vh]">
      {ROWS.map((row) => (
        <MarqueeRow key={row.text} {...row} />
      ))}
    </div>
  );
}

export default function Hero() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-canvas">
      {/* Circulating role words (behind the portrait) */}
      <div className="absolute inset-0 z-10">
        <RowsLayer />
      </div>

      {/* Centered portrait */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative w-[58vw] max-w-[300px] md:max-w-[400px] aspect-[3/4] overflow-hidden shadow-[0_30px_80px_-30px_rgba(34,16,41,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT}
            alt="Purab Ashmaniwala"
            onError={(e) => {
              const t = e.currentTarget;
              t.onerror = null;
              t.src = PORTRAIT_FALLBACK;
            }}
            className="h-full w-full object-cover grayscale contrast-[1.08]"
            style={{ objectPosition: "50% 28%" }}
          />
          {/* duotone tint to match the palette */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-color opacity-70"
            style={{ background: "linear-gradient(160deg,#7c3aed,#e11d48)" }}
          />
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-20 bg-brand-violet" />
        </div>
      </div>

      {/* SAME words re-drawn on top of the portrait, blended so they overlap
          the photo without dominating it (keeps the portrait's integrity). */}
      <div className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay opacity-70">
        <RowsLayer />
      </div>

      {/* Corner labels */}
      <div className="absolute bottom-6 left-6 z-40 text-[0.7rem] uppercase tracking-[0.2em] text-ink-mute">
        Based in Boston{" "}
        <span className="tabular-nums text-ink-soft">· {clock}</span>
      </div>
      <div className="absolute bottom-6 right-6 z-40 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-ink-mute">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Open to opportunities
      </div>
    </section>
  );
}
