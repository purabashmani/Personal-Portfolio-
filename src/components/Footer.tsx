"use client";

import { Linkedin, Mail, Instagram } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

// lucide has no TikTok / Substack brand icons, so use small inline SVGs.
function TikTokIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.6-2.6c.27 0 .53.04.77.12V9.78a5.7 5.7 0 1 0 4.9 5.64V9.01a7.34 7.34 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.22-1.48z" />
    </svg>
  );
}

function SubstackIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/purab-ashmaniwala",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:purab.ashmani@gmail.com",
    label: "Email",
  },
  {
    icon: SubstackIcon,
    href: "https://tamarventures.substack.com/p/the-ai-gold-rush-what-openai-and",
    label: "Substack",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/simple___economics",
    label: "Instagram",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@simple__economics",
    label: "TikTok",
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas px-6 py-14">
      <ScrollReveal>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#" className="display text-2xl font-bold text-ink">
              Purab <span className="gradient-brand">Ashmaniwala</span>
            </a>
            <p className="mt-1 text-sm text-ink-mute">
              Entrepreneur · Aspiring VC / Aspiring PE Investor · Boston
            </p>
          </div>

          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-cursor={label}
                className="text-ink-mute transition-colors hover:text-brand-violet"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <p className="text-xs text-ink-mute">
            &copy; {new Date().getFullYear()} Purab Ashmaniwala
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
