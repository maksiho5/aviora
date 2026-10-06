import type { Localized } from "@/shared/lib/localized";

export type { Localized };

export type CityId = "milan";

export type Urgency = "critical" | "important" | "easy";

export type TaskCategory =
  | "admin"
  | "university"
  | "money"
  | "health"
  | "transport"
  | "housing"
  | "daily"
  | "social";

export type SourceKind = "official" | "community";

export interface TaskSource {
  kind: SourceKind;
  label: Localized;
  url?: string;
}

export interface Place {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Task {
  id: string;
  title: Localized;
  summary: Localized;
  category: TaskCategory;
  urgency: Urgency;
  minutes: number;
  costEur?: [min: number, max: number];
  /** Days of the first month when the task makes sense, inclusive. */
  window: [from: number, due: number];
  dependsOn: string[];
  steps: Localized[];
  documents: Localized[];
  sources: TaskSource[];
  tip?: Localized;
  place?: Place;
  nonEuOnly?: boolean;
}

export interface StudentTip {
  text: Localized;
  author: Localized;
}

export type BudgetCategory = "rent" | "food" | "transport" | "phone" | "health" | "fun";

export type Budget = Record<BudgetCategory, number>;

export interface CityGuide {
  id: CityId;
  name: Localized;
  country: Localized;
  tagline: Localized;
  center: [lat: number, lng: number];
  tasks: Task[];
  tips: StudentTip[];
  budget: Budget;
}

export interface StudentProfile {
  city: CityId;
  arrivalDate: string;
  nonEu: boolean;
}
