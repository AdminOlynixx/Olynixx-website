import type { ReactNode } from "react";
import Image from "next/image";

/** Capability card with status badge. Hover lifts the card and draws a gold top rule. */
export function DeviceCard({
  status,
  name,
  role,
  bullets,
  where,
  theme = "light",
  image,
  imageSide = false,
  children,
}: {
  status: string;
  name: string;
  role?: string;
  bullets?: readonly string[];
  where?: string;
  theme?: "dark" | "light";
  /** Optional photo. Placed on top, or beside the copy when imageSide is set (wide cards). */
  image?: { src: string; alt: string; width: number; height: number };
  imageSide?: boolean;
  children?: ReactNode;
}) {
  const dark = theme === "dark";
  const live = status === "Operating";
  return (
    <article
      className={`group relative flex h-full border p-7 ${image && imageSide ? "flex-col gap-7 md:flex-row" : "flex-col"} transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 ${
        dark ? "border-cream/15 bg-cream/[0.04] hover:border-gold-dark" : "border-rule bg-paper hover:border-gold"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
      {image && imageSide && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 768px) 280px, 100vw"
          loading="lazy"
          className="h-auto w-full max-w-[280px] shrink-0 self-start object-cover md:w-[280px]"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
      {image && !imageSide && (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 768px) 40vw, 100vw"
          loading="lazy"
          className="mb-6 aspect-[4/5] w-full object-cover object-[50%_15%]"
        />
      )}
      <p
        className={`mb-5 inline-flex w-fit items-center gap-2 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${
          dark ? "border-cream/25 text-cream/80" : "border-rule text-ink-muted"
        }`}
      >
        <span
          aria-hidden
          className={`inline-block h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-data-dark" : dark ? "bg-gold-dark" : "bg-gold"}`}
        />
        {status}
      </p>
      <h3 className="font-display text-2xl leading-tight">{name}</h3>
      {role && <p className={`mt-3 text-[15px] ${dark ? "text-cream/80" : "text-ink-muted"}`}>{role}</p>}
      {children}
      {bullets && bullets.length > 0 && (
        <ul className={`mt-5 space-y-2 text-[15px] ${dark ? "text-cream/80" : "text-ink-muted"}`}>
          {bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {where && (
        <p className={`mt-auto pt-6 font-mono text-xs uppercase tracking-[0.08em] ${dark ? "text-cream/60" : "text-ink-muted"}`}>
          {where}
        </p>
      )}
      </div>
    </article>
  );
}
