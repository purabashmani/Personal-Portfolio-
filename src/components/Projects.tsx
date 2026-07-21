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
  image: string; // placeholder — swap for a real screenshot later
  href?: string;
}

// Placeholder imagery (grayscale, then duotone-tinted in the brand palette so a
// random photo still reads on-brand). Swap the seeds for real screenshots later.
const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/600?grayscale`;

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
    image: "/projects/ai-gold-rush.jpg",
    href: "https://tamarventures.substack.com/p/the-ai-gold-rush-what-openai-and",
  },
  {
    id: 2,
    title: "14-Week Multi-Asset Portfolio Simulation",
    role: "Investing Project",
    context: "Semester-Long Simulation",
    period: "2026",
    description:
      "A semester-long exercise that started each team with $100K and challenged us to grow it through high-conviction, research-backed decisions. Leveraging a range of financial instruments, my team compounded the portfolio to over $2.6B, then engineered an automated trading bot that generated $200K+ per week.",
    tags: ["Portfolio Strategy", "Leverage", "Algo Trading"],
    image: img("portfolio-sim-markets"),
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
    image: img("tally-fintech-app"),
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
    image: "/projects/scholarships.jpg",
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
    image: "/projects/snow.jpg",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="eyebrow">03 · Projects</p>
          <div className="rule-brand mt-4 mb-8" />
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
              ? {
                  href: v.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-cursor": "View",
                }
              : {};

            return (
              <Wrapper
                key={v.id}
                {...linkProps}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                className="group card overflow-hidden flex flex-col"
              >
                {/* Duotone image header */}
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.image}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.onerror = null;
                      t.src = `https://picsum.photos/seed/proj${v.id}/800/600?grayscale`;
                    }}
                    className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/80 to-brand-pink/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75" />
                  <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-white/90">
                    {v.role}
                  </span>
                  <span className="absolute -bottom-4 right-3 display text-7xl font-bold text-white/25">
                    {String(v.id).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-2xl font-bold text-ink leading-tight">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-violet font-medium mt-1">
                    {v.context} · {v.period}
                  </p>
                  <p className="text-ink-soft text-sm leading-relaxed mt-4 flex-grow">
                    {v.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-line">
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
                        View Project
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
