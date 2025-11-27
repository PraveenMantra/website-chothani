"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AlignLeft, X, Instagram, Facebook } from "lucide-react";
import { scrollToSection } from "@/utils/scrollToSection";

type NavItem = { name: string; href: string };

const NAV_HEIGHT = 69; // px

const NAV_ITEMS: NavItem[] = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT US", href: "#about-us" },
  { name: "HIGHLIGHTS", href: "#highlights" },
  { name: "AMENITIES", href: "#amenities" },
  { name: "LOCATION", href: "#location" },
  { name: "CONTACT US", href: "#contact-us" },
];

const INSTAGRAM_URL = "https://www.instagram.com/chothani.buildcorp/?igsh=MTI0a2JvY3hsM3V3dA%3D%3D#";
const FACEBOOK_URL = "https://www.facebook.com/share/1Be837Emat/";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="
        inline-grid place-items-center rounded-md
        transition-transform hover:scale-105 focus:scale-105
        outline-none focus:ring-2 focus:ring-white/60
      "
    >
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // ----- SCROLL-SPY STATE -----
  const [activeHash, setActiveHash] = useState<string>("#home");
  const SECTION_IDS = useMemo(
    () => NAV_ITEMS.map((i) => i.href.replace(/^#/, "")),
    []
  );

  // Smooth scroll with offset
  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") {
        scrollToHash(href);
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll to hash on first load if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/" && window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
  }, [pathname]);

  // ----- INTERSECTION OBSERVER (Scroll-Spy) -----
  useEffect(() => {
    if (pathname !== "/") return;

    const els = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHash(`#${visible.target.id}`);
        } else {
          const nearest = els.reduce(
            (best, el) => {
              const dist = Math.abs(el.getBoundingClientRect().top - NAV_HEIGHT);
              return dist < best.dist ? { id: el.id, dist } : best;
            },
            { id: activeHash.replace("#", ""), dist: Number.POSITIVE_INFINITY }
          );
          setActiveHash(`#${nearest.id}`);
        }
      },
      {
        root: null,
        // Slightly larger top offset on mobile to avoid early switching
        rootMargin: `-${NAV_HEIGHT + 10}px 0px -70% 0px`,
        threshold: [0, 0.15, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, SECTION_IDS.join(",")]);

  const isActive = (href: string) => pathname === "/" && activeHash === href;

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#0E3C14] border-b border-[#DEDFDF] backdrop-blur"
      style={{ height: NAV_HEIGHT }}
    >
      {/* Desktop */}
      <div className="hidden md:flex h-full items-center justify-between px-[9%]">
        <Link
          href="/"
          aria-label="Home"
          className="shrink-0 cursor-pointer"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              scrollToSection("home");
            }
          }}
        >
          <Image
            src="/Images/Chothani_Logo.png"
            alt="Chothani Logo"
            width={75}
            height={54}
            priority
            quality={100}
          />
        </Link>

        <nav>
          <ul className="flex items-center h-full gap-[1vw]">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  prefetch={false}
                  className={`relative px-[0.8vw] py-[0.4vw] text-[0.9vw] transition-all duration-300
                    ${isActive(item.href)
                      ? "bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519] text-black"
                      : "text-white"
                    }
                    hover:bg-gradient-to-b hover:from-[#E9A519] hover:via-[#F6DA76] hover:to-[#E9A519] hover:text-black
                  `}
                >
                  <span className="relative group">
                    {item.name}
                    <span className="absolute left-0 -bottom-[4px] w-0 h-[2px] bg-gradient-to-r from-[#E9A519] via-[#F6DA76] to-[#E9A519] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <SocialIcon href={INSTAGRAM_URL} label="Open Instagram">
           <Image
              src="/Images/insta_color.webp"
              alt="Google Map Location"
              width={50}
              height={50}
              className="w-11"
            />
          </SocialIcon>
          <SocialIcon href={FACEBOOK_URL} label="Open Facebook">
            <Image
              src="/Images/facebook_color.webp"
              alt="Google Map Location"
              width={50}
              height={50}
              className="w-11"
            />
          </SocialIcon>

          <Link
            href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/Images/map.png"
              alt="Google Map Location"
              width={50}
              height={50}
              className="w-11"
            />
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden h-full items-center justify-between px-4 relative">
        {/* Burger */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle menu"
          className="p-2 -ml-1 rounded-md active:scale-95 text-white"
        >
          <div className="relative w-6 h-6">
            <AlignLeft
              className={`absolute inset-0 w-6 h-6 transition-all ${isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100"
                }`}
            />
            <X
              className={`absolute inset-0 w-6 h-6 transition-all ${isOpen ? "opacity-100 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
            />
          </div>
        </button>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Home"
        >
          <Image
            src="/Images/Chothani_Logo.png"
            alt="Chothani Logo"
            width={75}
            height={54}
            priority
            quality={100}
          />
        </Link>

        {/* Map icon (fixed px, not vw) */}
        <Link
          href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 p-2 -mr-1"
          aria-label="Open Google Maps"
        >
          <Image
            src="/Images/map.png"
            alt="Google Map Location"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>

        {/* Overlay */}
        {/* <div
          className={`fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onClick={() => setIsOpen(false)}
        /> */}

        {/* Drawer */}
        <aside
          className={`
            fixed top-0 left-0 h-[100dvh] w-[86vw] max-w-[340px]
            bg-[#0E3C14] z-50 border-r-4 border-white/10
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col
            pt-[max(env(safe-area-inset-top),12px)]
          `}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 pb-3">
            <Link href="/" onClick={() => setIsOpen(false)} aria-label="Home">
              <Image
                src="/Images/Chothani_Logo.png"
                alt="Chothani Logo"
                width={75}
                height={54}
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded hover:bg-white/10 active:scale-95"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="h-px bg-white/50 mx-4" />

          {/* Scrollable nav list */}
          <nav className="px-2 py-2 overflow-y-auto overscroll-contain max-h-[calc(100dvh-180px)]">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      prefetch={false}
                      className={`
                        group flex items-center justify-between gap-2
                        px-4 py-3 rounded-lg font-semibold
                        transition-all duration-300
                        ${active
                          ? "text-black bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519] shadow-sm"
                          : "text-white hover:bg-gradient-to-b hover:from-[#E9A519] hover:via-[#F6DA76] hover:to-[#E9A519]"
                        }
                        relative
                      `}
                    >
                      {/* Left accent for active */}
                      <span
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r
                          ${active ? "bg-[#0E3C14]" : "bg-transparent group-hover:bg-[#0E3C14]"}
                          transition-all
                        `}
                      />
                      <span className="pl-1">{item.name}</span>
                      {/* <ChevronRight className="w-5 h-5 opacity-70 group-hover:translate-x-0.5 transition-transform" /> */}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer / Map CTA */}
          <div className="mt-auto px-4 pb-[max(env(safe-area-inset-bottom),14px)]">
            <div className="h-px bg-white/50 mb-3" />

            {/* Social icons row */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <SocialIcon href={INSTAGRAM_URL} label="Open Instagram">
                <Image
              src="/Images/insta_color.webp"
              alt="Google Map Location"
              width={18} height={18}
              // className="w-[23.33px] h-[23.33px]"
            />
              </SocialIcon>
              <SocialIcon href={FACEBOOK_URL} label="Open Facebook">
                <Image
              src="/Images/facebook_color.webp"
              alt="Google Map Location"
              width={18} height={18}
              // className="w-[23.33px] h-[23.33px]"
            />
              </SocialIcon>
            </div>

            {/* Map CTA */}
            <Link
              href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg
               bg-[linear-gradient(90deg,rgba(199,112,3,1)0%,rgba(254,235,146,1)69%,rgba(255,232,69,1)100%)]
               text-[#0c0000] font-semibold active:scale-[0.99]"
            >
              <Image src="/Images/map.png" alt="Google Map" width={18} height={18} />
              View Location
            </Link>
          </div>

        </aside>
      </div>
    </header >
  );
}
