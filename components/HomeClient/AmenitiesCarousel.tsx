// app/(components)/AmenitiesCarousel.tsx
"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes

type CardItem = { id: string; title: string; image: string };
type TabKey = "floorPlans" | "amenities" | "elevation";

const BUILDING_IMG = "/Images/building.png"; // replace with your asset

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

export default function AmenitiesCarousel() {
  const [tab, setTab] = useState<TabKey>("amenities");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => DATA[tab], [tab]);

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

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#10410f]">
            AMENITIES AT 27 PALAZZO
          </h2>
        </header>

        {/* Tabs */}
        <div className="mt-8 flex justify-center gap-4">
          <TabButton active={tab === "floorPlans"} onClick={() => setTab("floorPlans")}>
            FLOOR PLANS
          </TabButton>
          <TabButton active={tab === "amenities"} onClick={() => setTab("amenities")}>
            AMENITIES
          </TabButton>
          <TabButton active={tab === "elevation"} onClick={() => setTab("elevation")}>
            ELEVATION
          </TabButton>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <button
            aria-label="Previous"
            onClick={() => scrollByCards(-1)}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-4 rounded-md shadow",
              "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white",
              "hover:opacity-90 focus:ring-2 focus:ring-amber-400"
            )}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByCards(1)}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-4 rounded-md shadow",
              "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white",
              "hover:opacity-90 focus:ring-2 focus:ring-amber-400"
            )}
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            className={cn(
              "grid grid-flow-col auto-cols-[85%] gap-6 md:auto-cols-[calc((100%-2rem)/3)]",
              "overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 pb-2",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            )}
          >
            {items.map((item) => (
              <Card key={item.id} title={item.title} image={item.image} />
            ))}
          </div>
        </div>
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
        "min-w-40 px-6 py-3 font-semibold tracking-wide text-sm rounded-md transition-all duration-200",
        "bg-neutral-500 text-white",
        "hover:bg-gradient-to-b hover:from-[#F0B12B] hover:to-[#B47009] hover:text-white",
        active &&
          "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white shadow-md scale-[1.02]"
      )}
    >
      {children}
    </Button>
  );
}

/* ---------------- Card Component ---------------- */

function Card({ title, image }: { title: string; image: string }) {
  return (
    <div
      data-card="true"
      className="snap-start rounded-2xl bg-white ring-1 ring-amber-400/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 30vw, 85vw"
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="rounded-md px-4 py-2 text-sm font-bold text-black shadow-md bg-gradient-to-b from-[#F0B12B] to-[#B47009]">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
