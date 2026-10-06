import { l, type Localized } from "@/shared/lib/localized";
import type { CityId } from "../model/types";
import { getCity } from "./index";

export interface MapPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  note: Localized;
  taskIds: string[];
}

/** Coordinates are approximate (about 150 m). Offices move; the task pages link to the official source. */
const landmarks: Record<CityId, MapPlace[]> = {
  milan: [
    {
      id: "centrale",
      name: "Milano Centrale",
      lat: 45.486,
      lng: 9.204,
      note: l("Main train station", "Главный вокзал"),
      taskIds: [],
    },
    {
      id: "polimi",
      name: "Politecnico di Milano · Leonardo",
      lat: 45.4781,
      lng: 9.2273,
      note: l("Città Studi campus", "Кампус Città Studi"),
      taskIds: ["university-enrolment"],
    },
    {
      id: "statale",
      name: "Università degli Studi di Milano",
      lat: 45.4597,
      lng: 9.1955,
      note: l("Via Festa del Perdono", "Via Festa del Perdono"),
      taskIds: ["university-enrolment"],
    },
    {
      id: "bocconi",
      name: "Università Bocconi",
      lat: 45.4504,
      lng: 9.19,
      note: l("Via Sarfatti", "Via Sarfatti"),
      taskIds: ["university-enrolment"],
    },
  ],
};

export function cityPlaces(cityId: CityId): MapPlace[] {
  const fromTasks = getCity(cityId).tasks.flatMap((task) =>
    task.place
      ? [
          {
            id: task.id,
            name: task.place.name,
            lat: task.place.lat,
            lng: task.place.lng,
            note: l(task.place.address, task.place.address),
            taskIds: [task.id],
          },
        ]
      : [],
  );
  return [...fromTasks, ...landmarks[cityId]];
}
