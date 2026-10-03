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
  amsterdam: [
    {
      id: "centraal",
      name: "Amsterdam Centraal",
      lat: 52.3791,
      lng: 4.9003,
      note: l("Main train station", "Главный вокзал"),
      taskIds: ["ovpay"],
    },
    {
      id: "stadhuis",
      name: "Stadhuis Amsterdam",
      lat: 52.3675,
      lng: 4.9013,
      note: l("City Hall, Amstel 1. Registration appointments", "Ратуша, Amstel 1. Запись на регистрацию"),
      taskIds: ["municipality-registration"],
    },
    {
      id: "uva",
      name: "University of Amsterdam · Roeterseiland",
      lat: 52.3637,
      lng: 4.9119,
      note: l("Roeterseiland campus", "Кампус Roeterseiland"),
      taskIds: ["student-card-nl"],
    },
    {
      id: "vu",
      name: "Vrije Universiteit Amsterdam",
      lat: 52.3343,
      lng: 4.8656,
      note: l("Zuidas campus", "Кампус Zuidas"),
      taskIds: ["student-card-nl"],
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
