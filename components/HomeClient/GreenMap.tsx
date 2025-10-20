"use client";

import Image from "next/image";

const HIGHLIGHTS = [
  "Spacious 3 BHK layouts with 1500 sq. ft. carpet area",
  "Premium fittings & modern design",
  "Earthquake resistant structure",
  "Multiple podium parking levels",
  "Designer common areas & double-height lobby",
  "Multi-purpose terrace for leisure & gatherings",
];

export default function GreenMap() {
  return (
    <section id="highlights" className="greenMap">
      {/* same container width as nav */}
      <div className="relative z-10 max-w-[1564px] mx-auto px-4 py-12 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Title + bullets */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold
                           bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519]
                           bg-clip-text text-transparent drop-shadow">
              PROJECT HIGHLIGHTS
            </h2>

            <ul className="mt-6 space-y-4">
              {HIGHLIGHTS.map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] leading-7">
                  <span
                    className="mt-2 inline-block size-2.5 rounded-full
                               bg-[#E9A519] shadow-[0_0_0_3px_rgba(233,165,25,0.25)]"
                    aria-hidden
                  />
                  <span className="text-white/95">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Building visual */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[420px] lg:h-[520px]">
              <Image
                src="/Images/map_building_logo.png"
                alt="Project location & skyline"
                fill
                className="object-contain object-bottom select-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
