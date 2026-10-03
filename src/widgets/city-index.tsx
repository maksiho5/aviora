"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { ArrowRight } from "@/shared/ui/icons";

export interface CityRow {
  slug: string;
  name: string;
  rhythm: string;
  region: string;
  image: StaticImageData;
  imageAlt: string;
}

/** Hover or focus a row and the arch on the right follows. Touch users simply tap through. */
export function CityIndex({ rows }: { rows: CityRow[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="lg:col-span-7">
        {rows.map((city, index) => (
          <li key={city.slug} className="border-t border-line-strong last:border-b">
            <Link
              href={`/cities/${city.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group flex items-center gap-5 py-5 no-underline lg:py-6"
            >
              <span className="arch relative size-[72px] shrink-0 lg:hidden">
                <Image src={city.image} alt="" sizes="72px" className="img-film size-full object-cover" />
              </span>
              <span className="hidden w-10 font-serif text-xl italic text-muted lg:block">0{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[2.5rem] italic leading-none tracking-[-0.02em] transition-transform duration-[var(--dur-base)] ease-[var(--ease-soft)] group-hover:translate-x-2 lg:text-[4rem]">
                  {city.name}
                </span>
                <span className="mt-2 block text-sm text-muted">
                  {city.region} · {city.rhythm}
                </span>
              </span>
              <ArrowRight className="shrink-0 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="arch grain sticky top-28 aspect-[4/5]">
          {rows.map((city, index) => (
            <Image
              key={city.slug}
              src={city.image}
              alt={index === active ? city.imageAlt : ""}
              placeholder="blur"
              sizes="(min-width: 1024px) 28vw, 1px"
              className={cn(
                "img-film absolute inset-0 size-full object-cover transition-opacity duration-[var(--dur-base)]",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
