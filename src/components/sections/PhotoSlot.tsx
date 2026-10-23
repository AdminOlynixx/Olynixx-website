import Image from "next/image";
import type { SitePhoto } from "@/content/photos";

/** Renders a site photo, or nothing at all while the slot is still empty. */
export function PhotoSlot({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  photo: SitePhoto | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
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
      className={`h-auto w-full object-cover ${className}`}
    />
  );
}
