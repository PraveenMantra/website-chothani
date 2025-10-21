// app/(components)/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PhoneCall, MapPin, Mail } from "lucide-react";

interface FooterLink { name: string; href: string }
const footerLinks: FooterLink[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "#about-us" },
  { name: "HIGHLIGHTS", href: "#highlights" },
  { name: "AMENITIES", href: "#amenities" },
  { name: "LOCATION", href: "#location" },
  { name: "CONTACT US", href: "#contact-us" },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (pathname === "/") {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 0;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/footer_mainBg.webp')" }}
      >
        {/* Optional subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "url('/Images/footer_pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />

        {/* Main row: 4 columns (no extra divider columns) */}
        <div className="relative mx-auto w-full max-w-[1565px] px-6 lg:px-10 pt-10 lg:pt-14 pb-0 text-white/90">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Col 1: Partner */}
            <div>
              <div className="text-[#f3d567] text-[20px] tracking-wide mb-3  ">
                CHIEF MARKETING PARTNER
              </div>
              <div className="relative w-[185px] h-[185px] flex justify-center items-center">
                <Image
                  src="/Images/footer_logo_avigna.png"
                  alt="Avighna Spaces"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Col 2: Menu (with left divider on desktop) */}
            <div className="lg:border-l lg:border-white/15 lg:pl-10">
              <ul className="mt-1 space-y-4">
                {footerLinks.map((l) => (
                  <li key={l.name} className="flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-b from-[#F0B12B] to-[#B47009]" />
                    <Link
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="text-white/90 hover:text-white transition"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact (with left divider) */}
            <div className="lg:border-l lg:border-white/15 lg:pl-10">
              <h3 className="text-white font-semibold text-2xl">Contact Us</h3>

              <div className="mt-6 flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f0b12b] text-[#0a2a14]">
                  <PhoneCall className="size-4" />
                </span>
                <a href="tel:+918828607952" className="hover:underline">
                  +91 88286 07952
                </a>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f0b12b] text-[#0a2a14]">
                  <Mail className="size-4" />
                </span>
                <a href="mailto:contactus@avighnaspaces.com" className="hover:underline">
                  contactus@avighnaspaces.com
                </a>
              </div>

              {/* Yellow CTA */}
              <div className="mt-6">
                <div className="inline-block bg-gradient-to-r from-[#d5951b] via-[#f3cc57] to-[#f7e08c] px-4 py-3 text-[#0b2d15] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  Schedule your visit today and experience luxury living at 27 Pallazzo.
                </div>
              </div>
            </div>

            {/* Col 4: Address (with left divider) */}
            <div className="lg:border-l lg:border-white/15 lg:pl-10">
              <h3 className="text-white font-semibold text-2xl">Address</h3>
              <div className="mt-6 flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f0b12b] text-[#0a2a14]">
                  <MapPin className="size-4" />
                </span>
                <p className="text-white/90">
                  Office No 204, 2nd Floor, Ujagar Chamber, Near Deonar Bus Depot, Deonar, Mumbai - 88
                </p>
              </div>
            </div>
          </div>

          {/* Watermark text */}
          <div className="select-none pointer-events-none text-[11vw] leading-none font-normal text-white/5 text-center mt-10 tracking-[0.02em] felix">
            CHOTHANI
          </div>
        </div>

        {/* Bottom gold bar + clipped polygon copyright */}
        <div className="w-full bg-[#b7a04a]">
          <div className="relative w-full">
            <div className="flex items-center justify-between py-3">
              <div className="relative font-semibold text-white">
                <span
                  className="relative z-10 inline-block bg-[#033401] text-white font-semibold py-2 shadow-sm [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]"
                  style={{
                    width: "426px",
                    display: "block",
                    paddingLeft: "67px",
                    paddingRight: "16px",
                    fontSize: "14px",
                  }}
                >
                  {year} © Powered by Mantra Collab
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
