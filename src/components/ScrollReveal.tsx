"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  scale?: boolean;
  distance?: number;
  once?: boolean;
}

// Cinematic easing (matches the Rockstar-style slow-in reveals)
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  scale = false,
  distance = 48,
  once = true,
}: ScrollRevealProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  if (direction === "down") initial.y = -distance;
  if (direction === "left") initial.x = distance;
  if (direction === "right") initial.x = -distance;
  if (scale) initial.scale = 0.92;

  const animate: Record<string, number> = { opacity: 1, x: 0, y: 0 };
  if (scale) animate.scale = 1;

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-90px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
