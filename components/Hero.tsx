"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// simple reusable variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative hero">
        {/* ===== Top: CTA Card ===== */}
        <motion.div
          className="relative z-20 max-w-[1464px] mx-auto px-4 sm:px-6 lg:px-8 hero-top-section"
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            paddingTop: "calc(var(--spacing) * 82)",
          }}
          id="home"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start">
            {/* LEFT: CTA CARD */}
            <motion.div className="lg:col-span-5" variants={fadeUp}>
              <div className="w-full max-w-[460px] text-white rounded-2xl p-6 shadow-2xl backdrop-blur-[2px] mb-[35px] md:mb-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(24,80,6,1) 0%, rgba(3,50,9,1) 50%, rgba(29,85,7,1) 100%)",
                }}
              >
                {/* Heading */}
                <div className="flex flex-col items-start gap-2">
                  <Image
                    src="/Images/27Pallazzo.png"
                    alt="27 PALAZZO"
                    width={340}
                    height={90}
                    priority
                    className="h-auto w-[260px] sm:w-[300px] lg:w-[340px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  />

                  {/* Subtitle Below the Image */}
                  <div className="mt-1">
                    <div className="text-[14px] sm:text-[16px] uppercase text-[#F0F0F0] font-medium tracking-wide">
                      Luxury 3 BHK Residences in Chembur
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`
  mt-4
  text-[14px] sm:text-[16px] lg:text-[18px]
  leading-[1.4]
  font-semibold text-black
  rounded-md p-3
  shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.15)]
`}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(254,182,40,1) 0%, rgba(255,231,143,1) 50%, rgba(255,183,14,1) 100%)",
                  }}
                >
                  1500 sq. ft. carpet area apartments starting from ₹6 Cr++ with basic fittings.
                  A premium address for those who aspire more.
                </p>

              </div>

              {/* ✅ Button placed OUTSIDE the green card but aligned below it */}
              <div className="mt-5 mb-[35px] md:mb-0 flex justify-center md:justify-start">
                <Link
                  href="#contact-us"
                  className="inline-block rounded-lg px-6 py-3 font-semibold text-white
                  bg-gradient-to-b from-[#f3cb47] via-[#d9a026] to-[#bb7202]
                  border border-[#f6d789]
                  shadow-[0_6px_20px_rgba(233,165,25,0.35)]
                  hover:scale-[1.02] active:scale-95 transition"
                >
                  BOOK A SITE VISIT TODAY
                </Link>
              </div>

            </motion.div>

            {/* right spacer to preserve layout */}
            <div className="hidden lg:block lg:col-span-7" />
          </div>
        </motion.div>



        {/* ===== Bottom: Project Overview ===== */}
        {/* mt / pt scaled by viewport so it sits lower like the screenshot */}
        <motion.div
          className="max-w-[1464px] mx-auto px-4 sm:px-6 lg:px-8 mt-[20px] sm:mt-[220px] md:mt-[360px] lg:mt-[300px] pt-[40px] sm:pt-[140px] md:pt-[220px] lg:pt-[300px]"

          id="about-us"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* LEFT: Image (≈38%) */}
            <motion.div className="w-full lg:w-[47%] flex justify-center lg:justify-start" variants={fadeUp}>
              <div className="relative w-full max-w-[640px]">
                <Image
                  src="/Images/project_overview.png"
                  alt="Project overview"
                  width={640}
                  height={490}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>

            {/* RIGHT: Text (≈62%) */}
            <motion.div className="w-full lg:w-[50%]" variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E3C14]">
                PROJECT OVERVIEW
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-neutral-700">
                Introducing <b>27 Palazzo</b>, a landmark residential development by
                <b> Chothani BuildCorp Pvt. Ltd.</b> Located in Chembur East, this project
                blends architectural elegance, spacious design, and premium fittings to
                redefine modern urban living.
              </p>

              <motion.ul className="mt-6 space-y-3 text-[15px]" variants={stagger}>
                {[
                  { label: "Configuration", value: "3 BHK Apartments" },
                  { label: "Carpet Area", value: "1500 sq. ft. (approx.)" },
                  { label: "Starting Price", value: "₹6 Cr ++" },
                  { label: "Finishing", value: "With Basic Fittings" },
                  { label: "RERA Registered Project", value: "(ID to be inserted if available)" },
                ].map((item) => (
                  <motion.li key={item.label} className="flex items-start gap-3" variants={fadeIn}>
                    <span className="mt-1 inline-block size-3 rounded-full bg-[#1AAE49] ring-2 ring-[#0a7a30]" />
                    <span>
                      <b>{item.label}:</b> {item.value}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}