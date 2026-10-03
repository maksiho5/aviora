"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { resolveTheme, THEME_STORAGE_KEY, themes, type ThemePreference } from "@/shared/config/theme";
import { cn } from "@/shared/lib/cn";
import { Monitor, Moon, Sun } from "./icons";

const icons = { light: Sun, dark: Moon, system: Monitor } satisfies Record<ThemePreference, unknown>;

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return themes.includes(stored as ThemePreference) ? (stored as ThemePreference) : "light";
  } catch {
    return "light";
  }
}

function applyTheme(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolveTheme(preference);
}

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("theme");
  const [preference, setPreference] = useState<ThemePreference>("light");

  useEffect(() => {
    setPreference(readPreference());
  }, []);

  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => applyTheme("system");
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, [preference]);

  const choose = (next: ThemePreference) => {
    setPreference(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode: the choice simply lasts for this page view.
    }
  };

  return (
    <div role="radiogroup" aria-label={t("label")} className={cn("inline-flex rounded-full bg-surface-2 p-1", className)}>
      {themes.map((theme) => {
        const Icon = icons[theme];
        const active = preference === theme;
        return (
          <button
            key={theme}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(theme)}
            title={t(theme)}
            onClick={() => choose(theme)}
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors duration-[var(--dur-instant)]",
              active ? "bg-surface text-text shadow-[var(--shadow-pop)]" : "text-muted hover:text-text",
            )}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
