"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

type Item = { title: string; desc: string };

// STARTER DRAFT — inferred from Purab's AI Gold Rush essay + VC/PE focus.
// Replace the wording with your real convictions before publishing.
const sectors: Item[] = [
  {
    title: "AI platforms & applications",
    desc: "As frontier models commoditize, durable value accrues to the layers with proprietary data, distribution, and deep workflow lock-in.",
  },
  {
    title: "Fintech & financial access",
    desc: "Products that rewire how money moves, gets invested, and reaches the people traditional finance overlooks.",
  },
  {
    title: "Vertical software",
    desc: "Category-defining software built for one industry, where workflow depth beats horizontal breadth.",
  },
  {
    title: "Founder-led consumer",
    desc: "Brands and tools with a sharp point of view and a community that compounds.",
  },
];

const beliefs: Item[] = [
  {
    title: "A non-obvious insight",
    desc: "Founders who see something about the market that others don't yet.",
  },
  {
    title: "A sharp wedge",
    desc: "A focused entry point into a large market, not a feature hunting for a problem.",
  },
  {
    title: "Capital efficiency",
    desc: "Teams that turn constraints into speed and do more with less.",
  },
  {
    title: "A path to a moat",
    desc: "Credible defensibility through data, network effects, or distribution.",
  },
];

function Column({ eyebrow, items }: { eyebrow: string; items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <p className="eyebrow mb-6">{eyebrow}</p>
      <div className="space-y-3" onMouseLeave={() => setActive(null)}>
        {items.map((it, i) => {
          const isActive = active === i;
          const dim = active !== null && !isActive;
          return (
            <div
              key={it.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className={`relative overflow-hidden rounded-2xl border p-5 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-violet ${
                isActive
                  ? "-translate-y-0.5 border-brand-violet/40 bg-white shadow-[0_20px_50px_-24px_rgba(147,51,234,0.45)]"
                  : "border-line bg-white/50"
              } ${dim ? "opacity-50" : "opacity-100"}`}
            >
              {/* gradient accent bar that grows when active */}
              <span
                className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-violet to-accent-crimson transition-transform duration-300 ${
                  isActive ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <div className="flex items-start gap-4">
                <span
                  className={`display shrink-0 text-xl font-bold tabular-nums transition-colors ${
                    isActive ? "gradient-brand" : "text-ink-mute"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-lg font-bold leading-snug text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {it.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InvestmentThesis() {
  return (
    <section
      id="thesis"
      className="relative overflow-hidden border-y border-line bg-canvas-alt px-6 py-28"
    >
      <div className="blob right-[-4rem] top-16 h-[380px] w-[380px] bg-brand-violet/15" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="eyebrow">04 · Investment Thesis</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Where I&apos;d place</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              my bets.
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            The sectors I&apos;m most drawn to, and the principles I use to judge
            what&apos;s worth backing. Opinionated on purpose, and always
            evolving.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* center divider (desktop) */}
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent lg:block" />
            <Column eyebrow="Sectors I back" items={sectors} />
            <Column eyebrow="What I believe" items={beliefs} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
