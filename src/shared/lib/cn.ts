import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Later classes win, so callers can override a component's defaults (e.g. pass "hidden"). */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
