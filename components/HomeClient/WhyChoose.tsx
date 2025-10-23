"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

type Feature = { title: string; icon: string };

const FEATURES: Feature[] = [
  { title: "Premium location in Chembur East", icon: "/Images/location.png" },          // TL
  { title: "RERA registered and legally transparent", icon: "/Images/rera.png" },       // TR
  { title: "Strong construction by trusted partners", icon: "/Images/shield.png" },     // MR
  { title: "Luxurious design with optional interiors", icon: "/Images/interiors.png" }, // BC
  { title: "Well-connected to work, travel & healthcare hubs", icon: "/Images/networking.png" }, // ML
];

/* ---------- Animations ---------- */
const popUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChoose() {
  const { scrollYProgress } = useScroll();
  const ySoft = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const ySofter = useTransform(scrollYProgress, [0, 1], [0, 16]);

  return (
    <section
      id="why-choose"
      className="relative border-b border-black/10 bg-cover bg-center"
      style={{ backgroundImage: "url(/Images/round_bubble_shillloutte_bg.webp)" }}
    >
      {/* skyline strip (optional) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] sm:h-[120px] bg-repeat-x bg-bottom opacity-80"
           style={{ backgroundImage: "url(/Images/why_choose_skyline.webp)" }} />

      <div className="relative mx-auto max-w-[1564px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* connectors (behind) */}
        <motion.svg
          viewBox="0 0 1564 680"
          preserveAspectRatio="none"
          className="absolute inset-0 hidden h-[680px] w-full lg:block"
          style={{ y: ySoft }}
        >
          {/* main strokes */}
          <path d="M782,310 C700,360 610,395 540,430" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          <path d="M782,310 C864,360 954,395 1024,430" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          <path d="M782,310 C918,310 1030,310 1128,310" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          <path d="M782,310 C646,310 536,310 438,310" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />
          <path d="M782,310 C782,388 782,448 782,505" stroke="rgba(0,0,0,0.16)" strokeWidth="7" fill="none" />

          {/* lighter echoes */}
          <motion.g style={{ y: ySofter }}>
            <path d="M782,310 C694,352 616,382 552,410" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,310 C870,352 948,382 1012,410" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,310 C920,326 1030,326 1128,326" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,310 C644,326 534,326 436,326" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
            <path d="M782,310 C782,404 782,460 782,518" stroke="rgba(0,0,0,0.10)" strokeWidth="7" fill="none" />
          </motion.g>
        </motion.svg>

        {/* stage */}
        <div className="relative h-[940px] lg:h-[680px]">
          {/* center badge */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
          >
            <MainCircle />
          </motion.div>

          {/* TL bubble */}
          <BubblePos className="left-[17%] top-[16%]">
            <BubbleCard {...FEATURES[0]} />
          </BubblePos>

          {/* TR bubble */}
          <BubblePos className="right-[17%] top-[16%]">
            <BubbleCard {...FEATURES[1]} />
          </BubblePos>

          {/* MR bubble */}
          <BubblePos className="right-[22%] top-[47%]">
            <BubbleCard {...FEATURES[2]} />
          </BubblePos>

          {/* ML bubble */}
          <BubblePos className="left-[22%] top-[47%]">
            <BubbleCard {...FEATURES[4]} />
          </BubblePos>

          {/* BC bubble */}
          <BubblePos className="left-1/2 top-[73%] -translate-x-1/2">
            <BubbleCard {...FEATURES[3]} />
          </BubblePos>

          {/* CTA */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="absolute left-1/2 bottom-6 -translate-x-1/2"
          >
            <a
              href="#contact-us"
              className="inline-block rounded-xl px-8 py-3 font-semibold text-black
                         shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                         border border-[#D8A018]/50 transition
                         hover:scale-[1.02] active:scale-95"
              style={{
                background:
                  "linear-gradient(90deg, rgba(114,71,8,1) 0%, rgba(182,122,26,1) 50%, rgba(120,67,5,1) 100%)",
              }}
            >
              KNOW MORE
            </a>
          </motion.div>
        </div>

        {/* mobile layout (stacked) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex justify-center">
              <BubbleCard {...f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function BubblePos({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={popUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`absolute ${className} hidden lg:block`}
    >
      {children}
    </motion.div>
  );
}

function MainCircle() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative grid place-items-center"
      aria-label="Why choose 27 Palazzo"
    >
      {/* gold gradient ring */}
      <div className="rounded-full p-[14px] md:p-[16px] bg-[linear-gradient(180deg,#f0b12b_0%,#f6da76_55%,#e9a519_100%)] shadow-[0_18px_45px_rgba(0,0,0,0.14)]">
        {/* inner white plate */}
        <div className="relative grid h-[280px] w-[280px] place-items-center rounded-full bg-white sm:h-[300px] sm:w-[300px] md:h-[320px] md:w-[320px]">
          {/* subtle inset */}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_8px_20px_rgba(0,0,0,0.06)]" />
          <div className="px-6 text-center">
            <div className="text-[18px] sm:text-[20px] font-semibold tracking-wide text-[#2F2F2F]">
              WHY CHOOSE
            </div>
            <div className="mt-1 leading-none text-[54px] sm:text-[60px] font-extrabold text-[#0E3C14]">
              27
            </div>
            <div className="mt-1 text-[18px] sm:text-[20px] font-semibold tracking-wide text-[#2F2F2F]">
              PALAZZO?
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BubbleCard({ title, icon }: Feature) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className="relative grid h-[200px] w-[200px] place-items-center rounded-full"
    >
      {/* soft outer shadow ring */}
      <div className="absolute -z-10 h-[210px] w-[210px] rounded-full bg-black/5 blur-[2px]" />

      {/* white plate with gentle rim */}
      <div className="relative grid h-[186px] w-[186px] place-items-center rounded-full bg-white shadow-[0_18px_45px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/6" />

        {/* icon */}
        <div className="mb-2 grid h-[70px] w-[70px] place-items-center">
          <Image src={icon} alt="" width={60} height={60} className="object-contain opacity-95" />
        </div>

        {/* caption */}
        <p className="px-6 text-center text-[13px] leading-5 text-[#3A3A3A]">{title}</p>
      </div>

      {/* small ground shadow */}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2 w-12 rounded-full bg-black/10 blur-[2px]" />
    </motion.div>
  );
}
