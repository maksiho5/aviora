import { describe, expect, it } from "vitest";
import { clampDay, dayOfStay, toIsoDate } from "./day";

describe("dayOfStay", () => {
  it("treats the arrival date as day one", () => {
    expect(dayOfStay("2026-09-01", new Date(2026, 8, 1, 23, 30))).toBe(1);
    expect(dayOfStay("2026-09-01", new Date(2026, 8, 7))).toBe(7);
  });

  it("goes below one before arrival", () => {
    expect(dayOfStay("2026-09-10", new Date(2026, 8, 7))).toBe(-2);
  });

  it("is not thrown off by daylight saving changes", () => {
    expect(dayOfStay("2026-10-20", new Date(2026, 10, 2))).toBe(14);
  });
});

it("clampDay keeps the value inside the month", () => {
  expect(clampDay(-4)).toBe(1);
  expect(clampDay(45)).toBe(30);
});

it("toIsoDate pads month and day", () => {
  expect(toIsoDate(new Date(2026, 0, 5))).toBe("2026-01-05");
});
