import type { Budget, BudgetCategory, Task } from "./types";

export const budgetLines: BudgetCategory[] = ["rent", "food", "transport", "phone", "health", "fun"];

const DEPOSIT_MONTHS = 2;

export function resolveBudget(base: Budget, overrides?: Partial<Budget>): Budget {
  return { ...base, ...overrides };
}

export function monthlyTotal(budget: Budget) {
  return budgetLines.reduce((sum, line) => sum + budget[line], 0);
}

/** One month of living, the rent deposit, and the cheapest version of every fee in the plan. */
export function firstMonthTotal(budget: Budget, tasks: Task[]) {
  const fees = tasks.reduce((sum, task) => sum + (task.costEur?.[0] ?? 0), 0);
  return monthlyTotal(budget) + budget.rent * DEPOSIT_MONTHS + fees;
}
