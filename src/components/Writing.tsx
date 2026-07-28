"use client";

import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

const FEATURED = {
  label: "Featured essay",
  title: "The AI Gold Rush: OpenAI vs. Anthropic",
  dek: "How OpenAI and Anthropic are racing to differentiate in the AI platform wars, and what that battle signals for the investors and founders trying to place their bets early.",
  meta: "Essay · Tamar Ventures on Substack · 2026",
  tags: ["AI", "Markets", "Strategy"],
  href: "https://tamarventures.substack.com/p/the-ai-gold-rush-what-openai-and",
};

const SUBSTACK = "https://tamarventures.substack.com";

export default function Writing() {
  return (
    <section
      id="writing"
      className="relative overflow-hidden border-y border-line bg-canvas-alt px-6 py-28"
    >
      <div className="blob left-[-4rem] top-10 h-[360px] w-[360px] bg-brand-pink/15" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="eyebrow">04 · Writing</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Thinking</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              in public.
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            Essays and breakdowns on markets, AI, and what it takes to build.
          </p>
        </ScrollReveal>

        {/* Featured essay */}
        <ScrollReveal delay={0.1}>
          <a
            href={FEATURED.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Read"
            className="group mt-14 block overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all duration-500 hover:border-brand-violet/40 hover:shadow-[0_30px_70px_-30px_rgba(147,51,234,0.45)] md:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-violet">
                {FEATURED.label}
              </span>
              <ArrowUpRight
                size={24}
                className="shrink-0 text-brand-violet transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>

            <h3 className="display mt-4 max-w-3xl text-3xl font-bold leading-[1.05] text-ink transition-colors duration-300 group-hover:gradient-brand md:text-4xl">
              {FEATURED.title}
            </h3>

            <p className="mt-5 max-w-2xl text-ink-soft md:text-lg">{FEATURED.dek}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
              {FEATURED.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-semibold text-brand-violet"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto text-xs text-ink-mute">{FEATURED.meta}</span>
            </div>
          </a>
        </ScrollReveal>

        {/* Content-creation note + Substack CTA */}
        <ScrollReveal delay={0.15}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-white/50 p-6 md:flex-row md:items-center">
            <p className="text-ink-soft">
              I also break down finance &amp; economics for students in
              short-form video{" "}
              <span className="font-semibold text-ink">(5K+ views)</span>.
            </p>
            <a
              href={SUBSTACK}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Follow"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-violet transition-colors hover:text-accent-crimson"
            >
              Follow on Substack
              <ArrowUpRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
