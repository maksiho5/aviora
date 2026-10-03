import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cityIds, cities } from "../data";
import type { CityId } from "./types";

export function isCityId(value: string): value is CityId {
  return (cityIds as string[]).includes(value);
}

export function cityOrNotFound(value: string): CityId {
  if (!isCityId(value)) notFound();
  return value;
}

export const cityStaticParams = () =>
  routing.locales.flatMap((locale) => cityIds.map((city) => ({ locale, city })));

export const taskStaticParams = () =>
  routing.locales.flatMap((locale) =>
    cityIds.flatMap((city) => cities[city].tasks.map((task) => ({ locale, city, taskId: task.id }))),
  );
