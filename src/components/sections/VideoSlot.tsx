import type { SitePhoto } from "@/content/photos";
import { PhotoSlot } from "@/components/sections/PhotoSlot";

/**
 * A photo slot that plays a muted, looping video over its photo once a video file is set.
 * With no video it renders the plain photo. The photo stays underneath, so it shows while the
 * video loads and for visitors who prefer reduced motion.
 */
export function VideoSlot({
  photo,
  video,
  className = "",
  sizes,
  priority = false,
  videoRatio,
}: {
  photo: SitePhoto;
  /** Path under /public, for example "/videos/gyms-hero.mp4". Null keeps the photo. */
  video: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Crop used while the video is set, for example "5 / 4" when the clip is not the photo's 16:9. */
  videoRatio?: string;
}) {
  if (!video) return <PhotoSlot photo={photo} className={className} sizes={sizes} priority={priority} />;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: videoRatio ?? photo.ratio.replace("/", " / ") }}>
      <PhotoSlot photo={photo} className="absolute inset-0 h-full!" sizes={sizes} priority={priority} />
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
