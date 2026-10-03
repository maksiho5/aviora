import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aviora · FIRST 30",
    short_name: "FIRST 30",
    description: "Your first month in Milan, made manageable.",
    start_url: "/en/first-30/milan",
    display: "standalone",
    background_color: "#f2f3ed",
    theme_color: "#4c513a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
