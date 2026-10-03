import { describe, expect, it } from "vitest";
import { firstMonthTotal, monthlyTotal, resolveBudget } from "./budget";
import type { Budget, Task } from "./types";

const base: Budget = { rent: 700, food: 250, transport: 25, phone: 10, health: 40, fun: 100 };

describe("budget", () => {
  it("lets user values override the typical ones", () => {
    expect(resolveBudget(base, { rent: 900 })).toMatchObject({ rent: 900, food: 250 });
  });

  it("sums the monthly lines", () => {
    expect(monthlyTotal(base)).toBe(1125);
  });

  it("adds a two-month deposit and the lowest fees to the first month", () => {
    const tasks = [{ costEur: [16, 30] }, { costEur: [0, 5] }, {}] as Task[];
    expect(firstMonthTotal(base, tasks)).toBe(1125 + 1400 + 16);
  });
});
