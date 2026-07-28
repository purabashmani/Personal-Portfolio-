"use client";

import { useState } from "react";
import { Users, Video, HeartHandshake } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

interface Item {
  id: number;
  icon: typeof Users;
  role: string;
  org: string;
  period: string;
  description: string;
  highlight: string;
}

const items: Item[] = [
  {
    id: 1,
    icon: Video,
    role: "Content Creator",
    org: "Economics & Finance · TikTok / Instagram",
    period: "2021 - Present",
    description:
      "Produce short-form educational videos on personal finance and economics, using audience analytics and storytelling to make complex concepts click for students.",
    highlight: "5K+ Views",
  },
  {
    id: 2,
    icon: Users,
    role: "Research Assistant",
    org: "Oakland Community Mural Project",
    period: "Sept 2025 - Present",
    description:
      "Conduct qualitative research on community engagement through public art, coordinate event logistics, and synthesize insights on art-driven social cohesion.",
    highlight: "Public-Art Research",
  },
  {
    id: 3,
    icon: HeartHandshake,
    role: "Leadership Team",
    org: "Community Service Club · Northeastern",
    period: "Sept 2025 - Present",
    description:
      "Organize high-impact volunteer initiatives with local nonprofits, motivating student teams and cultivating civic engagement on campus.",
    highlight: "Nonprofit Initiatives",
  },
];

function Panel({ item, active, onEnter }: { item: Item; active: boolean; onEnter: () => void }) {
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={onEnter}
      onFocus={onEnter}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      data-cursor={active ? undefined : "View"}
      style={{ flexGrow: active ? 4 : 1, flexBasis: 0 }}
      className="group relative h-full min-w-0 cursor-pointer overflow-hidden rounded-3xl border border-line outline-none transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-brand-violet"
    >
      {/* bold gradient spotlight for the active panel */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-brand-indigo via-brand-violet to-brand-pink transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={`absolute inset-0 transition-colors duration-500 ${active ? "" : "bg-white/50"}`} />

      {/* Collapsed content: icon, vertical label, index */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink text-white">
          <Icon size={20} />
        </span>
        <span className="display rotate-180 text-lg font-bold uppercase tracking-wide text-ink-soft [writing-mode:vertical-rl]">
          {item.role}
        </span>
        <span className="display text-4xl font-bold leading-none text-line">
          {String(item.id).padStart(2, "0")}
        </span>
      </div>

      {/* Expanded content: full detail in white on the gradient */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col p-8 text-white transition-opacity duration-500 ${
          active ? "opacity-100 delay-100" : "opacity-0"
        }`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
          <Icon size={22} />
        </span>
        <span className="display pointer-events-none absolute right-5 top-6 select-none text-[7rem] font-bold leading-none text-white/10">
          {String(item.id).padStart(2, "0")}
        </span>

        <div className="mt-auto">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
            {item.period}
          </span>
          <h3 className="display mt-2 text-2xl font-bold leading-tight md:text-3xl">
            {item.role}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/85">{item.org}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
            {item.description}
          </p>
          <span className="mt-6 inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm">
            {item.highlight}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Leadership() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="leadership"
      className="relative overflow-hidden border-y border-line bg-canvas-alt px-6 py-28"
    >
      <div className="blob left-[-4rem] top-10 h-[360px] w-[360px] bg-accent-teal/15" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="eyebrow">06 · Leadership</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Building </MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              community &amp; audience.
            </MaskReveal>
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal expanding spotlight board */}
        <ScrollReveal delay={0.1}>
          <div className="mt-14 hidden h-[460px] gap-4 md:flex">
            {items.map((item, i) => (
              <Panel
                key={item.id}
                item={item}
                active={i === active}
                onEnter={() => setActive(i)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile: clean stacked gradient cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-indigo via-brand-violet to-brand-pink p-6 text-white"
              >
                <span className="display pointer-events-none absolute right-3 top-2 select-none text-6xl font-bold text-white/15">
                  {String(item.id).padStart(2, "0")}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                  <Icon size={20} />
                </span>
                <span className="mt-4 block text-[0.7rem] uppercase tracking-[0.2em] text-white/70">
                  {item.period}
                </span>
                <h3 className="display mt-1 text-xl font-bold leading-tight">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-white/85">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {item.highlight}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
