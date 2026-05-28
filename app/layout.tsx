import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wsboot.com"),
  title: {
    default: "WSBoot - Windows 98 Retro Web Desktop Experience",
    template: "%s | WSBoot",
  },
  description:
    "WSBoot is a fully interactive Windows 98-inspired web desktop. Play Doom, Minesweeper, Solitaire and Snake. Use Winamp, Paint, Norton Commander and more — all in your browser with pixel-perfect retro UI.",
  applicationName: "WSBoot",
  authors: [{ name: "WSBoot", url: "https://www.wsboot.com" }],
  creator: "WSBoot",
  publisher: "WSBoot",
  keywords: [
    "WSBoot",
    "Windows 98",
    "Windows 98 simulator",
    "retro desktop",
    "web desktop",
    "online desktop",
    "browser desktop",
    "Winamp player",
    "Doom browser",
    "Minesweeper online",
    "Solitaire online",
    "Paint online",
    "Norton Commander",
    "pixel UI",
    "retro games",
    "nostalgic web app",
    "90s computer",
    "virtual desktop",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "WSBoot - Windows 98 Retro Web Desktop",
    description:
      "Play Doom, Minesweeper, Solitaire. Use Winamp, Paint, Norton Commander — a fully interactive Windows 98 desktop in your browser.",
    url: "https://www.wsboot.com",
    siteName: "WSBoot",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WSBoot - Windows 98 Retro Web Desktop with classic apps and games",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WSBoot - Windows 98 Retro Web Desktop",
    description:
      "Play Doom, Minesweeper, Solitaire. Use Winamp, Paint, Norton Commander — a fully interactive Windows 98 desktop in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WSBoot - Windows 98 Retro Web Desktop",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#c0c0c0",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WSBoot",
  url: "https://www.wsboot.com",
  description:
    "A fully interactive Windows 98-inspired web desktop. Play Doom, Minesweeper, Solitaire and Snake. Use Winamp, Paint, Norton Commander and more — all in your browser.",
  applicationCategory: "Entertainment",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "WSBoot",
    url: "https://www.wsboot.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
