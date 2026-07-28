"use client";

import { Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

// STARTER DRAFT — inferred from Purab's AI Gold Rush essay + VC/PE focus.
// Meant to be rewritten to his real convictions before publishing.
const themes = [
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

const criteria = [
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

export default function InvestmentThesis() {
  return (
    <section id="thesis" className="relative overflow-hidden px-6 py-28">
      <div className="blob right-[-4rem] top-16 h-[380px] w-[380px] bg-brand-violet/15" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="eyebrow">05 · Investment Thesis</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Where I&apos;d place</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              my bets.
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            A working thesis on where I think value gets created, and what makes
            me lean in. Opinionated on purpose, and always evolving.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Themes */}
          <ScrollReveal delay={0.1}>
            <p className="eyebrow mb-6">Themes I&apos;m drawn to</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {themes.map((t, i) => (
                <div
                  key={t.title}
                  className="group rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-[0_20px_50px_-24px_rgba(147,51,234,0.4)]"
                >
                  <span className="display gradient-brand text-2xl font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-lg font-bold leading-snug text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Criteria */}
          <ScrollReveal delay={0.15} direction="left">
            <p className="eyebrow mb-6">What makes me lean in</p>
            <div className="space-y-5">
              {criteria.map((c) => (
                <div key={c.title} className="flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink text-white">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <h3 className="display font-bold text-ink">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
