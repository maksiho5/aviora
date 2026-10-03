import { describe, expect, it } from "vitest";
import { cities } from "./index";

describe.each(Object.values(cities))("$id guide", (city) => {
  const ids = new Set(city.tasks.map((task) => task.id));

  it("has unique task ids", () => {
    expect(ids.size).toBe(city.tasks.length);
  });

  it("only depends on tasks that exist", () => {
    for (const task of city.tasks) {
      for (const dep of task.dependsOn) expect(ids, `${task.id} -> ${dep}`).toContain(dep);
    }
  });

  it("has no dependency cycles", () => {
    const byId = new Map(city.tasks.map((task) => [task.id, task]));
    const visit = (id: string, path: string[]): void => {
      expect(path, `cycle: ${[...path, id].join(" > ")}`).not.toContain(id);
      for (const dep of byId.get(id)?.dependsOn ?? []) visit(dep, [...path, id]);
    };
    for (const task of city.tasks) visit(task.id, []);
  });

  it("keeps windows inside the month", () => {
    for (const { id, window } of city.tasks) {
      expect(window[0], id).toBeGreaterThanOrEqual(1);
      expect(window[1], id).toBeLessThanOrEqual(30);
      expect(window[0], id).toBeLessThanOrEqual(window[1]);
    }
  });
});
