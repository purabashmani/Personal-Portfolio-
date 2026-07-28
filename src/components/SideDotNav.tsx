"use client";

import { useEffect, useState } from "react";

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

/**
 * Vertical dot navigation pinned to the right edge (desktop only). The active
 * section's dot is filled and its label shown; hovering any dot reveals its
 * label. Clicking jumps to the section.
 */
export default function SideDotNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`rounded-full bg-white/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-ink shadow-sm backdrop-blur transition-all duration-300 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full shadow-sm transition-all duration-300 ${
                isActive
                  ? "scale-125 bg-gradient-to-br from-brand-violet to-accent-crimson"
                  : "bg-ink/25 group-hover:bg-brand-violet/60"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
