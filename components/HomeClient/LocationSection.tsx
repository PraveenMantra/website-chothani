// app/(components)/LocationSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, Variants } from "framer-motion";

type Props = {
  heading?: string;
  address?: string;
  description?: string;
  /** Where the CTA goes – default is a Google Maps place link. */
  ctaHref?: string;
  ctaLabel?: string;
  /** Background and map image paths */
  bgImage?: string;
  mapImage?: string;
};

export default function LocationSection({
  heading = "LOCATION",
  address = "72 Union Park, Trilok Kapoor Marg, Chembur East, Mumbai 400 071",
  description = "Located in the heart of Chembur, 72 Pallazzo ensures residents stay connected to Mumbai’s prime work, travel, and healthcare hubs.",
  ctaHref = "https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071",
  ctaLabel = "KNOW MORE",
  bgImage = "/Images/location_bg.webp",
  mapImage = "/Images/map_location.png",
}: Props) {
  const reduce = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeInZoom: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };

  return (
    <section id="location"
      className="
    relative border-b border-black/10 
    bg-cover bg-center 
    px-4 sm:px-6 lg:px-8   
  "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="
      mx-auto 
      max-w-[1450px] 
      py-12 sm:py-16 lg:py-20  
      flex flex-col lg:flex-row 
      items-center justify-between 
      gap-10
    "
      >

        {/* Left content */}
        <motion.div
          variants={fadeUp}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#10410f] mb-6">
            {heading}
          </h2>

          <p className="text-base text-gray-800 leading-relaxed">
            {address}
          </p>

          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            {description}
          </p>

          <Button asChild className={cn(
            "mt-8 px-8 py-6 text-base font-semibold shadow-md",
            "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white",
            "hover:opacity-90"
          )}>
            <Link href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
            </Link>
          </Button>
        </motion.div>

        {/* Right map */}
        <motion.div
          variants={fadeInZoom}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative rounded-2xl border-[6px] border-[#10410f] overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.8231362575912!2d72.90391893324231!3d19.049502207091855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c603851cd013%3A0x2bc37a98aab3f66!2s27%2C%20Union%20Park%2C%20Chembur%2C%20Mumbai%2C%20Maharashtra%20400071!5e0!3m2!1sen!2sin!4v1762175913398!5m2!1sen!2sin" width="620" height="420" loading="lazy"></iframe>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
