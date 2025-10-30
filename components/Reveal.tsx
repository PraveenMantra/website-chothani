// components/Reveal.tsx
"use client";

import { motion } from "framer-motion";
import { type PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export default function Reveal({ className, children }: Props) {
  // No conditional rendering. Children are present in the initial HTML,
  // so the LCP image stays discoverable. We only animate on hydrate.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
