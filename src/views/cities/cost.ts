import type { ItalyCity } from "@/content/cities";

export function monthlyRange(city: ItalyCity): [number, number] {
  return city.cost.reduce<[number, number]>(([min, max], line) => [min + line.range[0], max + line.range[1]], [0, 0]);
}
