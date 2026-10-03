import { describe, expect, it } from "vitest";
import { milan } from "../data/milan";
import { planDay, progressPercent, tasksForProfile, tomorrowPreview, type Resolutions } from "./priorities";
import type { Task } from "./types";

const ids = (items: { task: Task }[]) => items.map((item) => item.task.id);

function task(id: string, overrides: Partial<Task> = {}): Task {
  return {
    id,
    title: { en: id, ru: id },
    summary: { en: "", ru: "" },
    category: "admin",
    urgency: "important",
    minutes: 20,
    window: [1, 10],
    dependsOn: [],
    steps: [],
    documents: [],
    sources: [],
    ...overrides,
  };
}

describe("Milan, day 7 of a non-EU student", () => {
  const tasks = tasksForProfile(milan.tasks, { nonEu: true });
  const resolved: Resolutions = {
    "emergency-basics": "done",
    "housing-proof": "done",
    "tax-code": "done",
    "sim-card": "done",
  };

  it("reproduces the screen from the brief", () => {
    const plan = planDay(tasks, resolved, 7);
    expect(ids(plan.priorities)).toEqual(["residence-permit", "university-enrolment", "supermarket"]);
    expect(plan.priorities.map((item) => item.tier)).toEqual(["red", "amber", "green"]);
    expect(ids(plan.alsoNeeded)).toEqual(["transport-pass", "healthcare", "bank-account"]);
  });

  it("shows something new tomorrow", () => {
    expect(tomorrowPreview(tasks, resolved, 7).map((t) => t.id)).toEqual(["bank-account"]);
  });

  it("moves the next task up once a priority is done", () => {
    const plan = planDay(tasks, { ...resolved, "university-enrolment": "done" }, 7);
    expect(ids(plan.priorities)).toContain("transport-pass");
  });
});

describe("planDay", () => {
  it("keeps blocked and upcoming tasks out of priorities", () => {
    const plan = planDay(
      [task("cf", { urgency: "critical" }), task("bank", { dependsOn: ["cf"] }), task("doctor", { window: [12, 25] })],
      {},
      1,
    );
    expect(ids(plan.priorities)).toEqual(["cf"]);
    const states = Object.fromEntries(plan.all.map((item) => [item.task.id, item.state]));
    expect(states).toMatchObject({ bank: "blocked", doctor: "upcoming" });
  });

  it("treats skipped prerequisites as resolved", () => {
    const plan = planDay([task("a"), task("b", { dependsOn: ["a"] })], { a: "skipped" }, 1);
    expect(ids(plan.priorities)).toEqual(["b"]);
  });

  it("ignores prerequisites that do not apply to the profile", () => {
    const list = tasksForProfile([task("permit", { nonEuOnly: true }), task("health", { dependsOn: ["permit"] })], {
      nonEu: false,
    });
    expect(ids(planDay(list, {}, 1).priorities)).toEqual(["health"]);
  });

  it("ranks overdue work first and marks it red", () => {
    const plan = planDay([task("late", { urgency: "easy", window: [1, 2] }), task("fresh")], {}, 5);
    expect(plan.priorities[0]).toMatchObject({ tier: "red", overdueBy: 3 });
  });

  it("never picks more than two tasks of one category", () => {
    const list = ["a", "b", "c", "d"].map((id) => task(id, { category: "admin" }));
    list.push(task("e", { category: "daily", urgency: "easy" }));
    const plan = planDay(list, {}, 1);
    expect(plan.priorities.filter((item) => item.task.category === "admin")).toHaveLength(2);
    expect(ids(plan.priorities)).toContain("e");
  });

  it("swaps in a quick task when the day gets too long", () => {
    const list = [
      task("long-a", { minutes: 45, urgency: "critical", category: "admin" }),
      task("long-b", { minutes: 45, urgency: "critical", category: "money" }),
      task("long-c", { minutes: 30, category: "health" }),
      task("quick", { minutes: 10, urgency: "easy", category: "daily" }),
    ];
    expect(ids(planDay(list, {}, 1).priorities)).toEqual(["long-a", "long-b", "quick"]);
  });

  it("is deterministic regardless of input order", () => {
    const tasks = tasksForProfile(milan.tasks, { nonEu: true });
    const expected = ids(planDay(tasks, {}, 3).priorities);
    const reversed = ids(planDay([...tasks].reverse(), {}, 3).priorities);
    expect(reversed).toEqual(expected);
  });
});

describe("progressPercent", () => {
  it("weights important work higher and ignores skipped tasks", () => {
    const list = [task("a", { urgency: "critical" }), task("b", { urgency: "easy" }), task("c")];
    expect(progressPercent(list, { a: "done" })).toBe(50);
    expect(progressPercent(list, { a: "done", c: "skipped" })).toBe(75);
    expect(progressPercent([], {})).toBe(0);
  });
});
