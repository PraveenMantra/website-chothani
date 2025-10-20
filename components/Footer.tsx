"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, PhoneCall, MapPin, Mail } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}
const footerLinks: FooterLink[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "#about-us" },
  { name: "SERVICES", href: "#services" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CONTACT US", href: "#contact-us" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      if (pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          const desktopNav = document.querySelector(".md\\:flex.hidden") as HTMLElement;
          const mobileNav = document.querySelector(".md\\:hidden.flex") as HTMLElement;
          let navHeight = 0;

          if (window.innerWidth < 768 && mobileNav) {
            navHeight = mobileNav.clientHeight;
          } else if (desktopNav) {
            navHeight = desktopNav.clientHeight;
          }
          
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }

  };

  return (
    <div className="bg-[url(/images/footer_bg.webp)] bg-cover bg-center relative bg-no-repeat">
      {/* <img
        src="/images/footer_bg.webp"
        alt="Background"
        className="bg-no-repeat bg-center object-cover object-center
       h-full w-full absolute inset-0 z-[-1]"
      /> */}
      <div className="px-[10%]">
        <div className="w-full flex flex-col md:flex-row justify-between border-t-2 md:border-t-[0.5vw] border-[#33363E]">
          <div className="w-full md:w-[24%] mt-10 md:mt-[4vw] mx-auto md:mx-0">
            <img
              src="/images/footer_logo.webp"
              alt="Logo"
              className="mx-auto md:mx-0 w-full"
              // style={{ filter: 'brightness(0)' }}
            />
          </div>

          <div className="w-full md:w-[42%] mt-6 md:mt-[4vw] flex flex-col md:flex-row justify-between mx-auto md:mx-0">
            {/* Quick Links */}
            <div>
              <h1 className="font-semibold text-xl md:text-[1.7vw] mt-4 lg:mt-0 text-black text-center md:text-left">
                SERVICES
              </h1>
              <ul className="md:list-[square] marker:text-white/50 list-inside flex items-center md:items-start flex-col mt-1 md:mt-[1vw]">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="relative z-10 text-black lg:text-[0.9vw] py-[0.3vw] rounded-full transition-all duration-300 whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-px bg-black/10 h-full" />

            {/* Contact us */}
            <div className=" text-black text-center md:text-left flex flex-col">
              <div>
                <h1 className="font-semibold text-xl md:text-[1.7vw] mt-7 lg:mt-0">
                  CONTACT US
                </h1>

                {/* Location */}
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-[1vw] mb-2 md:mb-0">
                  <MapPin className="text-white size-5 md:size-[1.1vw]" />
                  <a
                    href="https://g.page/r/CXibC79TJXZdEBE/review"
                    className="lg:text-[0.9vw]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Serving: Southern Ontario
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-[1vw] mb-2 md:mb-0">
                  <PhoneCall className="text-white size-5 md:size-[1.1vw]" />
                  <a
                    href="tel:+16479852077"
                    className="lg:text-[0.9vw]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +1 647-985-2077
                  </a>
                </div>

                {/* Mail */}
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-[1vw] mb-2 md:mb-0">
                  <Mail className="text-white size-5 md:size-[1.1vw]" />
                  <a
                    href="mailto:vjwindowsanddoors@gmail.com"
                    className="lg:text-[0.9vw]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    vjwindowsanddoors@gmail.com
                  </a>
                </div>

                {/* Domain */}
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-[1vw] mb-2 md:mb-0">
                  <Globe className="text-white size-5 md:size-[1.1vw]" />
                  <a
                    href="https://vjwindowsanddoors.ca/"
                    className="lg:text-[0.9vw]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    vjwindowsanddoors.ca
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="text-[7vw] leading-[0.8] text-white/10 font-bold whitespace-nowrap text-center mt-5 overflow-hidden">
          VJ WINDOW & DOORS
        </div>
      </div>

      <div className="w-full px-[10%] flex flex-col-reverse md:flex-row gap-4 md:gap-0 justify-between bg-[#32363E] py-4 md:py-[0.5vw]">
        <div className="relative text-black p-1 sm:px-6 w-full sm:w-[35%] bg-[#D8D7D5] sm:[clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)] mx-auto sm:mx-0 text-center md:text-left">
          <a
            href="https://mantracollab.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-block font-semibold text-sm sm:text-[1.3vw] text-center transition-all duration-300  hover:scale-105 py-1 md:py-[0.4vw]">
              {currentYear} © Powered by Mantra Collab
            </span>
          </a>
        </div>

        {/* sm link */}
        <div className="flex gap-3 md:gap-1.5 justify-center md:justify-end items-center">
          <a
            href="https://www.facebook.com/share/1BfV9cpa7R/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/fb.webp"
              alt="Facebook"
              className="w-8 lg:w-[1.7vw] hover:scale-117 transition-all duration-300"
            />
          </a>
            <a
            href="https://g.page/r/CXibC79TJXZdEBE/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/google.webp"
              alt="Facebook"
              className="w-8 lg:w-[1.7vw] hover:scale-117 transition-all duration-300 bg-white p-1 md:p-[0.3vw] rounded"
            />
          </a>

          <a
            href="https://www.instagram.com/vjwindows_doors?igsh=MW96ZG1laWdpaGFsdw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/insta.webp"
              alt="Instagram"
              className="w-8 lg:w-[1.7vw] hover:scale-117 transition-all duration-300"
            />
          </a>
          
        </div>
      </div>
    </div>
  );
}
