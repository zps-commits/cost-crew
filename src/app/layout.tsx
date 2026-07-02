import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://cost-crew.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "COST CREW — Premium Coastal Oversized T-Shirts",
    template: "%s · COST CREW",
  },
  description:
    "Premium oversized essentials inspired by coastal movement, surf, skate and warm everyday comfort.",
  keywords: [
    "oversized t-shirts",
    "coastal streetwear",
    "premium tees",
    "surf",
    "skate",
    "cost crew",
  ],
  openGraph: {
    title: "COST CREW — Premium Coastal Oversized T-Shirts",
    description:
      "Premium oversized essentials inspired by coastal movement, surf, skate and warm everyday comfort.",
    url: siteUrl,
    siteName: "COST CREW",
    type: "website",
    images: [{ url: "/images/collection-flatlay.jpg", width: 1800, height: 1350 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "COST CREW — Premium Coastal Oversized T-Shirts",
    description:
      "Premium oversized essentials inspired by coastal movement, surf, skate and warm everyday comfort.",
    images: ["/images/collection-flatlay.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
