"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import CountUp from "react-countup";

// Type definition
type Stat = { value: string; lines: [string, string?] };

// Stats data
const STATS: Stat[] = [
  { value: "7+", lines: ["YEARS OF", "LEGACY"] },
  { value: "350+", lines: ["JOIN TEAM", "STRENGTH"] },
  { value: "6500", lines: ["HOMES", "DELIVERED"] },
  { value: "3200", lines: ["HOMES UNDER", "CONSTRUCTION"] },
];

// Framer Motion variants
// Use cubic-bezier arrays (type-safe) and explicitly type/satisfy Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // ⬅️ cubic-bezier (easeOut-ish), no TS error
    },
  },
} satisfies Variants;

export default function StatsTiles() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1450px] px-0 [@media(max-width:1479px)]:px-8 [@media(max-width:1200px)]:px-6 py-10">
        <motion.ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {STATS.map(({ value, lines }, i) => (
            <motion.li key={i} variants={tileVariants}>
              <StatTile value={value} lines={lines} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function StatTile({ value, lines }: { value: string; lines: [string, string?] }) {
  // Extract numeric portion and suffix like "+"
  const match = value.match(/^(\d+)(\+)?$/);
  const numericValue = match ? parseInt(match[1], 10) : 0;
  const suffix = match && match[2] ? match[2] : "";

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-[26px] bg-[#ececec] p-[10px]"
      aria-label={`${value} ${lines.join(" ")}`}
    >
      {/* Gradient border */}
      <div className="rounded-[22px] p-[1.5px] bg-[linear-gradient(180deg,#f7d465_0%,#e6b83d_40%,#b87410_100%)]">
        {/* Card */}
        <div className="rounded-[20px] bg-white h-full flex flex-col items-center justify-center text-center
                        px-5 sm:px-6 py-10 sm:py-12 md:py-14 min-h-[260px]">
          {/* Animated Value */}
          <motion.div
            className="bg-gradient-to-b from-[#F7CB54] to-[#B47009] bg-clip-text text-transparent font-bold leading-[0.9] tracking-tight"
            style={{
              fontSize: "clamp(42px, 8vw, 84px)",
            }}
          >
            <CountUp
              start={0}
              end={numericValue}
              duration={2}
              enableScrollSpy
              scrollSpyOnce
            />
            {suffix}
          </motion.div>

          {/* Caption */}
          <div className="mt-9 text-[#0c3807] font-semibold uppercase leading-[1.1] tracking-wide
                          text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px]">
            <div>{lines[0]}</div>
            {lines[1] && <div>{lines[1]}</div>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
