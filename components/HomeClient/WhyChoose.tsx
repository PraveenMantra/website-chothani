"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

type Feature = { title: string; icon?: string };

const FEATURES: Feature[] = [
  { title: "Premium location in Chembur East", icon: "/Images/location.png" },           // TL
  { title: "RERA registered and legally transparent", icon: "/Images/rera.png" },        // TR
  { title: "Strong construction by trusted partners", icon: "/Images/shield.png" },      // MR
  { title: "Luxurious design with optional interiors", icon: "/Images/interiors.png" },  // BC
  { title: "Well-connected to work, travel & healthcare hubs", icon: "/Images/networking.png" }, // ML
];

const popUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyChoose() {
  const { scrollYProgress } = useScroll();
  const ySoft   = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const ySofter = useTransform(scrollYProgress, [0, 1], [0, 16]);

  return (
    <section id="why-choose" className="wrap">
      <div className="site-container relative mx-auto max-w-[1564px] px-4 py-16 lg:py-24">
        {/* connectors behind (parallax) */}
        <motion.svg
          className="connectors hidden lg:block"
          viewBox="0 0 1564 680"
          preserveAspectRatio="none"
          style={{ y: ySoft }}
        >
          {/* from center to each bubble (stouter strokes) */}
          {/* TL */}
          <path d="M782,330 C700,360 610,390 538,425" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          {/* TR */}
          <path d="M782,330 C864,360 954,390 1026,425" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          {/* MR */}
          <path d="M782,330 C920,330 1030,330 1128,330" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          {/* ML */}
          <path d="M782,330 C644,330 534,330 436,330" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          {/* BC */}
          <path d="M782,330 C782,408 782,466 782,520" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />

          {/* lighter echoes */}
          <motion.g style={{ y: ySofter }}>
            <path d="M782,330 C694,352 616,380 552,410" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,330 C870,352 948,380 1012,410" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,330 C920,344 1030,344 1128,344" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,330 C644,344 534,344 436,344" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,330 C782,420 782,474 782,528" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
          </motion.g>
        </motion.svg>

        {/* layout stage */}
        <div className="relative h-[920px] lg:h-[680px]">
          {/* center disk */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            <MainCircle />
          </motion.div>

          {/* TOP-LEFT */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute left-[18%] top-[18%]"
          >
            <BubbleCard text={FEATURES[0].title} icon={FEATURES[0].icon} size="lg" />
          </motion.div>

          {/* TOP-RIGHT */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute right-[18%] top-[18%]"
          >
            <BubbleCard text={FEATURES[1].title} icon={FEATURES[1].icon} size="lg" />
          </motion.div>

          {/* MID-RIGHT (smaller) */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute right-[23%] top-[48%]"
          >
            <BubbleCard text={FEATURES[2].title} icon={FEATURES[2].icon} size="lg" />
          </motion.div>

          {/* MID-LEFT (smaller) */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute left-[23%] top-[48%]"
          >
            <BubbleCard text={FEATURES[4].title} icon={FEATURES[4].icon} size="lg" />
          </motion.div>

          {/* BOTTOM-CENTER (smaller) */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute left-1/2 top-[74%] -translate-x-1/2"
          >
            <BubbleCard text={FEATURES[3].title} icon={FEATURES[3].icon} size="lg" />
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="absolute left-1/2 bottom-2 -translate-x-1/2"
          >
            <a
              href="#contact-us"
              className="inline-block rounded-xl px-8 py-3 font-semibold text-black
                         bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519]
                         shadow-[0_8px_24px_rgba(233,165,25,0.35)] border border-[#D8A018]/50
                         hover:scale-[1.02] active:scale-[0.99] transition"
            >
              KNOW MORE
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----- subcomponents ----- */

function MainCircle() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative grid place-items-center"
      aria-label="Why choose 27 Palazzo"
    >
      {/* gold ring */}
      <div className="rounded-full p-[12px] sm:p-[14px] md:p-[16px] bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519] shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
        {/* white inner plate */}
        <div className="rounded-full bg-white w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[285px] md:h-[285px] grid place-items-center relative">
          {/* soft inner drop */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_18px_rgba(0,0,0,0.06)]" />
          <div className="text-center px-6">
            <div className="text-[#2F2F2F] text-[18px] sm:text-[20px] font-semibold tracking-wide">WHY CHOOSE</div>
            <div className="text-[#0E3C14] text-[46px] sm:text-[54px] font-extrabold leading-none mt-1">27</div>
            <div className="text-[#2F2F2F] text-[18px] sm:text-[20px] font-semibold tracking-wide mt-1">PALAZZO?</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BubbleCard({
  text,
  icon,
  size = "md",
}: {
  text: string;
  icon?: string;
  size?: "md" | "lg";
}) {
  const dims = size === "lg" ? "w-[200px] h-[200px]" : "w-[190px] h-[190px]";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`relative ${dims} grid place-items-center bg-white rounded-full`}
    >
      {/* outer soft ring */}
      <div className="absolute  rounded-full bg-[rgba(0,0,0,0.06)] blur-[2px]" />
      <div className="rounded-full bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] w-[180px] h-[180px] grid place-items-center relative">
        {/* subtle gray rim to mimic screenshot ring */}
        <div className="absolute inset-0 rounded-full ring-1 ring-black/5" />

        {/* inner mini disk for icon */}
        {/* <div className="rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-[86px] h-[86px] grid place-items-center mb-2"> */}
          {icon ? (
            <Image
              src={icon}
              alt=""
              width={58}
              height={50}
              className="opacity-90"
              priority
            />
          ) : null}
        {/* </div> */}

        {/* text */}
        <p className="px-6 text-center text-[13px] leading-5 text-[#3A3A3A]">
          {text}
        </p>
      </div>

      {/* shadow puck */}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black/10 blur-[2px]" />
    </motion.div>
  );
}
