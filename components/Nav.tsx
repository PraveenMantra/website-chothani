"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AlignLeft, X } from "lucide-react";

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

    // Trigger when a section is under the nav and at least ~20% visible.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with greatest intersectionRatio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveHash(`#${visible.target.id}`);
        } else {
          // Fallback: if none intersect (fast scroll), find the section closest to top
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
        // Top margin = offset for sticky nav; bottom negative margin stops late switching
        rootMargin: `-${NAV_HEIGHT + 6}px 0px -70% 0px`,
        threshold: [0, 0.15, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, SECTION_IDS.join(",")]);

  const isActive = (href: string) => pathname === "/" && activeHash === href;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#0E3C14] border-b border-[#DEDFDF] backdrop-blur"
      style={{ height: NAV_HEIGHT }}
    >
      {/* Desktop */}
      <div className="hidden md:flex h-full items-center justify-between px-[9%]">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Image src="/Images/Chothani_Logo.png" alt="Chothani Logo" width={75} height={54} priority />
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
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <Image src="/Images/map.png" alt="Google Map Location" width={32} height={32} className="w-[1.7vw] h-auto" />
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden h-full items-center justify-between px-4 relative">
        <button onClick={() => setIsOpen((p) => !p)} aria-label="Toggle menu" className="p-2 text-white">
          <div className="relative w-6 h-6">
            <AlignLeft className={`absolute inset-0 w-6 h-6 transition-all ${isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100"}`} />
            <X className={`absolute inset-0 w-6 h-6 transition-all ${isOpen ? "opacity-100 scale-100" : "opacity-0 -rotate-90 scale-0"}`} />
          </div>
        </button>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Home">
          <Image src="/Images/Chothani_Logo.png" alt="Chothani Logo" width={75} height={54} priority />
        </Link>

        <Link
          href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <Image src="/Images/map.png" alt="Google Map Location" width={32} height={32} className="w-[1.7vw] h-auto" />
        </Link>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-[280px] bg-[#B7A887] z-50 border-r-4 border-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image src="/Images/Chothani_Logo.png" alt="Chothani Logo" width={75} height={54} priority />
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 hover:bg-black/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    prefetch={false}
                    className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${isActive(item.href)
                      ? "bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519] text-black"
                      : "text-black hover:bg-gradient-to-b hover:from-[#E9A519] hover:via-[#F6DA76] hover:to-[#E9A519] hover:text-black"
                      }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <Link
              href="https://maps.google.com/?q=72+Union+Park,+Trilok+Kapoor+Marg,+Chembur+East,+Mumbai+400071"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image src="/Images/map.png" alt="Google Map Location" width={32} height={32} className="w-[1.7vw] h-auto" />
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
