"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";

type Props = { showAfter?: number };

export default function ScrollToTopButton({ showAfter = 300 }: Props) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > showAfter);
    toggleVisible();
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, [showAfter]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const containerVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 12, scale: 0.95 },
  };

  // Subtle idle bounce for the button (disabled if prefers-reduced-motion)
  const bounceAnim = prefersReducedMotion
    ? {}
    : { y: [0, -4, 0] };

  const bounceTransition = prefersReducedMotion
    ? {}
    : { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const, repeatType: "mirror" as const };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={containerVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed right-5 bottom-[max(24px,env(safe-area-inset-bottom))] z-50
                     flex flex-col items-center gap-1.5 select-none"
        >
          {/* Square FAB */}
          <motion.button
            type="button"
            aria-label="Scroll to top"
            title="Scroll to top"
            onClick={scrollToTop}
            className="group relative w-12 h-12 md:w-14 md:h-14 rounded-xl
                       shadow-lg hover:bg-[#f7e37d]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d567]/80
                       transition-colors"
            style={{
              background:
                "linear-gradient(180deg, rgba(251, 230, 80, 1) 0%, rgba(201, 140, 8, 1) 100%)",
            }}
            animate={bounceAnim}
            transition={bounceTransition}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
          >
            <ChevronUp
              className="w-6 h-6 md:w-7 md:h-7 text-white mx-auto"
              strokeWidth={2.5}
            />

            {/* soft glossy sweep */}
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl
                           bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent)]
                           mix-blend-soft-light"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.button>

          {/* Label under the button */}
          {/* <motion.span
            className="text-[11px] md:text-xs font-medium tracking-wide
                       text-white/90 bg-black/40 px-2 py-0.5 rounded-full
                       backdrop-blur-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
          </motion.span> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
