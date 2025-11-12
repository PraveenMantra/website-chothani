// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollActionButtons from "@/components/ScrollActionButtons";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Set this in .env(.local): NEXT_PUBLIC_SITE_URL=https://27palazzo.in
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "27 Palazzo | Luxury 3 BHK Residences in Chembur East, Mumbai",
    template: "%s | 27 Palazzo",
  },
  description:
    "Discover 27 Palazzo — luxury 3 BHK residences in Chembur East offering 1500 sq. ft. carpet area apartments starting from ₹6 Cr++.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "27 Palazzo",
    title: "27 Palazzo – Luxury 3 BHK Residences in Chembur East, Mumbai",
    description:
      "Experience refined living at 27 Palazzo, Chembur East. Spacious 3 BHK homes with premium amenities starting from ₹6 Cr++.",
    images: [
      {
        // Relative path is fine now because metadataBase is set
        url: "/Images/og-image-27palazzo.webp",
        width: 1200,
        height: 630,
        alt: "27 Palazzo Chembur – Luxury 3 BHK Residences",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "27 Palazzo | Luxury 3 BHK Residences in Chembur East, Mumbai",
    description:
      "Live the luxury life at 27 Palazzo – spacious 3 BHK apartments with elegant interiors and premium amenities.",
    images: ["/Images/og-image-27palazzo.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Place Nav before children so it layers above sections cleanly */}
        <Nav />
        {children}
        <FooterArea />
        <ScrollToTopButton />
        <ScrollActionButtons />

        <Script
          id="mantra-analytics"
          src="https://mantracollab-cdns.s3.ca-central-1.amazonaws.com/mantra-smb-analytics-client-cdn.js"
          strategy="afterInteractive"
          data-website-id="68f879a69a28f4f0434c62b1"
        />

        {/* Plugin Script */}
        <Script
          src="https://mantracollab-cdns.s3.ca-central-1.amazonaws.com/comment-widget.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

// Optional: if you keep your Footer separate
function FooterArea() {
  return null; // or import and render your Footer here
}
