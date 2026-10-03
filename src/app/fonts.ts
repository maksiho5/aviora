import { Cormorant, Inter } from "next/font/google";

export const serif = Cormorant({
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--f-serif",
});

export const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--f-sans",
});
