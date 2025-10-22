"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

type Props = {
  bgImage?: string;
  company?: string;
  reraLine?: string;
};

export default function DisclaimerSection({
  bgImage = "/Images/round_bubble_shillloutte_bg.webp",
  company = "Chothani BuildCorp Pvt. Ltd",
  reraLine = "RERA Registered Project : P51800055642",
}: Props) {
  const reduce = useReducedMotion();

  // ✨ Fade-up animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeUpDelayed: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeBadge: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative border-b border-black/10 overflow-hidden">
      {/* Background image (visible fully) */}
      <div
        className="relative bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 lg:pt-16 pb-28 md:pb-32"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-center text-[#10410f] font-extrabold tracking-wide text-3xl sm:text-4xl md:text-5xl"
          >
            DISCLAIMER
          </motion.h2>

          {/* Copy */}
          <motion.div variants={fadeUpDelayed} className="mt-8 md:mt-10">
            <p className="mx-auto max-w-5xl text-center text-[15px] sm:text-base leading-8 text-neutral-800">
              Disclaimer – The plan, layout plans, the number of towers/proposed towers,
              specifications, amenities, images and visuals, drawings plans or sketches and
              other details shown in this promotional document are only indicative and the
              developer reserves the right to change any or all of these in the interest of
              the project as per applicable laws, rules and regulations. No representation
              or warranty is made or intended as to the accuracy or completeness of
              information and no commitments are being given under this promotional document
              or as to its suitability or adequacy for any purpose or otherwise howsoever,
              that the completed project will comply in any degree with such artist’s
              impression as depicted.
              <span className="font-semibold">
                {" "}
                The promotional document does not constitute an offer and/or contract of any
                type between the developer and the recipient.
              </span>{" "}
              All Flat/Unit/Shops allotted shall be governed by the terms &amp; conditions
              of the Agreement for Sale entered/to be entered into between allottée &amp;
              developer alongwith approved plans and no details mentioned in this promotional
              document shall in any way govern any such transaction.
              <br />
              <span className="inline-block mt-2">T&amp;C Apply.</span>
            </p>

            <p className="mx-auto mt-8 max-w-5xl text-center text-[15px] sm:text-base leading-8 text-neutral-800">
              <span className="font-semibold">Privacy Policy:</span> We collect information
              from you when you register on our site or fill out a form. When filling out a
              form on our site, for any of the above-mentioned reasons, you may be asked to
              enter your: name, e–mail address and phone number. You may, however, visit our
              site anonymously. Any of the information we collect from you is to personalize
              your experience, to improve our website and to improve customer service.{" "}
              <span className="font-semibold">
                “Any data collected will be/ will not be shared with any 3rd party”
              </span>{" "}
              in the privacy disclaimer section.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* White strip BELOW the background */}
      <div className="relative w-full h-24 bg-white" />

      {/* Gold badge overlapping seam */}
      <motion.div
        variants={fadeBadge}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto translate-y-1/2 rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.18)] overflow-hidden w-[88vw] max-w-[360px] sm:max-w-[520px] md:max-w-[520px]">
          <div
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-[8px] shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, rgba(114,71,8,1) 0%, rgba(182,122,26,1) 50%, rgba(120,67,5,1) 100%)",
            }}
          >
            <div className="text-center">
              <div className="text-white font-semibold tracking-wide text-lg sm:text-2xl md:text-3xl">
                {company}
              </div>
              <div className="mt-1 text-white/95 text-xs sm:text-sm md:text-base">
                {reraLine}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
