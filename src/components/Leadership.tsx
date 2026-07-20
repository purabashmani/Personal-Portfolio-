"use client";

import { motion } from "framer-motion";
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
}

const items: Item[] = [
  {
    id: 1,
    icon: Video,
    role: "Content Creator, Economics & Finance",
    org: "TikTok · Instagram",
    period: "2021 - Present",
    description:
      "Produce short-form educational videos on personal finance and economics (5K+ cumulative views), using audience analytics and storytelling to make complex concepts click for students.",
  },
  {
    id: 2,
    icon: Users,
    role: "Research Assistant",
    org: "Oakland Community Mural Project",
    period: "Sept 2025 - Present",
    description:
      "Conduct qualitative research on community engagement through public art, coordinate event logistics, and synthesize insights on art-driven social cohesion.",
  },
  {
    id: 3,
    icon: HeartHandshake,
    role: "Leadership Team",
    org: "Community Service Club · Northeastern",
    period: "Sept 2025 - Present",
    description:
      "Organize high-impact volunteer initiatives with local nonprofits, motivating student teams and cultivating civic engagement on campus.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative py-28 px-6 bg-canvas-alt border-y border-line overflow-hidden"
    >
      <div className="blob w-[360px] h-[360px] bg-accent-teal/15 top-10 left-[-4rem]" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="eyebrow">04 · Leadership</p>
          <div className="rule-brand mt-4 mb-8" />
          <h2 className="display text-4xl md:text-5xl font-bold text-ink leading-[1.02] max-w-3xl">
            <MaskReveal>Building </MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              community &amp; audience.
            </MaskReveal>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                className="card p-7 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink flex items-center justify-center mb-5">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-xs text-ink-mute">{item.period}</span>
                <h3 className="display text-lg font-bold text-ink mt-1 leading-snug">
                  {item.role}
                </h3>
                <p className="text-sm text-brand-violet font-medium mt-1">
                  {item.org}
                </p>
                <p className="text-sm text-ink-soft leading-relaxed mt-4">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
