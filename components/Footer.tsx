// app/(components)/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";

interface FooterLink {
  name: string;
  href: string;
}
const footerLinks: FooterLink[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "#about-us" },
  { name: "HIGHLIGHTS", href: "#highlights" },
  { name: "AMENITIES", href: "#amenities" },
  { name: "LOCATION", href: "#location" },
  { name: "CONTACT US", href: "#contact-us" },
];

/* ── Animations ────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerList: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.08 },
  },
};

const slideInWedge: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
/* ─────────────────────────────────────────────────────── */

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
        {/* Optional overlay pattern */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "url('/Images/footer_pattern.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />

        {/* Main container */}
        <motion.div
          className="relative mx-auto w-full max-w-[1620px] px-6 lg:px-10 pt-10 lg:pt-14 pb-0 text-white/90"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-14">
            {/* Partner Section */}
            <motion.div className="w-full lg:w-[25%]" variants={fadeUp}>
              <div className="text-[#f3d567] text-[20px] tracking-wide mb-3 text-center">
                CHIEF MARKETING PARTNER
              </div>
              <div className="relative w-[185px] h-[185px] flex justify-center items-center mx-auto">
                <Image
                  src="/Images/footer_logo_avigna.png"
                  alt="Avighna Spaces"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Menu Section (staggered items) */}
            <motion.div className="w-full lg:w-[12%]" variants={fadeUp}>
              <motion.ul className="mt-1 space-y-4" variants={staggerList}>
                {footerLinks.map((l) => (
                  <motion.li key={l.name} variants={fadeIn} className="flex items-center gap-3 group">
                    <span className="inline-block h-3 w-3 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#F0B12B] group-hover:to-[#B47009]" />
                    <Link
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="relative text-[16px] font-medium text-white/80 transition-all duration-300
                                 hover:bg-gradient-to-b hover:from-[#F0B12B] hover:to-[#B47009]
                                 hover:bg-clip-text hover:text-transparent"
                    >
                      {l.name}
                      <span className="absolute bottom-[-4px] left-0 h-[2px] w-0 bg-gradient-to-r from-[#F0B12B] to-[#B47009] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div className="w-full lg:w-[30%] lg:border-l lg:border-white/15 lg:pl-10" variants={fadeUp}>
              <h3 className="text-white font-semibold text-2xl mb-6">Contact Us</h3>
              <div className="flex items-start gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <Image src="/Images/call.png" alt="Call" width={32} height={32} className="object-contain w-full h-full" />
                </span>
                <a href="tel:+918828607952" className="hover:underline">
                  +91 88286 07952
                </a>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <Image src="/Images/mail.png" alt="Mail" width={32} height={32} className="object-contain w-full h-full" />
                </span>
                <a href="mailto:contactus@avighnaspaces.com" className="hover:underline">
                  contactus@avighnaspaces.com
                </a>
              </div>
              <div>
                <div
                  className="inline-block text-[#0c0000] font-semibold px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                  style={{
                    background:
                      "linear-gradient(90deg,rgba(199, 112, 3, 1) 0%, rgba(254, 235, 146, 1) 69%, rgba(255, 232, 69, 1) 100%)",
                  }}
                >
                  Schedule your visit today and experience luxury living at 27 Pallazzo.
                </div>
              </div>
            </motion.div>

            {/* Address Section */}
            <motion.div className="w-full lg:w-[33%] lg:border-l lg:border-white/15 lg:pl-10" variants={fadeUp}>
              <h3 className="text-white font-semibold text-2xl mb-6">Address</h3>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <Image src="/Images/address.png" alt="Map Pin" width={32} height={32} className="object-contain w-full h-full" />
                </span>
                <p className="text-white/90 leading-relaxed">
                  Office No 204, 2nd Floor, Ujagar Chamber, Near Deonar Bus Depot, Deonar, Mumbai - 88
                </p>
              </div>
            </motion.div>
          </div>

          {/* Watermark Text */}
          <motion.div
            className="select-none pointer-events-none text-[11vw] leading-none font-normal text-white/5 text-center mt-10 tracking-[0.02em] felix"
            variants={fadeIn}
          >
            CHOTHANI
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="w-full bg-[#b7a04a]">
          <div className="relative w-full">
            <div className="flex items-center justify-between py-3">
              <motion.div
                className="relative font-semibold text-white"
                variants={slideInWedge}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <a
                  href="https://mantracollab.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  aria-label="Powered by Mantra Collab"
                >
                  <span
                    className="relative z-10 inline-block text-white font-semibold py-2 shadow-sm overflow-hidden [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]"
                    style={{
                      width: "426px",
                      display: "block",
                      paddingLeft: "67px",
                      paddingRight: "16px",
                      fontSize: "14px",
                      background:
                        "linear-gradient(90deg, rgba(51, 89, 33, 1) 0%, rgba(3, 52, 1, 1) 50%, rgba(51, 89, 33, 1) 100%)",
                      position: "relative",
                    }}
                  >
                    {/* Animated gold shimmer overlay */}
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(110deg, rgba(240,177,43,0) 0%, rgba(240,177,43,0.6) 40%, rgba(240,177,43,0) 80%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s linear infinite",
                      }}
                    />
                    <span className="relative z-10">{year} © Powered by Mantra Collab</span>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    </footer>
  );
}
