"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

const buttons = [
  {
    icon: <Phone size={24} />,
    text: "Call Now",
    href: "tel:+16479852077",
  },
  {
    icon: <WhatsAppIcon />,
    text: "Chat Now",
    href: "https://wa.me/+16479852077",
  },
  {
    icon: <Mail size={24} />,
    text: "Email Now",
    href: "mailto:vjwindowsanddoors@gmail.com",
  },
  
];
 
export default function ScrollActionButtons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 space-y-4 flex flex-col items-end">
      {buttons.map((btn, index) => (
        <div
          key={index}
          className="group cursor-pointer"
          onMouseEnter={() =>
            window.innerWidth >= 640 && setHoveredIndex(index)
          }
          onMouseLeave={() =>
            window.innerWidth >= 640 && setHoveredIndex(null)
          }
          onClick={() => {
            if (window.innerWidth < 640) {
              // Mobile toggle
              setHoveredIndex((prev) => (prev === index ? null : index));
            }
          }}
        >
          <div
            className={`flex items-center rounded-l-full text-black font-semibold shadow-md transition-all duration-300 bg-gradient-to-t from-[#353535] to-[#5E5E5E] hover:from-[#926C1A] hover:to-[#C5B066]
            ${hoveredIndex === index ? "w-40" : "w-11 md:w-14"} sm:${
              hoveredIndex === index ? "w-40" : "w-[3.7rem]"
            }`}
          >
            {/* Icon button */}
            <div
              className="w-11 h-11 sm:w-13 sm:h-13 flex justify-center items-center rounded-full bg-gradient-to-t from-[#B3B5B5] to-[#FDFDFD] text-black transition-transform p-4"
              style={{
                boxShadow: "4px 0 6px -1px rgba(0,0,0,0.3)",
              }}
            >
              <span
                className="transition-transform"
                style={{
                  animation:
                    hoveredIndex === index ? "rotateOnce 0.6s linear" : "none",
                }}
              >
                {btn.icon}
              </span>
            </div>
 
            {/* Text + link button (only when expanded) */}
            {hoveredIndex === index && (
              <a
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 mx-2 text-base truncate"
              >
                {btn.text}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="text-black"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0h-.14A11.89 11.89 0 0 0 0 11.94a11.8 11.8 0 0 0 1.64 6l-1.1 4a1 1 0 0 0 1.23 1.23l4-1.1a11.8 11.8 0 0 0 6 1.64h.14A11.89 11.89 0 0 0 24 11.93a11.87 11.87 0 0 0-3.48-8.45zM12 22a9.83 9.83 0 0 1-5.1-1.4l-.37-.22-3 .83.84-3-.23-.38a9.85 9.85 0 0 1-1.5-5.22 9.94 9.94 0 0 1 9.9-9.9h.12A9.91 9.91 0 0 1 22 11.93 9.94 9.94 0 0 1 12 22zm5.41-7.59c-.3-.15-1.76-.86-2.04-.95s-.48-.15-.68.15-.78.94-.95 1.13-.35.22-.64.07a8.14 8.14 0 0 1-2.4-1.48 8.83 8.83 0 0 1-1.63-2c-.17-.3 0-.46.13-.61s.3-.35.45-.52a2 2 0 0 0 .3-.5.55.55 0 0 0 0-.52c-.07-.15-.68-1.64-.94-2.25s-.5-.52-.68-.53h-.58a1.1 1.1 0 0 0-.8.37 3.35 3.35 0 0 0-1 2.47A5.87 5.87 0 0 0 9 15.53a9.64 9.64 0 0 0 5.76 2.07 5.73 5.73 0 0 0 2.36-.47 3.34 3.34 0 0 0 1.47-2.34c.1-.6-.05-.89-.35-1.03z" />
    </svg>
  );
}