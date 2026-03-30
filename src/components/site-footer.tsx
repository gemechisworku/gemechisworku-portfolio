import Link from "next/link";
import { Code2, Mail, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { SiteContent } from "@/lib/content";

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer id="contact" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Let&apos;s build reliable AI systems.
            </p>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
              {site.location} ·{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent"
            >
              <Mail className="size-4" />
              Email
            </Link>
            <Link
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              <Code2 className="size-4" />
              GitHub
            </Link>
            <Link
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              <Share2 className="size-4" />
              LinkedIn
            </Link>
            <Link
              href={site.social.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              Portfolio
            </Link>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground text-center text-xs">
          © {new Date().getFullYear()} {site.name}. Built with Next.js & shadcn/ui.
        </p>
      </div>
    </footer>
  );
}
