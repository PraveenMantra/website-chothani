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
      <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, lines }, i) => (
            <StatTile key={i} value={value} lines={lines} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatTile({ value, lines }: { value: string; lines: [string, string?] }) {
  return (
    // OUTER: very light grey tile with large radius and soft inset look
    <article className="rounded-[26px] bg-[#ececec] p-[10px]">
      {/* INNER BORDER: 1.5px golden gradient border with matching radius */}
      <div className="rounded-[22px] p-[1.5px] bg-[linear-gradient(180deg,#f7d465_0%,#e6b83d_40%,#b87410_100%)]">
        {/* CONTENT: white card */}
        <div className="rounded-[20px] bg-white h-full flex flex-col items-center justify-center text-center px-6 py-12 md:py-14">
          {/* VALUE — gold gradient text, very large, tight tracking */}
          <div className="bg-gradient-to-b from-[#F7CB54] to-[#B47009] bg-clip-text text-transparent font-extrabold leading-[0.9] tracking-tight
                          text-[64px] md:text-[76px] lg:text-[84px]">
            {value}
          </div>

          {/* CAPTION — deep green, two lines, uppercase, heavier weight, compact leading */}
          <div className="mt-9 text-[#0f4110] font-extrabold uppercase leading-[1.1] tracking-wide text-[20px] md:text-[22px]">
            <div>{lines[0]}</div>
            {lines[1] && <div>{lines[1]}</div>}
          </div>
        </div>
      </div>
    </article>
  );
}
