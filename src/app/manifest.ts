import type { MetadataRoute } from "next";
import { withBasePath } from "@/shared/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aviora · FIRST 30",
    short_name: "FIRST 30",
    description: "Your first month in Milan, made manageable.",
    start_url: withBasePath("/en/first-30/milan/"),
    display: "standalone",
    background_color: "#f2f3ed",
    theme_color: "#4c513a",
    icons: [{ src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
