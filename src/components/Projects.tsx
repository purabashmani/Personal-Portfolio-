"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

interface Venture {
  id: number;
  title: string;
  role: string;
  context: string;
  period: string;
  description: string;
  tags: string[];
  gradient: string;
  href?: string;
}

const ventures: Venture[] = [
  {
    id: 1,
    title: "The AI Gold Rush: OpenAI vs. Anthropic",
    role: "Published Article",
    context: "Tamar Ventures · Substack",
    period: "2026",
    description:
      "An essay on how OpenAI and Anthropic are racing to differentiate in the AI platform wars, and what that battle signals for investors and founders.",
    tags: ["Writing", "AI", "Markets"],
    gradient: "from-brand-indigo to-brand-violet",
    href: "https://tamarventures.substack.com/p/the-ai-gold-rush-what-openai-and",
  },
  {
    id: 2,
    title: "14-Week Multi-Asset Portfolio Simulation",
    role: "Investing Project",
    context: "Multi-Asset Strategy",
    period: "2026",
    description:
      "Ran a 14-week multi-asset portfolio simulation, building allocations across equities, fixed income, and alternatives while tracking performance and risk.",
    tags: ["Portfolio", "Asset Allocation", "Risk"],
    gradient: "from-brand-violet to-brand-pink",
  },
  {
    id: 3,
    title: "Tally",
    role: "Startup Lead",
    context: "Innovation Course · Northeastern",
    period: "Fall 2025",
    description:
      "A roommate-and-landlord expense-automation platform. Led product strategy, workflow design, and MVP testing across a cross-functional team.",
    tags: ["Product", "MVP", "Fintech"],
    gradient: "from-brand-pink to-accent-coral",
  },
  {
    id: 4,
    title: "Scholarships Project",
    role: "Startup Lead",
    context: "Design Thinking Course · Northeastern",
    period: "Fall 2025",
    description:
      "An app that streamlines access to verified local scholarships. Directed UI/UX, user research, and market outreach to maximize engagement.",
    tags: ["UI/UX", "User Research", "Access"],
    gradient: "from-brand-blue to-brand-indigo",
  },
  {
    id: 5,
    title: "Snow Shoveling Business",
    role: "Founder",
    context: "South Windsor, CT",
    period: "2020 - 2024",
    description:
      "Founded and scaled a neighborhood snow-removal venture to 15+ clients, driving 40% client retention and $1,200+ in seasonal revenue through local marketing.",
    tags: ["Founder", "Operations", "Marketing"],
    gradient: "from-accent-amber to-accent-crimson",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <div className="blob w-[360px] h-[360px] bg-brand-pink/25 top-24 right-[-4rem]" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="rule-brand mb-8" />
          <h2 className="display text-4xl md:text-5xl font-bold text-ink leading-[1.02] max-w-3xl">
            <MaskReveal>Things I&apos;ve made</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              happen.
            </MaskReveal>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {ventures.map((v, index) => {
            const isLink = Boolean(v.href);
            const Wrapper = isLink ? motion.a : motion.div;
            const linkProps = isLink
              ? { href: v.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={v.id}
                {...linkProps}
                initial={{ opacity: 0, y: 44, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                className="group card overflow-hidden flex flex-col"
              >
                {/* Gradient header */}
                <div
                  className={`relative h-36 bg-gradient-to-br ${v.gradient} overflow-hidden`}
                >
                  <span className="absolute -bottom-5 left-5 display text-7xl font-bold text-white/25">
                    {String(v.id).padStart(2, "0")}
                  </span>
                  <span className="absolute top-4 left-5 text-xs font-semibold uppercase tracking-widest text-white/90">
                    {v.role}
                  </span>
                  <ArrowUpRight
                    size={26}
                    className={`absolute top-4 right-4 text-white transition-opacity ${
                      isLink
                        ? "opacity-90"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-2xl font-bold text-ink leading-tight">
                      {v.title}
                    </h3>
                    <span className="text-xs text-ink-mute shrink-0">
                      {v.period}
                    </span>
                  </div>
                  <p className="text-xs text-brand-violet font-medium mt-1">
                    {v.context}
                  </p>
                  <p className="text-ink-soft text-sm leading-relaxed mt-4 flex-grow">
                    {v.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-line">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-ink-mute font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {isLink && (
                      <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-violet">
                        Read article
                        <ArrowUpRight
                          size={13}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
