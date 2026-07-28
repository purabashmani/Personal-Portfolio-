"use client";

import { ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/**
 * Prominent closing band below Contact. Uses an href="#" anchor so the global
 * Lenis handler glides smoothly back to the hero (falls back to a native jump
 * to the top under reduced motion).
 */
export default function BackToTop() {
  return (
    <section aria-label="Back to top" className="relative bg-canvas px-6 py-20 text-center">
      <ScrollReveal>
        <a
          href="#"
          data-cursor="Top"
          aria-label="Back to top"
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line text-ink-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-violet group-hover:text-brand-violet">
            <ArrowUp size={22} />
          </span>
          <span className="display text-3xl font-bold text-ink transition-colors duration-300 group-hover:text-brand-violet md:text-4xl">
            Back to top
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.25em] text-ink-mute">
            Return to the start
          </span>
        </a>
      </ScrollReveal>
    </section>
  );
}
