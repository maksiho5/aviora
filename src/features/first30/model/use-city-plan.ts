"use client";

import { useMemo } from "react";
import { getCity } from "../data";
import { dayOfStay, parseIsoDate } from "./day";
import { planDay, progressPercent, tasksForProfile, tomorrowPreview } from "./priorities";
import { useFirst30Store, useStoreHydrated } from "./store";
import type { CityId } from "./types";
import { useToday } from "./use-today";

const EMPTY: Record<string, never> = {};

export function useCityPlan(cityId: CityId) {
  const hydrated = useStoreHydrated();
  const today = useToday();
  const profile = useFirst30Store((state) => state.profiles[cityId]);
  const resolutions = useFirst30Store((state) => state.resolutions[cityId]) ?? EMPTY;
  const city = getCity(cityId);

  return useMemo(() => {
    if (!profile) return { hydrated, city, profile: undefined, resolutions } as const;

    const tasks = tasksForProfile(city.tasks, profile);
    const day = dayOfStay(profile.arrivalDate, parseIsoDate(today));
    const planningDay = Math.max(day, 1);

    return {
      hydrated,
      city,
      profile,
      resolutions,
      tasks,
      day,
      plan: planDay(tasks, resolutions, planningDay),
      tomorrow: tomorrowPreview(tasks, resolutions, planningDay),
      progress: progressPercent(tasks, resolutions),
    } as const;
  }, [hydrated, city, profile, resolutions, today]);
}
