"use client";

import { useEffect, useRef, useState } from "react";

// Portrait lives at public/portrait.jpg. Fallback keeps the hero clean until
// the file is added.
const PORTRAIT = "/portrait.jpg";
const PORTRAIT_FALLBACK = "https://i.pravatar.cc/900?img=13";

// Big role words that stream horizontally, full-bleed, directly behind the
// centered portrait (russellnumo-style). Adjacent rows flow in opposite
// directions (dir); scroll reverses the whole set and skews the speed.
type Row = { text: string; gradient: boolean; dir: 1 | -1; speed: number };

const ROWS: Row[] = [
  { text: "Entrepreneur", gradient: false, dir: -1, speed: 3.2 },
  { text: "Aspiring VC", gradient: true, dir: 1, speed: 4.0 },
  { text: "Founder", gradient: false, dir: -1, speed: 3.4 },
  { text: "Aspiring PE Investor", gradient: true, dir: 1, speed: 3.0 },
];

const COPIES = 6; // repeated chunks per row → wrap by exactly one chunk width

// Shared, signed scroll "velocity factor". Positive = scrolling down.
// Decays toward 0 so rows ease back to their idle flow when scrolling stops.
function useScrollVelocity() {
  const vel = useRef(0);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      const next = vel.current + dy * 0.25;
      vel.current = Math.max(-6, Math.min(6, next));
    };
    const decay = () => {
      vel.current *= 0.9;
      if (Math.abs(vel.current) < 0.001) vel.current = 0;
      raf = requestAnimationFrame(decay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(decay);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return vel;
}

function VelocityRow({
  text,
  gradient,
  dir,
  speed,
  velRef,
}: Row & { velRef: React.MutableRefObject<number> }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure one copy's exact pixel width so the loop wraps precisely one
    // chunk over (seamless). Re-measure on resize and after the font loads.
    let copyW = 0;
    let vw = window.innerWidth;
    const measure = () => {
      const span = track.querySelector("span");
      copyW = span ? span.getBoundingClientRect().width : track.scrollWidth / COPIES;
      vw = window.innerWidth;
    };
    measure();
    (document as Document).fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);

    let x = 0;
    // scrollBias flips only when scroll clearly reverses (deadzone) → no twitch.
    let scrollBias = 1;
    let last = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000; // seconds, clamp tab-away jumps
      last = now;
      const vf = velRef.current;
      if (vf > 0.2) scrollBias = 1;
      else if (vf < -0.2) scrollBias = -1;
      // Row keeps its own alternating direction; scroll reverses the whole set
      // and adds speed. speed is in vw/sec → convert to px using the viewport.
      const vwPerSec = dir * scrollBias * (speed + Math.abs(vf) * 2.2);
      x += (vwPerSec / 100) * vw * dt;
      // Wrap into (-copyW, 0] so each reset lands exactly one copy over.
      if (copyW > 0) {
        x = x % copyW;
        if (x > 0) x -= copyW;
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [dir, speed, velRef]);

  const cls = `display font-bold uppercase leading-[0.82] tracking-tight text-[17vw] md:text-[13vw] ${
    gradient ? "gradient-brand" : "text-ink"
  }`;

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {Array.from({ length: COPIES }).map((_, i) => (
          <span key={i} className={`${cls} pr-[0.25em]`} aria-hidden={i > 0}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated SVG displacement filter — drives the on-hover "liquid" distortion.
function DistortPortrait() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const hovering = useRef(false);
  const scale = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      const target = hovering.current ? 22 : 0;
      scale.current += (target - scale.current) * 0.09; // ease toward target
      const active = scale.current > 0.05;
      const freq = active
        ? 0.011 + 0.006 * Math.sin(t / 260) + 0.002 * Math.cos(t / 90)
        : 0;
      turbRef.current?.setAttribute("baseFrequency", freq.toFixed(4));
      dispRef.current?.setAttribute("scale", scale.current.toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="group relative aspect-[3/4] h-[46vh] max-h-[520px] cursor-pointer overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_40px_90px_-35px_rgba(34,16,41,0.6)]"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* Hidden filter def — refs let us animate the distortion each frame */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="hero-distort">
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0"
            numOctaves={2}
            result="noise"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Distorted layer: image + tint distort together, clipped by the frame */}
      <div className="h-full w-full" style={{ filter: "url(#hero-distort)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PORTRAIT}
          alt="Purab Ashmaniwala"
          onError={(e) => {
            const el = e.currentTarget;
            el.onerror = null;
            el.src = PORTRAIT_FALLBACK;
          }}
          className="h-full w-full object-cover grayscale-[0.65] contrast-[1.05]"
          style={{ objectPosition: "50% 22%" }}
        />
        {/* Toned-down purple wash, kept across the whole image */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color opacity-[0.45]"
          style={{ background: "linear-gradient(160deg,#7c3aed,#e11d48)" }}
        />
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.12] bg-brand-violet" />
      </div>
    </div>
  );
}

function Clock() {
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
    <span className="tabular-nums text-ink-soft hidden sm:inline"> · {clock}</span>
  );
}

export default function Hero() {
  const velRef = useScrollVelocity();

  return (
    <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-canvas">
      {/* Full-bleed streaming words — inset below the nav / above the footer so
          they never sit under the logo or the menu, faded top & bottom. */}
      <div
        className="absolute inset-x-0 top-[80px] bottom-[52px] z-10 flex flex-col justify-center gap-[0.8vh]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)",
        }}
      >
        {ROWS.map((row, i) => (
          <VelocityRow key={i} {...row} velRef={velRef} />
        ))}
      </div>

      {/* Centered portrait sitting directly over the words */}
      <div className="relative z-20 flex items-center justify-center">
        <DistortPortrait />
      </div>

      {/* Corner labels */}
      <div className="absolute bottom-6 left-6 z-40 text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute md:text-[0.7rem] md:tracking-[0.2em]">
        Based in Boston
        <Clock />
      </div>
      <div className="absolute bottom-6 right-6 z-40 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute md:text-[0.7rem] md:tracking-[0.2em]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Open to opportunities
      </div>
    </section>
  );
}
