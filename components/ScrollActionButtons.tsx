"use client";
import { useState } from "react";
import Image from "next/image";

/* Per-button styling to match the screenshot */
const buttons = [
  {
    icon: "/Images/call_chothani.png",
    text: "Call Now",
    href: "tel:+16479852077",
    barGradient:
      "linear-gradient(180deg,rgba(251, 230, 80, 1) 0%, rgba(201, 140, 8, 1) 100%)",
    barShadow: "0 8px 18px rgba(201,133,0,0.35)",
    textColor: "#000000",
    iconShadow: "0 8px 16px rgba(201,133,0,0.28)",
  },
  {
    icon: "/Images/email_chothani.png",
    text: "Email Now",
    href: "mailto:vjwindowsanddoors@gmail.com",
    barGradient:
      "linear-gradient(180deg,rgba(15, 159, 42, 1) 0%, rgba(4, 84, 27, 1) 100%)",
    barShadow: "0 8px 18px rgba(7,119,28,0.35)",
    textColor: "#000000",
    iconShadow: "0 8px 16px rgba(7,119,28,0.28)",
  },
  {
    icon: "/Images/whatsapp.png",
    text: "Chat Now",
    href: "https://wa.me/+16479852077",
    barGradient:
      "linear-gradient(180deg,rgba(251, 230, 80, 1) 0%, rgba(201, 140, 8, 1) 100%)",
    barShadow: "0 8px 18px rgba(201,133,0,0.35)",
    textColor: "#000000",
    iconShadow: "0 8px 16px rgba(201,133,0,0.28)",
  },
];

export default function ScrollActionButtons() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="fixed right-0 md:right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end space-y-3">
      {buttons.map((btn, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className="group relative"
            onMouseEnter={() => window.innerWidth >= 768 && setOpenIndex(i)}
            onMouseLeave={() => window.innerWidth >= 768 && setOpenIndex(null)}
            onClick={() => {
              if (window.innerWidth < 768) {
                setOpenIndex((p) => (p === i ? null : i));
              }
            }}
          >
            {/* Bar */}
            <div
              className={[
                "flex items-center",
                "transition-all duration-300 ease-out will-change-[width,transform]",
                "shadow-md relative",
                "pr-2 pl-[52px] sm:pr-3 sm:pl-[64px]", // smaller padding on mobile
                "h-[46px] sm:h-[46px]", // reduced height on mobile
                "hover:scale-[1.02]",
                "rounded-l-2xl", // only left rounded
                isOpen
                  ? "w-[170px] sm:w-[220px]" // smaller width on mobile
                  : "w-[58px] sm:w-[72px]",  // compact icon-only width on mobile
              ].join(" ")}
              style={{
                background: btn.barGradient,
                boxShadow: btn.barShadow,
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              {/* Text */}
              <a
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "block whitespace-nowrap font-semibold tracking-wide",
                  "transition-opacity duration-200 font-medium text-[13px] sm:text-[15px]",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                ].join(" ")}
                style={{ color: btn.textColor }}
              >
                {btn.text}
              </a>

              {/* Gloss Effect */}
              <span className="pointer-events-none absolute inset-0 rounded-l-2xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.35)]" />
            </div>



            {/* Icon tile */}
            <div
              className={[
                "absolute top-[23px] -translate-y-1/2 left-2",         // ← slightly peeking out
                "w-[34px] h-[34px]  rounded-[12px] grid place-items-center", // ← outer 56
                "transition-transform duration-300",
                "bg-[linear-gradient(180deg,#ffffff_0%,#f2f2f2_100%)]",
              ].join(" ")}
              style={{ boxShadow: btn.iconShadow }}
            >
              <div className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] md:w-[36px] md:h-[36px] rounded-[10px] grid place-items-center bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                <Image
                  src={btn.icon}
                  alt={btn.text}
                  width={24}
                  height={24}
                     className="
      object-contain
      w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]
      transition-transform duration-300 ease-out
      group-hover:scale-[1.1]
    "
                />
              </div>
            </div>

          </div>
        );
      })}

      {/* Keyframes */}
      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0.85) rotate(-6deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.06) rotate(1deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
