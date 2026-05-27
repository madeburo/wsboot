import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WSBoot",
  description: "A retro web desktop booting in browser.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
