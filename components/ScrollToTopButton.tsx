"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Props = {
  /** Show button after this many pixels scrolled */
  showAfter?: number;
};

export default function ScrollToTopButton({ showAfter = 300 }: Props) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > showAfter);
    toggleVisible();
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show:   { opacity: 1, scale: 1,   y: 0 },
    exit:   { opacity: 0, scale: 0.9, y: 20 },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          title="Scroll to top"
          onClick={scrollToTop}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={prefersReducedMotion ? undefined : variants}
          transition={prefersReducedMotion ? undefined : { duration: 0.18 }}
          className={[
            "fixed z-50 bottom-[max(theme(spacing.6),env(safe-area-inset-bottom))] right-4",
            "rounded-full shadow-lg",
            // Theme-aware surface
            "bg-white/80 dark:bg-neutral-900/80 backdrop-blur",
            // Brand ring (teal-ish as per your project’s accent)
            "ring-1 ring-teal-300/60 dark:ring-teal-400/40",
            // Hover/focus states
            "hover:bg-white dark:hover:bg-neutral-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80",
            // Transition
            "transition-colors",
            // Subtle animated glow (defined below in CSS)
            "scrolltop-glow",
          ].join(" ")}
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            className="p-2 md:p-2.5"
          >
            <Image
              src="/images/scroll_top.webp"
              alt="Scroll to top"
              width={48}
              height={48}
              priority={false}
              className="w-[11vw] md:w-[44px] lg:w-[42px] h-auto select-none"
              draggable={false}
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
