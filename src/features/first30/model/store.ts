"use client";

import { useEffect, useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Resolution } from "./priorities";
import { sanitizePersisted } from "./sanitize";
import type { BudgetCategory, CityId, StudentProfile } from "./types";

type PerCity<T> = Partial<Record<CityId, T>>;

interface First30State {
  activeCity: CityId;
  profiles: PerCity<StudentProfile>;
  resolutions: PerCity<Record<string, Resolution>>;
  stepChecks: PerCity<Record<string, number[]>>;
  budgets: PerCity<Partial<Record<BudgetCategory, number>>>;
  startJourney: (profile: StudentProfile, alreadyDone: string[]) => void;
  setActiveCity: (city: CityId) => void;
  resolveTask: (city: CityId, taskId: string, resolution: Resolution) => void;
  reopenTask: (city: CityId, taskId: string) => void;
  toggleStep: (city: CityId, taskId: string, step: number) => void;
  setBudgetLine: (city: CityId, category: BudgetCategory, value: number) => void;
  resetBudget: (city: CityId) => void;
  resetCity: (city: CityId) => void;
}

const memory = new Map<string, string>();

/** Private browsing or a full quota must not break the app, it just stops remembering. */
const safeStorage: StateStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return memory.get(key) ?? null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      memory.set(key, value);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      memory.delete(key);
    }
  },
};

function withoutKey<T>(record: Record<string, T> | undefined, key: string) {
  const next = { ...record };
  delete next[key];
  return next;
}

export const useFirst30Store = create<First30State>()(
  persist(
    (set) => ({
      activeCity: "milan",
      profiles: {},
      resolutions: {},
      stepChecks: {},
      budgets: {},

      startJourney: (profile, alreadyDone) =>
        set((state) => ({
          activeCity: profile.city,
          profiles: { ...state.profiles, [profile.city]: profile },
          resolutions: {
            ...state.resolutions,
            [profile.city]: {
              ...state.resolutions[profile.city],
              ...Object.fromEntries(alreadyDone.map((id) => [id, "done" as const])),
            },
          },
        })),

      setActiveCity: (city) => set({ activeCity: city }),

      resolveTask: (city, taskId, resolution) =>
        set((state) => ({
          resolutions: { ...state.resolutions, [city]: { ...state.resolutions[city], [taskId]: resolution } },
        })),

      reopenTask: (city, taskId) =>
        set((state) => ({
          resolutions: { ...state.resolutions, [city]: withoutKey(state.resolutions[city], taskId) },
        })),

      toggleStep: (city, taskId, step) =>
        set((state) => {
          const current = state.stepChecks[city]?.[taskId] ?? [];
          const next = current.includes(step) ? current.filter((s) => s !== step) : [...current, step];
          return { stepChecks: { ...state.stepChecks, [city]: { ...state.stepChecks[city], [taskId]: next } } };
        }),

      setBudgetLine: (city, category, value) =>
        set((state) => ({
          budgets: {
            ...state.budgets,
            [city]: { ...state.budgets[city], [category]: Math.max(0, Math.round(value)) },
          },
        })),

      resetBudget: (city) => set((state) => ({ budgets: { ...state.budgets, [city]: {} } })),

      resetCity: (city) =>
        set((state) => ({
          profiles: withoutKey(state.profiles, city),
          resolutions: withoutKey(state.resolutions, city),
          stepChecks: withoutKey(state.stepChecks, city),
          budgets: withoutKey(state.budgets, city),
        })),
    }),
    {
      name: "aviora.first30",
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true,
      merge: (persisted, current) => ({ ...current, ...sanitizePersisted(persisted) }),
      partialize: ({ activeCity, profiles, resolutions, stepChecks, budgets }) => ({
        activeCity,
        profiles,
        resolutions,
        stepChecks,
        budgets,
      }),
    },
  ),
);

const subscribeHydration = (notify: () => void) => useFirst30Store.persist.onFinishHydration(notify);
const isHydrated = () => useFirst30Store.persist.hasHydrated();
const notHydratedOnServer = () => false;

/**
 * Static HTML is rendered without any saved progress, so components wait for
 * this flag before reading persisted state. That keeps hydration consistent.
 */
export function useStoreHydrated() {
  const hydrated = useSyncExternalStore(subscribeHydration, isHydrated, notHydratedOnServer);

  useEffect(() => {
    if (!useFirst30Store.persist.hasHydrated()) void useFirst30Store.persist.rehydrate();

    const syncTabs = (event: StorageEvent) => {
      if (event.key === useFirst30Store.persist.getOptions().name) void useFirst30Store.persist.rehydrate();
    };
    window.addEventListener("storage", syncTabs);
    return () => window.removeEventListener("storage", syncTabs);
  }, []);

  return hydrated;
}
