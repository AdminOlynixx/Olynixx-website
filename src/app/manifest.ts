import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Olynixx",
    short_name: "Olynixx",
    description: "Readiness + Recovery = Perform",
    start_url: "/",
    display: "browser",
    background_color: "#0b3a33",
    theme_color: "#0b3a33",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
