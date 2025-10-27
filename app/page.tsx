import HomeClient from "@/components/HomeClient/HomeClient";
import Image from "next/image";
import type { Metadata } from "next";

/* ---------------- Meta Information ---------------- */
export const metadata: Metadata = {
  title: "27 Palazzo | Luxury 3 BHK Residences in Chembur East, Mumbai",
  description:
    "Discover 27 Palazzo — luxury 3 BHK residences in Chembur East offering 1500 sq. ft. carpet area apartments starting from ₹6 Cr++. Experience unmatched elegance, premium construction, and world-class amenities in Mumbai’s most sought-after address.",
  keywords: [
    "27 Palazzo Chembur",
    "Luxury flats in Chembur East",
    "3 BHK apartments Mumbai",
    "Luxury residences Chembur",
    "Chembur real estate",
    "Premium housing Mumbai",
  ],
  openGraph: {
    title: "27 Palazzo – Luxury 3 BHK Residences in Chembur East, Mumbai",
    description:
      "Experience refined living at 27 Palazzo, Chembur East. Spacious 3 BHK homes with luxurious interiors, superior construction, and premium amenities starting from ₹6 Cr++.",
    url: "https://27palazzo.in",
    siteName: "27 Palazzo",
    images: [
      {
        url: "/Images/og-image-27palazzo.webp",
        width: 1200,
        height: 630,
        alt: "27 Palazzo Chembur – Luxury 3 BHK Residences",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "27 Palazzo | Luxury 3 BHK Residences in Chembur East, Mumbai",
    description:
      "Live the luxury life at 27 Palazzo – spacious 3 BHK apartments with elegant interiors, top-tier amenities, and premium location in Chembur East.",
    images: ["/Images/og-image-27palazzo.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* ---------------- Page Component ---------------- */
export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}
