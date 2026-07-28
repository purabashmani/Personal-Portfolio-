"use client";

import { useState } from "react";
import { Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";

interface Rec {
  id: number;
  name: string;
  credential: string;
  initials: string;
  linkedin: string;
  quote: string;
  highlights: string[];
  letter: string[];
}

const recs: Rec[] = [
  {
    id: 1,
    name: "Aleks Gollu",
    credential: "Associate Teaching Professor, Entrepreneurship · Northeastern",
    initials: "AG",
    linkedin: "https://www.linkedin.com/in/aleksgollu",
    quote:
      "Purab has great analytical skills and pays close attention to details. His written work is clear, organized, and thoughtful.",
    highlights: [
      "Exceptional student",
      "High scores in class",
      "Strong analytical skills",
    ],
    letter: [
      "Purab Ashmaniwala is a student in my course INNO 2301, Innovation, this semester. Purab is an exceptional student. He is very engaged and participates in all classes. He comes prepared, listens carefully, and plays an active part in our discussions. He shows true curiosity about the topics we study and often thinks about them beyond the basic course material.",
      "Purab has great analytical skills and pays close attention to details. His written work is clear, organized, and thoughtful. He also shows strong motivation to advance his career and to use what he learns in a serious and responsible way.",
      "Purab has very good social and interpersonal skills. Our class includes a team-class project. As you may imagine, not all teams work harmoniously. Purab and his team worked very well together, and the final presentation showed that Purab was a major contributor to the team.",
      "Purab received high scores in class. He is mature and skillful and has shown that he can meet very high academic standards.",
    ],
  },
  {
    id: 2,
    name: "Netanel (Netty) Drori, PhD",
    credential: "Associate Teaching Professor, International Business · Northeastern",
    initials: "ND",
    linkedin: "https://www.linkedin.com/in/netanel-drori-4a528161",
    quote:
      "In many ways, he serves as a role model in class for other students, both in his behavior and in the quality of his work.",
    highlights: [
      "Highest score in class",
      "Class role model",
      "Meets high academic standards",
    ],
    letter: [
      "Purab is a student in my course INTB-1203, International Business and Global Social Responsibility, this semester. Purab is an exceptional student; he is very engaged and participates in all classes. He comes prepared, listens carefully, and plays an active part in our discussions. He shows true curiosity about the topics we study and often thinks about them beyond the basic course material. Purab has great analytical skills and pays close attention to details. His written work is clear, organized, and thoughtful. He also shows strong motivation to advance his career and to use what he learns in a serious and responsible way.",
      "In addition, Purab has very good social and interpersonal skills. He works well with other students and is always polite and respectful. In many ways, he serves as a role model in class for other students, both in his behavior and in the quality of his work.",
      "Purab received the highest score in the class. He is mature and skillful and has shown that he can meet very high academic standards. It is truly a pleasure to work with him in my class this semester!",
    ],
  },
];

function RecCard({ rec }: { rec: Rec }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-500 hover:border-brand-violet/40 hover:shadow-[0_30px_70px_-30px_rgba(147,51,234,0.45)]">
      {/* decorative quote mark */}
      <span
        className="display gradient-brand pointer-events-none select-none text-7xl leading-[0.6]"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="display mt-3 text-xl font-bold leading-snug text-ink md:text-2xl">
        {rec.quote}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {rec.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-semibold text-brand-violet"
          >
            {h}
          </span>
        ))}
      </div>

      {/* expandable full letter (CSS-grid accordion, no JS height math) */}
      <div
        className={`grid transition-all duration-500 ${
          open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-soft">
            {rec.letter.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-cursor={open ? "Close" : "Read"}
        className="mt-5 self-start text-xs font-semibold text-brand-violet transition-colors hover:text-accent-crimson"
      >
        {open ? "Hide letter" : "Read the full letter →"}
      </button>

      {/* credential footer */}
      <div className="mt-auto flex items-center gap-4 border-t border-line pt-6">
        <span className="display grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-pink text-sm font-bold text-white">
          {rec.initials}
        </span>
        <div className="min-w-0 flex-grow">
          <p className="font-bold leading-tight text-ink">{rec.name}</p>
          <p className="mt-0.5 text-xs text-ink-mute">{rec.credential}</p>
        </div>
        <a
          href={rec.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="LinkedIn"
          aria-label={`${rec.name} on LinkedIn`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand-violet hover:text-brand-violet"
        >
          <Linkedin size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Recommendations() {
  return (
    <section id="recommendations" className="relative overflow-hidden px-6 py-28">
      <div className="blob right-[-4rem] top-10 h-[380px] w-[380px] bg-brand-indigo/15" />

      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="eyebrow">07 · Recommendations</p>
          <div className="rule-brand mb-8 mt-4" />
          <h2 className="display max-w-3xl text-4xl font-bold leading-[1.02] text-ink md:text-5xl">
            <MaskReveal>Don&apos;t just take</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              my word for it.
            </MaskReveal>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">
            Letters from two Northeastern professors I studied under, on how I
            show up in the classroom.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {recs.map((r) => (
            <ScrollReveal key={r.id} delay={r.id * 0.08}>
              <RecCard rec={r} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
