"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * App-wide motion config. `reducedMotion="user"` makes every Framer Motion
 * component automatically respect prefers-reduced-motion: transform and layout
 * animations are disabled (opacity/color still animate), per Apple's reduced-
 * motion guidance (gentler equivalent, not zero feedback).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
