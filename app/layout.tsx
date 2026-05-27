import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wsboost.com"),
  title: {
    default: "WSBoot - Retro Web Desktop",
    template: "%s | WSBoot",
  },
  description: "WSBoot is a Windows 98-inspired retro web desktop with draggable icons, classic apps, games, Winamp, Paint, Doom, and nostalgic pixel UI.",
  applicationName: "WSBoot",
  authors: [{ name: "WSBoost", url: "https://www.wsboost.com" }],
  creator: "WSBoost",
  publisher: "WSBoost",
  keywords: [
    "WSBoot",
    "WSBoost",
    "Windows 98",
    "retro desktop",
    "web desktop",
    "Winamp",
    "Doom",
    "Paint",
    "pixel UI",
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
    title: "WSBoot - Retro Web Desktop",
    description: "A Windows 98-inspired retro web desktop with classic apps, games, Winamp, Paint, Doom, and draggable icons.",
    url: "https://www.wsboost.com",
    siteName: "WSBoot",
    images: [{ url: "/favicon.png", width: 512, height: 512, alt: "WSBoot" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "WSBoot - Retro Web Desktop",
    description: "A Windows 98-inspired retro web desktop with classic apps, games, Winamp, Paint, Doom, and draggable icons.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#c0c0c0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
