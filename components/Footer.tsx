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
        // account for your nav height if needed
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
      {/* BG: deep green gradient + subtle pattern/watermark */}
      <div className="relative bg-[radial-gradient(120%_120%_at_20%_10%,#1a4f21_0%,#0b3215_55%,#08250f_100%)]">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ backgroundImage: "url(/Images/footer_pattern.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="mx-auto w-full max-w-[1450px] px-6 lg:px-10 py-12 lg:py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-white/90">
            {/* Left: partner + links */}
            <div className="lg:col-span-4">
              <div className="text-[#f3d567] text-sm tracking-wide mb-3">CHIEF MARKETING PARTNER</div>
              <div className="w-56 h-56 relative mb-6">
                <Image
                  src="/Images/partner_logo.webp" // replace with your logo
                  alt="Avighna Spaces"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <ul className="mt-4 space-y-4">
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

            {/* Divider */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="h-full w-px bg-white/15 mx-auto" />
            </div>

            {/* Middle: Contact */}
            <div className="lg:col-span-3">
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
                <div className="inline-block rounded-sm bg-gradient-to-r from-[#d5951b] via-[#f3cc57] to-[#f7e08c] px-4 py-3 text-[#0b2d15] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  Schedule your visit today and experience luxury living at 27 Pallazzo.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="h-full w-px bg-white/15 mx-auto" />
            </div>

            {/* Right: Address */}
            <div className="lg:col-span-3">
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

          {/* Huge watermark text (optional, like screenshot) */}
          <div className="select-none pointer-events-none text-[16vw] leading-none font-semibold text-white/5 text-center mt-10 tracking-[0.02em]">
            CHOTHANI
          </div>
        </div>

        {/* Bottom gold bar with left wedge + copyright */}
        <div className="w-full bg-[#b89345]">
          <div className="mx-auto w-full max-w-[1450px] relative">
            <div className="flex items-center justify-between px-6 lg:px-10 py-3">
              <div className="relative text-[#0e2b14] font-semibold">
                <div className="hidden sm:block absolute -left-6 top-0 h-full w-12 bg-[#d5c084] [clip-path:polygon(0_0,100%_0,67%_100%,0_100%)]" />
                <span className="relative z-10">{year} © Powered by Mantra Collab</span>
              </div>

              <div className="flex items-center gap-3">
                <a href="#" aria-label="facebook" className="opacity-90 hover:opacity-100 transition">
                  <Image src="/Images/fb.webp" alt="" width={24} height={24} />
                </a>
                <a href="#" aria-label="google" className="opacity-90 hover:opacity-100 transition">
                  <Image src="/Images/google.webp" alt="" width={24} height={24} className="bg-white rounded p-1" />
                </a>
                <a href="#" aria-label="instagram" className="opacity-90 hover:opacity-100 transition">
                  <Image src="/Images/insta.webp" alt="" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
