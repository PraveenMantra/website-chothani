"use client";

import Image from "next/image";
import Link from "next/link";
import ProjectOverview from "./ProjectOverview";

export default function Hero() {
    return (
        <section className="relative min-h-[110vh] overflow-hidden">
            <div className="relative hero">
                {/* CONTENT WRAPPER */}
                <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                        {/* LEFT: CTA CARD */}
                        <div className="lg:col-span-5">
                            <div className="w-full max-w-[420px] bg-[#0E3C14]/90 text-white rounded-2xl p-6 shadow-2xl backdrop-blur-[2px]">
                                {/* Heading */}
                                <div className="flex items-end gap-2">
                                    <span className="text-[64px] leading-none font-extrabold text-[#F6DA76] drop-shadow-md">
                                        27
                                    </span>
                                    <div className="-mb-1">
                                        <div className="text-[34px] font-extrabold tracking-wide">PALAZZO</div>
                                        <div className="text-[14px] uppercase text-[#F0F0F0]">
                                            Luxury 3 BHK Residences in Chembur
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mt-4 text-[13px] bg-white/10 rounded-md p-3 leading-relaxed">
                                    1500 sq. ft. carpet area apartments starting from ₹6 Cr++ with basic
                                    fittings. A premium address for those who aspire more.
                                </p>

                                {/* CTA Button */}
                                <Link
                                    href="#contact-us"
                                    className="mt-5 inline-block rounded-lg px-5 py-3 font-semibold text-black
                           bg-gradient-to-b from-[#E9A519] via-[#F6DA76] to-[#E9A519]
                           shadow-[0_6px_20px_rgba(233,165,25,0.35)] hover:scale-[1.02] transition"
                                >
                                    BOOK A SITE VISIT TODAY
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>      

 {/* HAND IMAGE AT BOTTOM */}
                {/* <div className="absolute bottom-0 left-0 w-full z-10">
                    <Image
                        src="/Images/handImage.jpg"
                        alt="Hand pulling sheet"
                        width={1920}
                        height={800}
                        priority
                        className="w-full h-auto object-cover object-bottom select-none"
                    />
                </div> */}



                {/* WHITE CURVE TRANSITION */}
                {/* <div className="absolute left-1/2 -translate-x-1/2 bottom-[-110px] w-[160%] z-30 pointer-events-none">
        <div className="mx-auto h-[220px] bg-white rounded-t-[120px] shadow-[0_-30px_80px_rgba(0,0,0,0.15)]" />
      </div> */}
            <ProjectOverview />

            </div>
             

        </section>
    );
}
