"use client";

import Image from "next/image";
import { Code2, ExternalLink, Globe, Video } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { normalizeImageUrlForEmbed } from "@/lib/image-url";
import { cn } from "@/lib/utils";
import type { ProjectEntry } from "@/lib/content";

type ProjectMediaProps = Pick<
  ProjectEntry,
  "title" | "screenshots" | "liveUrl" | "repoUrl" | "videoUrl"
>;

export function ProjectMedia({
  title,
  screenshots,
  liveUrl,
  repoUrl,
  videoUrl,
}: ProjectMediaProps) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;
  const hasLinks = Boolean(liveUrl || repoUrl || videoUrl);
  const hasScreenshots = screenshots.length > 0;

  return (
    <div className="mt-10 space-y-10">
      {hasLinks ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            Links
          </h2>
          <div className="flex flex-wrap gap-2">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Globe className="size-4" />
                Live app
                <ExternalLink className="text-muted-foreground size-3.5" />
              </a>
            ) : null}
            {repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Code2 className="size-4" />
                Repository
                <ExternalLink className="text-muted-foreground size-3.5" />
              </a>
            ) : null}
            {videoUrl ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Video className="size-4" />
                Video
                <ExternalLink className="text-muted-foreground size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      {embedUrl ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            Video
          </h2>
          <div className="bg-muted border-border relative aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
            <iframe
              title={`${title} — video`}
              src={embedUrl}
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      ) : null}

      {hasScreenshots ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide uppercase">
            Screenshots
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {screenshots.map((src, i) => (
              <figure key={`${src}-${i}`} className="overflow-hidden rounded-xl">
                <ScreenshotImage src={src} alt={`${title} — screenshot ${i + 1}`} />
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const linkClass = cn(
  "border-border bg-card text-foreground hover:bg-muted/80 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition-colors",
);

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const resolved = normalizeImageUrlForEmbed(src);
  const local = resolved.startsWith("/");

  if (local) {
    return (
      <Image
        src={resolved}
        alt={alt}
        width={1200}
        height={675}
        className="bg-muted border-border aspect-video w-full border object-cover"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external screenshot URLs
    <img
      src={resolved}
      alt={alt}
      className="bg-muted border-border aspect-video w-full border object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}
