"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Investment Intern",
    company: "Band of Angels",
    location: "San Francisco, CA",
    period: "May 2026 - Aug 2026",
    summary:
      "Screening early-stage deals for one of Silicon Valley's oldest angel groups.",
    highlights: [
      "Evaluated early-stage startup submissions in the deal-screening process, assessing team strength, market opportunity, and competitive positioning.",
      "Ran due diligence on prospective portfolio companies, synthesizing market and competitive data to support investment decisions by 150+ angel investors.",
      "Produced market and industry research to help members evaluate startup viability across fintech, SaaS, and deep tech.",
    ],
    tags: ["Angel Investing", "Due Diligence", "Deal Screening"],
  },
  {
    id: 2,
    role: "Venture Capital Intern",
    company: "Tamar Ventures",
    location: "San Francisco, CA",
    period: "Jan 2026 - Apr 2026",
    summary:
      "Sourcing and ecosystem work across a transatlantic early-stage pipeline.",
    highlights: [
      "Conducted market research, ecosystem mapping, and competitive analysis to identify high-potential startups, accelerators, and sourcing partners across the U.S. and Europe.",
      "Supported deal flow and Venture Studio as a Service (VSaaS) commercialization by building CRM pipelines and coordinating outreach to universities, accelerators, and founders.",
      "Strengthened founder and ecosystem relationships through thought-leadership content and community engagement that expanded the early-stage pipeline.",
    ],
    tags: ["Venture Capital", "Deal Sourcing", "Ecosystem Mapping"],
  },
  {
    id: 3,
    role: "Marketing Intern",
    company: "CollectU",
    location: "Hartford, CT",
    period: "May 2026 - Aug 2026",
    summary:
      "Growth and go-to-market for a premium stadium-collectibles company.",
    highlights: [
      "Developed and executed marketing strategies to strengthen brand visibility and support customer acquisition.",
      "Synthesized customer feedback to identify gaps in the buyer experience and inform product and campaign improvements.",
      "Contributed to go-to-market initiatives supporting CollectU's university and venue partnerships across the U.S.",
    ],
    tags: ["Go-To-Market", "Brand", "Customer Research"],
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState(1);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-y border-line bg-canvas-alt px-6 py-28"
    >
      <div className="blob w-[420px] h-[420px] bg-brand-indigo/15 bottom-0 left-[-6rem]" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="eyebrow">02 · Experience</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Inside the </MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              deal room.
            </MaskReveal>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8"
            role="tablist"
            aria-label="Work experience"
          >
            {/* Left rail: selectable companies (the deal files) */}
            <div className="flex flex-col gap-3 md:col-span-5">
              {experiences.map((exp) => {
                const isActive = exp.id === activeId;
                return (
                  <button
                    key={exp.id}
                    role="tab"
                    aria-selected={isActive}
                    data-cursor="Open"
                    onClick={() => setActiveId(exp.id)}
                    className={`group relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 md:min-h-[7rem] ${
                      isActive
                        ? "border-transparent bg-white shadow-[0_20px_50px_-24px_rgba(147,51,234,0.5)]"
                        : "border-line bg-white/40 hover:border-brand-violet/40 hover:bg-white/70"
                    }`}
                  >
                    {/* active gradient spine */}
                    <span
                      className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-brand-violet to-accent-crimson transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="flex items-center justify-between gap-3 pl-3">
                      <div className="min-w-0">
                        <p className="text-[0.7rem] uppercase tracking-[0.15em] text-ink-mute">
                          {exp.period}
                        </p>
                        <h3
                          className={`display mt-1 text-xl font-bold leading-tight transition-colors ${
                            isActive
                              ? "gradient-brand"
                              : "text-ink group-hover:text-brand-violet"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {exp.role}
                        </p>
                      </div>
                      <span
                        className={`display shrink-0 text-5xl font-bold leading-none tabular-nums transition-colors md:text-6xl ${
                          isActive ? "gradient-brand" : "text-line group-hover:text-brand-violet/40"
                        }`}
                      >
                        {String(exp.id).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right panel: the selected role, re-animated on switch */}
            <div className="md:col-span-7">
              <div
                key={active.id}
                role="tabpanel"
                className="relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 duration-500 animate-in fade-in-0 slide-in-from-right-4 md:p-9"
              >
                {/* oversized watermark index - fills the panel's dead space */}
                <span className="display pointer-events-none absolute right-[-1.5rem] top-1/2 -translate-y-1/2 select-none text-[16rem] font-bold leading-none text-brand-violet/[0.06]">
                  {String(active.id).padStart(2, "0")}
                </span>

                <div className="relative">
                  <h3 className="display text-2xl font-bold leading-tight text-ink md:text-3xl">
                    {active.role}{" "}
                    <span className="font-normal text-ink-mute">/</span>{" "}
                    <span className="gradient-brand">{active.company}</span>
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-mute">
                    <MapPin size={13} className="text-brand-pink" />
                    {active.location}
                    <span className="text-line">·</span>
                    {active.period}
                  </p>

                  <p className="mt-5 font-medium text-ink-soft">
                    {active.summary}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {active.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-indigo to-brand-pink" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-medium text-brand-violet"
                      >
                        {tag}
                      </span>
                    ))}
                    <ArrowUpRight
                      size={18}
                      className="ml-auto text-brand-violet"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
