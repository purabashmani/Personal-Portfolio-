"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-6 bg-canvas-alt border-y border-line overflow-hidden"
    >
      <div className="blob w-[420px] h-[420px] bg-brand-indigo/15 bottom-0 left-[-6rem]" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="rule-brand mb-8" />
          <h2 className="display text-4xl md:text-5xl font-bold text-ink leading-[1.02] max-w-3xl">
            <MaskReveal>Inside the </MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              deal room.
            </MaskReveal>
          </h2>
        </ScrollReveal>

        <div className="mt-14">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: EASE }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-t border-line first:border-t-0"
            >
              {/* Period */}
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-brand-violet">
                  {exp.period}
                </p>
                <p className="text-xs text-ink-mute mt-1">{exp.location}</p>
              </div>

              {/* Detail */}
              <div className="md:col-span-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display text-2xl md:text-3xl font-bold text-ink leading-tight">
                    {exp.role}{" "}
                    <span className="text-ink-mute font-normal">/</span>{" "}
                    <span className="gradient-brand">{exp.company}</span>
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 mt-1 text-brand-violet opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  />
                </div>

                <p className="text-ink-soft mt-3 font-medium">{exp.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-ink-soft leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-indigo to-brand-pink" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-brand-violet bg-brand-violet/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
