"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Investing", href: "#thesis" },
  { label: "Leadership", href: "#leadership" },
  { label: "Recommendations", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
];

const RESUME = "/Purab_Ashmaniwala_Resume.pdf";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/70 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-6 py-4 pl-5 pr-5 md:pl-8 md:pr-8">
        <a
          href="#"
          className="display whitespace-nowrap text-base font-bold leading-none tracking-tight text-ink md:text-lg"
        >
          Purab Ashmaniwala <span className="gradient-brand">Portfolio</span>
        </a>

        <div className="flex items-center gap-3">
          <Button asChild variant="brand" size="sm">
            <a href={RESUME} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          </Button>

          {/* Mobile menu - Radix Dialog (a11y) + Motion springs (Apple feel).
              Desktop navigates via the side dot rail, so this is mobile-only. */}
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button
                className="rounded-md p-1 text-ink transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </Dialog.Trigger>

            <AnimatePresence>
              {menuOpen && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-md"
                    />
                  </Dialog.Overlay>

                  <Dialog.Content asChild forceMount aria-describedby={undefined}>
                    <motion.div
                      initial={
                        reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -8 }
                      }
                      animate={
                        reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
                      }
                      exit={
                        reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -6 }
                      }
                      transition={
                        reduce
                          ? { duration: 0.15 }
                          : { type: "spring", bounce: 0, duration: 0.38 }
                      }
                      style={{ transformOrigin: "top right" }}
                      className="fixed right-4 top-4 z-50 w-64 rounded-2xl border border-line bg-white/75 p-5 shadow-[0_24px_60px_-20px_rgba(147,51,234,0.4)] backdrop-blur-xl focus:outline-none"
                    >
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink"
                          >
                            {link.label}
                          </a>
                        ))}
                      </nav>
                      <Dialog.Close
                        className="absolute right-3 top-3 rounded-full p-1 text-ink-mute transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Close menu"
                      >
                        <X size={18} />
                      </Dialog.Close>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </motion.nav>
  );
}
