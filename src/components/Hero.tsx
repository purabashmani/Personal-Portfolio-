"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import MaskReveal from "./MaskReveal";
import MarketBackdrop from "./MarketBackdrop";
import { Button } from "@/components/ui/button";

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/purab-ashmaniwala",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:ashmaniwala.p@northeastern.edu", label: "Email" },
];

const ROLES = ["Entrepreneur", "Aspiring VC", "PE Investor", "Founder"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1, reduce ? 1 : 0]
  );
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);

  // rotating role words
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((p) => (p + 1) % ROLES.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-canvas"
    >
      {/* Finance / markets motif */}
      <MarketBackdrop />

      {/* Ambient parallax blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="blob w-[520px] h-[520px] bg-brand-indigo/40 -top-24 -left-24 animate-blob-float"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="blob w-[440px] h-[440px] bg-brand-pink/40 top-10 right-[-6rem] animate-blob-float"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-7"
        >
          Business &amp; Entrepreneurship · Northeastern
        </motion.p>

        <h1 className="display text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8.5rem] font-bold text-ink">
          <MaskReveal delay={0.05}>Purab</MaskReveal>
          <MaskReveal delay={0.16} className="gradient-brand">
            Ashmaniwala
          </MaskReveal>
        </h1>

        {/* Rotating roles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-5 flex items-center gap-3 display text-2xl md:text-4xl text-ink"
        >
          <span className="text-brand-violet">{"//"}</span>
          <span className="relative inline-flex h-[1.25em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="block gradient-brand font-bold"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="mt-8 text-lg md:text-2xl text-ink-soft max-w-2xl leading-relaxed"
        >
          Business &amp; Entrepreneurship student at Northeastern. I&apos;ve
          founded ventures and worked inside{" "}
          <span className="text-ink font-medium">venture capital</span> and
          angel investing. Now I&apos;m building toward a career backing bold
          founders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="brand" size="lg">
            <a href="#experience">See my track record</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="/Purab_Ashmaniwala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download résumé
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex items-center gap-5"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-ink-mute hover:text-brand-violet transition-colors"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
