import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WSBoot - Retro Web Desktop",
    short_name: "WSBoot",
    description:
      "A Windows 98-inspired retro web desktop with classic apps, games, Winamp, Paint, Doom, and draggable icons.",
    start_url: "/",
    display: "standalone",
    background_color: "#008080",
    theme_color: "#c0c0c0",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
