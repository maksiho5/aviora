"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/shared/config/site";

/**
 * Muted, looping and inline so mobile browsers autoplay it. With reduced
 * motion the poster stays as a still photo.
 */
export function HeroVideo({ label }: { label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not reflect the muted prop as an attribute, and browsers only autoplay muted video.
    video.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) video.pause();
      else void video.play().catch(() => undefined);
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className="img-film absolute inset-0 size-full object-cover"
      poster={withBasePath("/videos/hero-poster.jpg")}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={withBasePath("/videos/hero.mp4")} type="video/mp4" />
    </video>
  );
}
