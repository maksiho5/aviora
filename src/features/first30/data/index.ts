import type { CityGuide, CityId } from "../model/types";
import { milan } from "./milan";

export const cities: Record<CityId, CityGuide> = { milan };

export const cityIds = Object.keys(cities) as CityId[];

export function getCity(id: CityId) {
  return cities[id];
}

export function findTask(city: CityId, taskId: string) {
  return cities[city].tasks.find((task) => task.id === taskId);
}
