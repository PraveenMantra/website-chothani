"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";

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
  hidden: { opacity: 0, y: 28, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChoose() {
  const { scrollY } = useScroll();
  const yRaw = useTransform(scrollY, [0, 800], [0, 80]); // map 0–800px scroll → 0–80px shift
  const y = useSpring(yRaw, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <section
      id="why-choose"
      className="relative border-b border-black/10 bg-cover bg-center"
      style={{ backgroundImage: "url(/Images/round_bubble_shillloutte_bg.webp)" }}
    >
      {/* optional skyline strip */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] sm:h-[120px] bg-repeat-x bg-bottom opacity-80"
        // style={{ backgroundImage: "url(/Images/why_choose_skyline.webp)" }}
      />

      <div className="relative mx-auto max-w-[1564px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24 mb-[55px]">
        {/* ---- Stage ---- */}
        <div className="relative hidden lg:block w-full aspect-[1564/680] overflow-visible mt-[-100px]">
          {/* Centered curve image */}
          <motion.img
            src="/Images/whyCHoos_curv.png"
            alt="Connector curve"
            className="
          absolute left-1/2
          -translate-x-1/2
          w-[50%] max-w-[800px]
          object-contain pointer-events-none select-none
        "
            style={{ top: "21%", y }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Center badge */}
          <BubblePos className="left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
            <MainCircle />
          </BubblePos>

          {/* TL bubble */}
          <BubblePos className="left-[20%] top-[18%]">
            <BubbleCard {...FEATURES[0]} />
          </BubblePos>

          {/* TR bubble */}
          <BubblePos className="right-[20%] top-[18%]">
            <BubbleCard {...FEATURES[1]} />
          </BubblePos>

          {/* ML bubble */}
          <BubblePos className="left-[26%] top-[55%]">
            <BubbleCard {...FEATURES[4]} />
          </BubblePos>

          {/* MR bubble */}
          <BubblePos className="right-[26%] top-[55%]">
            <BubbleCard {...FEATURES[2]} />
          </BubblePos>

          {/* BC bubble */}
          <BubblePos className="left-1/2 top-[68%] -translate-x-1/2">
            <BubbleCard {...FEATURES[3]} />
          </BubblePos>

          {/* CTA */}
          <motion.div
            variants={popUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "calc(var(--spacing) * -23)" }} // ✅ Custom bottom offset
          >
            <a
              href="#contact-us"
              className="inline-block rounded-[6px] px-8 py-3 font-semibold text-white
      shadow-[0_12px_28px_rgba(0,0,0,0.18)]
      border border-[#f6d789] transition
      hover:scale-[1.02] active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, rgba(247, 207, 75, 1) 0%, rgba(186, 115, 2, 1) 100%)",
              }}
            >
              KNOW MORE
            </a>
          </motion.div>

        </div>

        {/* ---- Mobile version (stacked) ---- */}
        <div className="lg:hidden">
          <div className="flex justify-center">
            <MainCircle />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex justify-center">
                <BubbleCard {...f} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
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
          </div>
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
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Main Circle ---------- */
function MainCircle() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative grid place-items-center"
      aria-label="Why choose 27 Palazzo"
    >
      {/* Outer gold gradient ring */}
      <div className="rounded-full p-[clamp(10px,1.2vw,16px)] bg-[linear-gradient(180deg,#D29A06_0%,#FEE792_35%,#BC7100_65%,#EFB000_100%)] shadow-[0_18px_45px_rgba(0,0,0,0.14)]">

        {/* Inner white circle */}
        <div className="relative grid h-[270px] w-[270px] place-items-center rounded-full bg-white sm:h-[240px] sm:w-[240px] md:h-[270px] md:w-[270px]">
          {/* subtle inset shadow */}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_8px_20px_rgba(0,0,0,0.06)]" />

          {/* Center text */}
          <div className="text-center flex flex-col items-center justify-center leading-tight">
            {/* WHY */}
            <span
              className="
                block
                font-semibold
                text-[clamp(22px,4vw,32px)]
                bg-[linear-gradient(180deg,rgba(22,77,6,1)0%,rgba(2,42,5,1)100%)]
                bg-clip-text text-transparent
              "
            >
              WHY
            </span>

            {/* CHOOSE */}
            <span
              className="
                block
                font-semibold
                text-[clamp(22px,4vw,32px)]
                bg-[linear-gradient(180deg,rgba(22,77,6,1)0%,rgba(2,42,5,1)100%)]
                bg-clip-text text-transparent
              "
            >
              CHOOSE
            </span>

            {/* 27 */}
            <span
              className="
                block
                font-extrabold
                mt-[4px]
                text-[clamp(40px,7vw,60px)]
                leading-none
                bg-[linear-gradient(180deg,rgba(22,77,6,1)0%,rgba(2,42,5,1)100%)]
                bg-clip-text text-transparent
              "
            >
              27
            </span>

            {/* PALAZZO? */}
            <span
              className="
                block
                mt-[2px]
                font-semibold
                text-[clamp(22px,4vw,32px)]
                bg-[linear-gradient(180deg,rgba(22,77,6,1)0%,rgba(2,42,5,1)100%)]
                bg-clip-text text-transparent
              "
            >
              PALAZZO?
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



/* ---------- Bubble Card ---------- */
// function BubbleCard({ title, icon }: Feature) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03, y: -3 }}
//       transition={{ type: "spring", stiffness: 360, damping: 22 }}
//       className="relative grid place-items-center rounded-full"
//       style={{
//         width: "clamp(150px,13vw,200px)",
//         height: "clamp(150px,13vw,200px)",
//       }}
//     >
//       <div className="absolute -z-10 w-full h-full rounded-full bg-black/5 blur-[2px]" />
//       <div className="relative grid place-items-center w-[92%] h-[92%] rounded-full bg-white shadow-[0_18px_45px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.7)]">
//         <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/5" />
//         <div className="mb-2 grid place-items-center">
//           <Image
//             src={icon}
//             alt=""
//             width={60}
//             height={60}
//             className="object-contain w-[clamp(40px,4vw,70px)] h-auto opacity-95"
//           />
//         </div>
//         <p className="text-center leading-5 text-[#3A3A3A] text-[12px] font-semibold -mt-10 mx-auto px-2"
//           style={{
//             maxWidth: "120px",
//             wordWrap: "break-word",
//             overflowWrap: "break-word",
//           }}
//         >
//           {title}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

function BubbleCard({ title, icon }: Feature) {
  // Bold the first word (e.g., "RERA") like the reference
  const [first, ...rest] = title.split(" ");
  const restText = rest.join(" ");

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className="relative grid place-items-center"
      style={{
        width: "clamp(150px,13vw,200px)",
        height: "clamp(150px,13vw,200px)",
      }}
    >
      {/* Ground shadow (soft oval below) */}
      {/* <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2 w-12 rounded-full bg-black/15 blur-[2px]" /> */}

      {/* ===== Shell (rim) with drop shadow ===== */}
      <div
        className="
          relative grid place-items-center w-full h-full rounded-full
          shadow-[0_18px_34px_rgba(0,0,0,0.22),0_6px_14px_rgba(0,0,0,0.14)]
          bg-[radial-gradient(120%_120%_at_50%_0%,#ffffff_0%,#edeff3_50%,#d6d8dd_100%)]
        "
      >
        {/* ===== Inner plate (white) with top inset highlight + bottom inner shadow ===== */}
        <div
          className="
            relative grid place-items-center rounded-full w-[92%] h-[92%]
            bg-[linear-gradient(180deg,#e9ebef_0%,#ffffff_45%,#ffffff_100%)]
            shadow-[inset_0_10px_18px_rgba(0,0,0,0.06),inset_0_-10px_14px_rgba(0,0,0,0.10)]
          "
        >
          {/* subtle edge ring for crispness */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/5" />

          {/* ICON */}
          <div className="mt-4 grid place-items-center">
            <Image
              src={icon}
              alt=""
              width={60}
              height={60}
              className="object-contain w-[clamp(42px,4.2vw,60px)] h-auto"
            />
          </div>

          {/* CAPTION (120px max width, pulled up toward icon) */}
          <p
            className="
              mx-auto text-center leading-[1.15]
              text-[12px] text-black
              -mt-3 px-2
            "
            style={{
              maxWidth: "120px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              fontWeight: 600,
            }}
          >
            <span className="font-[600]">{first}</span>
            {restText ? " " : ""}
            <span className="font-[600]">{restText}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

