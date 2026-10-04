const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "Aviora",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aviora.eu",
  basePath,
  telegramHandle: "@avioraItalyEu",
  telegramUrl: "https://t.me/avioraItalyEu",
} as const;

/** For plain URLs that Next does not prefix on its own (manifest, inline scripts). */
export const withBasePath = (path: string) => `${basePath}${path}`;
