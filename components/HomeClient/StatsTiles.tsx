// app/(components)/StatsTiles.tsx
import React from "react";

type Stat = { value: string; lines: [string, string?] };

const STATS: Stat[] = [
  { value: "7+", lines: ["YEARS OF", "LEGACY"] },
  { value: "350+", lines: ["JOIN TEAM", "STRENGTH"] },
  { value: "6,500", lines: ["HOMES", "DELIVERED"] },
  { value: "3,200", lines: ["HOMES UNDER", "CONSTRUCTION"] },
];

export default function StatsTiles() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1450px] px-0 [@media(max-width:1479px)]:px-8 [@media(max-width:1200px)]:px-6 py-10">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {STATS.map(({ value, lines }, i) => (
            <li key={i}>
              <StatTile value={value} lines={lines} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatTile({ value, lines }: { value: string; lines: [string, string?] }) {
  return (
    <article
      className="rounded-[26px] bg-[#ececec] p-[10px]"
      aria-label={`${value} ${lines.join(" ")}`}
    >
      {/* Gradient border */}
      <div className="rounded-[22px] p-[1.5px] bg-[linear-gradient(180deg,#f7d465_0%,#e6b83d_40%,#b87410_100%)]">
        {/* Card */}
        <div className="rounded-[20px] bg-white h-full flex flex-col items-center justify-center text-center
                        px-5 sm:px-6 py-10 sm:py-12 md:py-14 min-h-[260px]">
          {/* Value */}
          <div
            className="bg-gradient-to-b from-[#F7CB54] to-[#B47009] bg-clip-text text-transparent font-bold leading-[0.9] tracking-tight"
            style={{
              // fluid: min 42px, scales with viewport, caps at 84px
              fontSize: "clamp(42px, 8vw, 84px)",
            }}
          >
            {value}
          </div>

          {/* Caption */}
          <div className="mt-9 text-[#0c3807] font-semibold uppercase leading-[1.1] tracking-wide
                          text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px]">
            <div>{lines[0]}</div>
            {lines[1] && <div>{lines[1]}</div>}
          </div>
        </div>
      </div>
    </article>
  );
}
