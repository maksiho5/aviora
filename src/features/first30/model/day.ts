export const MONTH_LENGTH = 30;

const MS_PER_DAY = 86_400_000;

function startOfDayUtc(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toIsoDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Day 1 is the arrival day. Before arrival the result is zero or negative,
 * which lets the UI show "arriving in N days" without a separate code path.
 */
export function dayOfStay(arrivalIso: string, today: Date) {
  const diff = startOfDayUtc(today) - startOfDayUtc(parseIsoDate(arrivalIso));
  return Math.floor(diff / MS_PER_DAY) + 1;
}

export function clampDay(day: number) {
  return Math.min(Math.max(day, 1), MONTH_LENGTH);
}
