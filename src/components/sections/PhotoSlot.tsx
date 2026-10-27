import Image from "next/image";
import type { SitePhoto } from "@/content/photos";

/**
 * Renders a site photo at its slot crop (3:2 hero or 4:3 card). The file may still be the flat
 * cream placeholder; swapping the file under the same name needs no code change.
 * Below-the-fold images lazy-load; pass `priority` for the hero.
 */
export function PhotoSlot({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  ratio,
}: {
  photo: SitePhoto | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Override the crop, for example "4 / 3" to fit a mixed set into one grid. */
  ratio?: string;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      style={{ aspectRatio: ratio ?? photo.ratio.replace("/", " / ") }}
      className={`h-auto w-full object-cover ${className}`}
    />
  );
}
