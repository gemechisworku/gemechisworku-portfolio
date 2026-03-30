"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type HeroSectionProps = {
  role: string;
  headline: string;
  subheadline: string;
};

export function HeroSection({ role, headline, subheadline }: HeroSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.2_260/0.25),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.2_260/0.15),transparent)]" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.35] dark:opacity-[0.2]" />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <Sparkles className="size-3.5" />
            {role}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.1]">
            {headline}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#work"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group gap-2 rounded-xl",
              )}
            >
              View projects
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl",
              )}
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
