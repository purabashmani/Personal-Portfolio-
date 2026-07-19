"use client";

import { MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

const facts = [
  { label: "University", value: "Northeastern University" },
  { label: "Degree", value: "B.S. Business Administration" },
  { label: "Concentration", value: "Finance & Entrepreneurship" },
  { label: "Program", value: "Accelerated Entrepreneurship" },
  { label: "Class of", value: "2029" },
  { label: "Based", value: "Boston / East Coast" },
  { label: "Honors", value: "Dean's List, Fall 2025" },
];

const focus = [
  "Venture Capital",
  "Private Equity",
  "Deal Screening",
  "Due Diligence",
  "Market & Competitive Research",
  "Ecosystem Mapping",
  "Deal Flow / CRM",
  "Go-To-Market",
  "Product & MVP",
];

const languages = [
  { name: "Gujarati", level: "Native" },
  { name: "Hindi", level: "Native" },
  { name: "Spanish", level: "Conversational" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <div className="blob w-[380px] h-[380px] bg-brand-violet/25 top-10 right-[-4rem]" />
      <div className="blob w-[300px] h-[300px] bg-accent-crimson/15 bottom-10 left-[-3rem]" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="rule-brand mb-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Prose */}
          <div className="lg:col-span-7">
            <h2 className="display text-4xl md:text-5xl font-bold text-ink leading-[1.02]">
              <MaskReveal>Backing the founders</MaskReveal>
              <MaskReveal delay={0.12} className="gradient-brand">
                building what&apos;s next.
              </MaskReveal>
            </h2>

            {/* Bay Area -> Boston locator */}
            <ScrollReveal delay={0.1}>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft">
                <MapPin size={16} className="text-brand-pink" />
                Spent my first year in the Bay Area. Now focused on the Boston /
                East Coast scene.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="mt-6 space-y-5 text-ink-soft leading-relaxed text-lg">
                <p>
                  I&apos;m a Business Administration student at Northeastern
                  concentrating in Finance &amp; Entrepreneurship, and part of
                  the Accelerated Entrepreneurship Program. My edge is that I
                  work both sides of the table: I&apos;ve built and led my own
                  ventures, and I&apos;ve sat inside venture capital and angel
                  investing evaluating other founders&apos; companies.
                </p>
                <p>
                  At <span className="text-ink font-medium">Tamar Ventures</span>{" "}
                  and <span className="text-ink font-medium">Band of Angels</span>,
                  I sourced and screened early-stage startups, ran due diligence,
                  and mapped ecosystems across the U.S. and Europe. Looking
                  ahead, I&apos;m building toward a career in venture capital,
                  private equity, and early-stage investing.
                </p>
              </div>
            </ScrollReveal>

            {/* Focus areas */}
            <ScrollReveal delay={0.2}>
              <div className="mt-10">
                <p className="eyebrow mb-4">Focus areas</p>
                <div className="flex flex-wrap gap-2.5">
                  {focus.map((f) => (
                    <span
                      key={f}
                      className="chip px-3.5 py-1.5 text-sm text-ink-soft"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <ScrollReveal className="lg:col-span-5" delay={0.1} direction="left">
            <div className="card p-8">
              <p className="eyebrow mb-6">Snapshot</p>
              <dl className="divide-y divide-line">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-sm text-ink-mute">{f.label}</dt>
                    <dd className="text-sm font-semibold text-ink text-right">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="eyebrow mt-8 mb-4">Languages</p>
              <div className="space-y-2.5">
                {languages.map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-ink">
                      {l.name}
                    </span>
                    <span className="text-xs text-ink-mute uppercase tracking-wide">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
