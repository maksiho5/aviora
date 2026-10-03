import type { Resolution } from "./priorities";
import type { BudgetCategory, CityId, StudentProfile } from "./types";

const CITY_IDS: readonly CityId[] = ["milan", "amsterdam"];
const BUDGET_LINES: readonly BudgetCategory[] = ["rent", "food", "transport", "phone", "health", "fun"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SAFE_KEY = /^[a-z0-9-]{1,64}$/;

type PerCity<T> = Partial<Record<CityId, T>>;

export interface PersistedFirst30 {
  activeCity: CityId;
  profiles: PerCity<StudentProfile>;
  resolutions: PerCity<Record<string, Resolution>>;
  stepChecks: PerCity<Record<string, number[]>>;
  budgets: PerCity<Partial<Record<BudgetCategory, number>>>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isCityId = (value: unknown): value is CityId => CITY_IDS.includes(value as CityId);

function perCity<T>(value: unknown, read: (entry: unknown) => T | undefined): PerCity<T> {
  if (!isRecord(value)) return {};
  const result: PerCity<T> = {};
  for (const city of CITY_IDS) {
    if (!Object.hasOwn(value, city)) continue;
    const entry = read(value[city]);
    if (entry !== undefined) result[city] = entry;
  }
  return result;
}

function keyed<T>(value: unknown, read: (entry: unknown) => T | undefined) {
  if (!isRecord(value)) return undefined;
  const result: Record<string, T> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!SAFE_KEY.test(key)) continue;
    const parsed = read(entry);
    if (parsed !== undefined) result[key] = parsed;
  }
  return result;
}

function readProfile(value: unknown): StudentProfile | undefined {
  if (!isRecord(value) || !isCityId(value.city)) return undefined;
  if (typeof value.arrivalDate !== "string" || !ISO_DATE.test(value.arrivalDate)) return undefined;
  return { city: value.city, arrivalDate: value.arrivalDate, nonEu: value.nonEu === true };
}

const readResolution = (value: unknown): Resolution | undefined =>
  value === "done" || value === "skipped" ? value : undefined;

const readSteps = (value: unknown): number[] | undefined =>
  Array.isArray(value) ? value.filter((step): step is number => Number.isInteger(step) && step >= 0 && step < 50) : undefined;

function readBudget(value: unknown) {
  if (!isRecord(value)) return undefined;
  const result: Partial<Record<BudgetCategory, number>> = {};
  for (const line of BUDGET_LINES) {
    const amount = value[line];
    if (typeof amount === "number" && Number.isFinite(amount) && amount >= 0) result[line] = Math.min(amount, 100_000);
  }
  return result;
}

/** Saved state comes from the browser and can be stale, edited or broken. Keep only what we understand. */
export function sanitizePersisted(raw: unknown): Partial<PersistedFirst30> {
  if (!isRecord(raw)) return {};
  return {
    ...(isCityId(raw.activeCity) && { activeCity: raw.activeCity }),
    profiles: perCity(raw.profiles, readProfile),
    resolutions: perCity(raw.resolutions, (entry) => keyed(entry, readResolution)),
    stepChecks: perCity(raw.stepChecks, (entry) => keyed(entry, readSteps)),
    budgets: perCity(raw.budgets, readBudget),
  };
}
