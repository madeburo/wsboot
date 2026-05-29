import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WSBoot - Retro Web Desktop",
    short_name: "WSBoot",
    description:
      "A Windows 98-inspired retro web desktop with classic apps, games, and draggable icons.",
    start_url: "/",
    display: "standalone",
    background_color: "#c5d5e6",
    theme_color: "#c5d5e6",
    icons: [
      {
        src: "/favicon.png",
        sizes: "128x128",
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
