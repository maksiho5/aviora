import type { StudentProfile, Task, TaskCategory, Urgency } from "./types";

export type TaskState = "done" | "skipped" | "ready" | "upcoming" | "blocked";
export type Tier = "red" | "amber" | "green";

export interface PlannedTask {
  task: Task;
  state: TaskState;
  score: number;
  tier: Tier;
  overdueBy: number;
  waitingOn: Task[];
  unlocks: Task[];
}

export interface DayPlan {
  day: number;
  priorities: PlannedTask[];
  alsoNeeded: PlannedTask[];
  all: PlannedTask[];
  importantLeft: number;
}

export type Resolution = "done" | "skipped";
export type Resolutions = Readonly<Record<string, Resolution>>;

export const PRIORITY_LIMIT = 3;
const ALSO_LIMIT = 3;
const MAX_PER_CATEGORY = 2;
const DAILY_MINUTES_CAP = 90;
const QUICK_TASK_MINUTES = 15;

const IMPORTANCE_WEIGHT: Record<Urgency, number> = { critical: 40, important: 25, easy: 10 };
const PROGRESS_WEIGHT: Record<Urgency, number> = { critical: 3, important: 2, easy: 1 };

export function tasksForProfile(tasks: Task[], profile: Pick<StudentProfile, "nonEu">) {
  return tasks.filter((task) => !task.nonEuOnly || profile.nonEu);
}

function deadlinePressure(day: number, due: number) {
  if (day > due) return 100 + Math.min(10, 2 * (day - due));
  const left = due - day;
  if (left <= 2) return 70;
  if (left <= 6) return 50;
  return 20;
}

export function scoreTask(task: Task, day: number, openDependents: number) {
  const unlock = Math.min(30, 10 * openDependents);
  const effort = -Math.min(4, Math.floor(task.minutes / 15));
  return deadlinePressure(day, task.window[1]) + IMPORTANCE_WEIGHT[task.urgency] + unlock + effort;
}

export function tierOf(task: Task, score: number): Tier {
  if (score >= 100) return "red";
  if (score >= 60 || task.urgency === "critical") return "amber";
  return "green";
}

function stateOf(task: Task, resolved: Resolutions, day: number): TaskState {
  const resolution = resolved[task.id];
  if (resolution) return resolution;
  if (task.dependsOn.some((dep) => !resolved[dep])) return "blocked";
  return task.window[0] <= day ? "ready" : "upcoming";
}

const byRank = (a: PlannedTask, b: PlannedTask) =>
  b.score - a.score || a.task.window[1] - b.task.window[1] || a.task.id.localeCompare(b.task.id);

function pickPriorities(ready: PlannedTask[]) {
  const picked: PlannedTask[] = [];
  const perCategory = new Map<TaskCategory, number>();

  for (const item of ready) {
    if (picked.length === PRIORITY_LIMIT) break;
    const used = perCategory.get(item.task.category) ?? 0;
    if (used >= MAX_PER_CATEGORY) continue;
    perCategory.set(item.task.category, used + 1);
    picked.push(item);
  }

  const minutes = picked.reduce((sum, item) => sum + item.task.minutes, 0);
  const last = picked.at(-1);
  if (minutes > DAILY_MINUTES_CAP && last) {
    const quick = ready.find(
      (item) => !picked.includes(item) && item.task.minutes <= QUICK_TASK_MINUTES && item.task.minutes < last.task.minutes,
    );
    if (quick) picked[picked.length - 1] = quick;
  }

  return picked;
}

function pickAlsoNeeded(rest: PlannedTask[], priorities: PlannedTask[]) {
  const taken = new Set(priorities.map((item) => item.task.category));
  const also: PlannedTask[] = [];
  for (const item of rest) {
    if (also.length === ALSO_LIMIT) break;
    if (taken.has(item.task.category)) continue;
    taken.add(item.task.category);
    also.push(item);
  }
  return also;
}

/** Prerequisites hidden by the profile (EU students have no permit) count as met. */
function withApplicableDeps(tasks: Task[]) {
  const ids = new Set(tasks.map((task) => task.id));
  return tasks.map((task) => ({ ...task, dependsOn: task.dependsOn.filter((dep) => ids.has(dep)) }));
}

export function planDay(allTasks: Task[], resolved: Resolutions, day: number): DayPlan {
  const tasks = withApplicableDeps(allTasks);
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const dependents = new Map<string, Task[]>();
  for (const task of tasks) {
    for (const dep of task.dependsOn) dependents.set(dep, [...(dependents.get(dep) ?? []), task]);
  }

  const all = tasks.map<PlannedTask>((task) => {
    const unlocks = (dependents.get(task.id) ?? []).filter((next) => !resolved[next.id]);
    const score = scoreTask(task, day, unlocks.length);
    const state = stateOf(task, resolved, day);
    return {
      task,
      state,
      score,
      tier: tierOf(task, score),
      overdueBy: state === "ready" ? Math.max(0, day - task.window[1]) : 0,
      waitingOn: task.dependsOn.filter((dep) => !resolved[dep]).flatMap((dep) => byId.get(dep) ?? []),
      unlocks,
    };
  });

  const open = all.filter((item) => item.state !== "done" && item.state !== "skipped").sort(byRank);
  const priorities = pickPriorities(open.filter((item) => item.state === "ready"));
  const alsoNeeded = pickAlsoNeeded(
    open.filter((item) => !priorities.includes(item)),
    priorities,
  );

  return {
    day,
    priorities,
    alsoNeeded,
    all,
    importantLeft: open.filter((item) => item.task.urgency !== "easy").length,
  };
}

/** Tasks that join tomorrow's plan, assuming nothing else gets done today. */
export function tomorrowPreview(tasks: Task[], resolved: Resolutions, day: number) {
  const today = new Set(planDay(tasks, resolved, day).priorities.map((item) => item.task.id));
  return planDay(tasks, resolved, day + 1)
    .all.filter((item) => item.state === "ready" && item.task.window[0] === day + 1 && !today.has(item.task.id))
    .map((item) => item.task);
}

export function progressPercent(tasks: Task[], resolved: Resolutions) {
  const counted = tasks.filter((task) => resolved[task.id] !== "skipped");
  const total = counted.reduce((sum, task) => sum + PROGRESS_WEIGHT[task.urgency], 0);
  if (total === 0) return 0;
  const done = counted
    .filter((task) => resolved[task.id] === "done")
    .reduce((sum, task) => sum + PROGRESS_WEIGHT[task.urgency], 0);
  return Math.round((done / total) * 100);
}
