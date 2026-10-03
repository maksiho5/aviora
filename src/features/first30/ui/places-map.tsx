"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { ArrowUpRight, Pin } from "@/shared/ui/icons";
import { getCity } from "../data";
import { cityPlaces, type MapPlace } from "../data/places";
import type { CityId } from "../model/types";

const searches = ["supermarket", "pharmacy", "post"] as const;

function embedUrl(place: MapPlace) {
  const delta = 0.006;
  const bbox = [place.lng - delta, place.lat - delta / 1.6, place.lng + delta, place.lat + delta / 1.6].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${place.lat},${place.lng}`;
}

export function PlacesMap({ cityId }: { cityId: CityId }) {
  const t = useTranslations("first30.map");
  const locale = useLocale() as Locale;
  const city = getCity(cityId);
  const places = cityPlaces(cityId);
  const [selected, setSelected] = useState(places[0]);
  const [mapOn, setMapOn] = useState(false);

  const linkedTasks = (place: MapPlace) =>
    place.taskIds.flatMap((id) => city.tasks.find((task) => task.id === id)?.title[locale] ?? []).join(", ");

  return (
    <div>
      <h1 className="t-display-l">{t("title")}</h1>
      <p className="t-body-l mt-3 text-muted">{t("lead")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-surface-2">
            {mapOn ? (
              <iframe
                key={selected.id}
                title={t("frameTitle", { place: selected.name })}
                src={embedUrl(selected)}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin"
                className="size-full border-0 grayscale-[35%]"
              />
            ) : (
              <div className="grid size-full place-items-center p-8 text-center">
                <div>
                  <Pin size={32} className="mx-auto text-accent" />
                  <p className="mt-4 font-serif text-2xl italic">{selected.name}</p>
                  <button
                    type="button"
                    onClick={() => setMapOn(true)}
                    className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-on-accent"
                  >
                    {t("loadMap")}
                  </button>
                  <p className="mx-auto mt-3 max-w-[32ch] text-sm text-muted">{t("loadNote")}</p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-muted">© OpenStreetMap contributors. {t("approx")}</p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-muted">{t("nearby")}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {searches.map((query) => (
                <li key={query}>
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${query} ${city.name.en}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 rounded-full bg-surface-2 px-4 text-sm font-semibold no-underline hover:bg-surface-3"
                  >
                    {t(`searches.${query}`)}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 className="text-sm font-semibold text-muted">{t("list")}</h2>
          <ul className="mt-3 space-y-2">
            {places.map((place) => {
              const active = place.id === selected.id;
              const tasks = linkedTasks(place);
              return (
                <li key={place.id}>
                  <div
                    className={cn(
                      "rounded-[var(--radius-md)] border p-4 transition-colors",
                      active ? "border-accent bg-accent-soft" : "border-line bg-surface",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(place)}
                      aria-pressed={active}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <Pin size={20} className="mt-0.5 shrink-0 text-accent" />
                      <span>
                        <span className="block font-semibold">{place.name}</span>
                        <span className="block text-sm text-muted">{place.note[locale]}</span>
                        {tasks && <span className="mt-1 block text-xs text-muted">{t("linked", { tasks })}</span>}
                      </span>
                    </button>
                    <div className="mt-3 flex gap-4 pl-8 text-sm">
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=17/${place.lat}/${place.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center font-semibold link-underline"
                      >
                        {t("openOsm")}
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center font-semibold link-underline"
                      >
                        {t("openGoogle")}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
