"use client";

import { ArrowUp, Linkedin, Mail, Instagram } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="relative border-t border-line py-14 px-6 bg-canvas">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#" className="display text-2xl font-bold text-ink">
              Purab <span className="gradient-brand">Ashmaniwala</span>
            </a>
            <p className="text-ink-mute text-sm mt-1">
              Entrepreneur · Aspiring VC / Aspiring PE Investor · Boston
            </p>
          </div>

          <div className="flex items-center gap-5">
            {[
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/purab-ashmaniwala",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:ashmaniwala.p@northeastern.edu",
                label: "Email",
              },
              {
                icon: Instagram,
                href: "https://instagram.com",
                label: "Instagram",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink-mute hover:text-brand-violet transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 text-sm text-ink-mute hover:text-ink transition-colors group"
            >
              Back to top
              <ArrowUp
                size={14}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
            <p className="text-ink-mute text-xs">
              &copy; {new Date().getFullYear()} Purab Ashmaniwala
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
