"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------ Data ------------------ */
type CardItem = { id: string; title: string; image: string };
type TabKey = "floorPlans" | "amenities" | "elevation";

const BUILDING_IMG = "/Images/building.png"; // replace with your actual image

const DATA: Record<TabKey, CardItem[]> = {
  floorPlans: [
    { id: "fp-1", title: "2 BHK – Type A", image: BUILDING_IMG },
    { id: "fp-2", title: "2 BHK – Type B", image: BUILDING_IMG },
    { id: "fp-3", title: "3 BHK – Type A", image: BUILDING_IMG },
  ],
  amenities: [
    { id: "am-1", title: "Double-Height Building Lobby", image: BUILDING_IMG },
    { id: "am-2", title: "Fitness Centre", image: BUILDING_IMG },
    { id: "am-3", title: "Sky Garden", image: BUILDING_IMG },
    { id: "am-4", title: "Indoor Games", image: BUILDING_IMG },
    { id: "am-5", title: "Kids’ Play Zone", image: BUILDING_IMG },
  ],
  elevation: [
    { id: "el-1", title: "Front Elevation", image: BUILDING_IMG },
    { id: "el-2", title: "Side Elevation", image: BUILDING_IMG },
    { id: "el-3", title: "Rear Elevation", image: BUILDING_IMG },
  ],
};

/* ------------------ Animations ------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* ------------------ Component ------------------ */
export default function AmenitiesCarousel() {
  const [tab, setTab] = useState<TabKey>("amenities");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => DATA[tab], [tab]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card='true']");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const visible = Math.max(1, Math.round(el.clientWidth / (card.clientWidth + gap)));
    const delta = dir * visible * (card.clientWidth + gap);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  /* ------------------ Autoplay Scroll ------------------ */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let scrollAmount = 0.5; // subtle smooth movement
    let frameId: number;

    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += scrollAmount;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, tab]);

  return (
    <section id="amenities" className="bg-white relative overflow-hidden">
      {/* container: fluid on mobile, capped at 1542px */}
      <div className="mx-auto w-full max-w-[1542px] px-3 sm:px-4">
        <motion.div
          className="mx-auto w-full max-w-[1400px] px-0 py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          {/* Heading */}
          <motion.header className="text-center" variants={fadeUp}>
            <h2 className="font-semibold text-[#10410f] tracking-tight"
              style={{ fontSize: "clamp(22px, 3.2vw, 38px)" }}>
              AMENITIES AT 27 PALAZZO
            </h2>
          </motion.header>

          {/* Tabs */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <TabButton active={tab === "floorPlans"} onClick={() => setTab("floorPlans")}>
              FLOOR PLANS
            </TabButton>
            <TabButton active={tab === "amenities"} onClick={() => setTab("amenities")}>
              AMENITIES
            </TabButton>
            <TabButton active={tab === "elevation"} onClick={() => setTab("elevation")}>
              ELEVATION
            </TabButton>
          </motion.div>

          {/* Carousel */}
          <motion.div
            className="relative mt-8 sm:mt-12 lg:mt-16"
            variants={fadeUp}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Nav buttons – smaller on phones, pulled outward on large screens */}
            <button
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className={cn(
                "absolute left-2 sm:left-1 top-1/2 -translate-y-1/2 z-10 md:-left-6 lg:-left-16",
                "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-[6px] text-white text-xl sm:text-2xl",
                "bg-[linear-gradient(180deg,#e2a22b_0%,#f1c35a_60%,#e09a1e_100%)]",
                "shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:brightness-[1.02] active:scale-95",
                "flex items-center justify-center"
              )}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className={cn(
                "absolute right-2 sm:right-1 top-1/2 -translate-y-1/2 z-10 md:-right-6 lg:-right-16",
                "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-[6px] text-white text-xl sm:text-2xl",
                "bg-[linear-gradient(180deg,#e2a22b_0%,#f1c35a_60%,#e09a1e_100%)]",
                "shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:brightness-[1.02] active:scale-95",
                "flex items-center justify-center"
              )}
            >
              ›
            </button>

            {/* Viewport */}
            <div className="overflow-hidden">
              {/* Scroller */}
              <div
                ref={scrollerRef}
                className={cn(
                  "grid grid-flow-col overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2",
                  // hide scrollbar
                  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
                  // responsive gaps
                  "gap-4 sm:gap-6 lg:gap-8",
                  // responsive column widths:
                  // phones ≈ 90% (1-up), small tablets 70–75% (peek), md ~55% (2-up peek), lg = exact 3-up
                  "auto-cols-[90%] xs:auto-cols-[85%] sm:auto-cols-[72%] md:auto-cols-[55%] lg:auto-cols-[calc((100%-64px)/3)]"
                )}
                style={{ scrollPaddingInline: "0px" }}
              >
                {items.map((item) => (
                  <Card key={item.id} title={item.title} image={item.image} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}

/* ---------------- Tab Button ---------------- */
function TabButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      className={cn(
        "min-w-[150px] px-6 py-3 font-semibold tracking-wide text-sm rounded-[8px] transition-all duration-300",
        "bg-neutral-500 text-white ring-1 ring-black/10",
        "hover:bg-gradient-to-b hover:from-[#F0B12B] hover:to-[#B47009] hover:text-white cursor-pointer",
        active &&
        "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white shadow-md scale-[1.03]"
      )}
    >
      {children}
    </Button>
  );
}

/* -------------- Card -------------- */
function Card({ title, image }: { title: string; image: string }) {
  return (
    <motion.article
      data-card="true"
      className="
        snap-start w-full mx-auto
        max-w-[440px] lg:max-w-none
        h-[492px]
        rounded-[18px] bg-white p-[14px]
        shadow-[0_10px_28px_rgba(0,0,0,0.10)]
        border-[1px] border-[#a18050]
        group
      "
    >
      <div
        className="
          rounded-[14px] p-[2px] h-full
          bg-[linear-gradient(180deg,#f6d36a_0%,#e5b642_45%,#b67410_100%)]
        "
      >
        {/* Inner white container */}
        <div className="rounded-[12px] bg-white overflow-hidden h-full flex flex-col">
          {/* ✅ Image area — no border, no outline, no ring */}
          <div className="relative w-full flex-1 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, 85vw"
              className="
                object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
              priority
            />

            {/* Title overlay pinned at bottom of image */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
              <div
                className="
                  w-full max-w-[88%]
                  rounded-[10px]
                  text-center text-[18px] font-bold text-black
                  px-4 py-2
                  shadow-[0_6px_18px_rgba(0,0,0,0.15)] cursor-pointer
                "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(232,129,4,1) 0%, rgba(244,209,112,1) 50%, rgba(232,129,4,1) 100%)",
                }}
              >
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}



