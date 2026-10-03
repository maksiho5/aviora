import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export const l = (en: string, ru: string): Localized => ({ en, ru });

export const pick = <T,>(value: Localized<T>, locale: Locale): T => value[locale];
