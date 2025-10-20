// app/(components)/ConnectivityHighlights.tsx
"use client";

import Image from "next/image";

type Point = { label: string; value: string };
type Card = { title: string; iconSrc: string; points: Point[] };

const CARDS: Card[] = [
  {
    title: "Work",
    iconSrc: "/Images/work.png", // ← replace with your asset
    points: [
      { label: "BKC", value: "15 mins" },
      { label: "Fort", value: "20 mins" },
      { label: "Lower Parel", value: "30 mins" },
      { label: "SEEPZ", value: "40 mins" },
    ],
  },
  {
    title: "Travel",
    iconSrc: "/Images/travel.png", // ← replace with your asset
    points: [
      { label: "Chembur Station", value: "5 mins" },
      { label: "Monorail Station", value: "7 mins" },
      { label: "Lokmanya Tilak Terminus", value: "15 mins" },
      { label: "Domestic Airport", value: "30 mins" },
    ],
  },
  {
    title: "Healthcare",
    iconSrc: "/Images/healthcare.png", // ← replace with your asset
    points: [
      { label: "Tata Hospital", value: "10 mins" },
      { label: "Hinduja Hospital", value: "30 mins" },
      { label: "Asian Heart Institute", value: "20 mins" },
    ],
  },
];

export default function ConnectivityHighlights() {
  return (
    <section
      aria-labelledby="connectivity-heading"
      className="relative border-b border-black/10"
    >
      {/* top-half background image */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/Images/connectivity_highlihgtBG.webp)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-10">
          <h2
            id="connectivity-heading"
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            CONNECTIVITY HIGHLIGHTS
          </h2>
          <p className="mt-2 text-base sm:text-lg text-neutral-600">
            Enjoy seamless access to Mumbai’s prime destinations
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-amber-300/50"
            >
              <div className="p-6 sm:p-8">
                {/* icon */}
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={112}
                    height={112}
                    className="h-28 w-28 object-contain"
                    priority
                  />
                </div>

                {/* title */}
                <h3 className="text-center text-2xl font-semibold text-emerald-900">
                  {card.title}
                </h3>

                {/* list */}
                <ul className="mt-6 space-y-3">
                  {card.points.map((p) => (
                    <li
                      key={p.label}
                      className="flex items-start gap-3 text-neutral-800"
                    >
                      {/* green dot */}
                      <span className="mt-2 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-600" />
                      <div className="flex w-full justify-between gap-3">
                        <span className="font-semibold">{p.label}</span>
                        <span className="text-neutral-600">{p.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
