"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type Point = { label: string; value: string };
type Card = { title: string; iconSrc: string; points: Point[] };

const CARDS: Card[] = [
  {
    title: "Work",
    iconSrc: "/Images/work.png",
    points: [
      { label: "BKC", value: "15 mins" },
      { label: "Fort", value: "20 mins" },
      { label: "Lower Parel", value: "30 mins" },
      { label: "SEEPZ", value: "40 mins" },
    ],
  },
  {
    title: "Travel",
    iconSrc: "/Images/travel.png",
    points: [
      { label: "Chembur Station", value: "5 mins" },
      { label: "Monorail Station", value: "7 mins" },
      { label: "Lokmanya Tilak Terminus", value: "15 mins" },
      { label: "Domestic Airport", value: "30 mins" },
    ],
  },
  {
    title: "Healthcare",
    iconSrc: "/Images/healthcare.png",
    points: [
      { label: "Zen Hospital", value: "10 mins" },
      { label: "Asian Heart Institute", value: "20 mins" },
      { label: "Hinduja Hospital", value: "30 mins" },
    ],
  },
];

// Motion variants (use cubic-bezier arrays for TS safety)
const containerVariants: Variants = {
  hidden: { opacity: 1 }, // keep parent visible, just stagger children
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
} satisfies Variants;

export default function ConnectivityHighlights() {
  return (
    <section aria-labelledby="connectivity-heading" className="relative border-b border-black/10">
      {/* top-half background image */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/Images/connectivity_highlihgtBG.webp)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1260px] px-4 py-16 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-10">
          <h3
            id="connectivity-heading"
            className="font-semibold text-white tracking-tight text-[32px] leading-[1.2]"
          >
            CONNECTIVITY HIGHLIGHTS
          </h3>
          <h5 className="mt-2 text-white font-normal text-[24px] leading-[1.4]">
            Enjoy seamless access to Mumbai’s prime destinations
          </h5>
        </div>


        {/* cards with staggered fade-up */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              variants={cardVariants}
              className={`
                w-full max-w-[362px] mx-auto rounded-[22px] bg-[#f5f5f5] p-[10px]
                ${i === 1 ? "shadow-[0_10px_30px_rgba(0,0,0,0.08)]" : ""}
              `}
            >
              {/* Inner 2px border layer */}
              <div className="rounded-[18px] p-[2px] bg-[linear-gradient(180deg,#f7d465_0%,#e6b83d_40%,#b87410_100%)] h-full">
                {/* Actual white card content */}
                <div className="rounded-[16px] bg-white p-6 sm:p-8 h-full flex flex-col justify-between">
                  {/* icon */}
                  <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                    <Image
                      src={card.iconSrc}
                      alt={card.title}
                      width={112}
                      height={112}
                      className="h-28 w-28 object-contain"
                      priority
                    />
                  </div>

                  {/* title */}
                  <h3 className="text-center text-2xl font-semibold text-emerald-900">{card.title}</h3>

                  {/* list */}
                  <ul className="mt-6 space-y-3 flex-1">
                    {card.points.map((p) => (
                      <li
                        key={p.label}
                        className="flex items-start gap-3 text-neutral-800 text-[16px]"
                      >
                        <span className="mt-2 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-600" />
                        <div className="flex w-full justify-between gap-3">
                          <span className="font-semibold">{p.label}</span>
                          <span className="text-neutral-600">{p.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
