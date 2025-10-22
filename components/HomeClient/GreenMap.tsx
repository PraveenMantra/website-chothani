"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const HIGHLIGHTS = [
  "Spacious 3 BHK layouts with 1500 sq. ft. carpet area",
  "Premium fittings & modern design",
  "Earthquake resistant structure",
  "Multiple podium parking levels",
  "Designer common areas & double-height lobby",
  "Multi-purpose terrace for leisure & gatherings",
];

// Variants for staggered text reveal
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Fade-up animation for text items
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Fade + scale for image entrance
const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 1.05, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function GreenMap() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect: image moves slightly (20px up to -40px)
  const y = useTransform(scrollYProgress, [0, 1], [30, -40]);

  return (
    <section id="highlights" className="greenMap" ref={ref}>
      <div className="relative z-10 max-w-[1564px] mx-auto px-4 py-12 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Title + Bullets */}
          <motion.div
            className="lg:col-span-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold
                         bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519]
                         bg-clip-text text-transparent drop-shadow"
            >
              PROJECT HIGHLIGHTS
            </motion.h2>

            <motion.ul className="mt-6 space-y-4">
              {HIGHLIGHTS.map((line) => (
                <motion.li
                  key={line}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-[15px] leading-7"
                >
                  <span
                    className="mt-2 inline-block size-2.5 rounded-full
                               bg-[#E9A519] shadow-[0_0_0_3px_rgba(233,165,25,0.25)]"
                    aria-hidden
                  />
                  <span className="text-white/95">{line}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT: Building Image with parallax + fade + scale */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeScale}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{ y }}
          >
            <div className="relative w-full h-[420px] lg:h-[520px]">
              <Image
                src="/Images/map_building_logo.png"
                alt="Project location & skyline"
                fill
                className="object-contain object-bottom select-none"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
