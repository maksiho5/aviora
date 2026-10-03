export const THEME_STORAGE_KEY = "aviora.theme";

export const themes = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof themes)[number];

/** Runs before paint so the page never flashes the wrong theme. Falls back to light. */
export const themeBootScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"light";if(t==="system"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export function resolveTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
