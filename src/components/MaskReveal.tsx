"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Rockstar-style line reveal: the text is clipped by an overflow-hidden
 * wrapper and wipes up into view. Uses useInView (rather than whileInView)
 * so it fires reliably even when nested inside a scroll-transformed parent.
 */
export default function MaskReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: MaskRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  return (
    <span ref={ref} className="mask-clip">
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : { y: "115%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
}
