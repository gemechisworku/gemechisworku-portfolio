"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ExperienceEntry } from "@/lib/content";
import { formatExperienceRange } from "@/lib/format";
import { Building2, MapPin } from "lucide-react";

type ExperienceSectionProps = {
  experiences: ExperienceEntry[];
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Experience
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Roles & delivery
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            AI automation, payment infrastructure, and data science — remote and
            on-site (Addis Ababa, Ethiopia).
          </p>
        </motion.div>

        <div className="relative mt-12 space-y-6">
          <div
            className="bg-border absolute top-2 bottom-2 left-[11px] hidden w-px md:block"
            aria-hidden
          />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.4 }}
              className="relative md:pl-10"
            >
              <div className="border-primary bg-background absolute top-6 left-0 hidden size-[22px] rounded-full border-2 md:block" />
              <Card className="border-border/80 transition hover:border-primary/25 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl leading-snug">
                        {exp.title}
                      </CardTitle>
                      <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="size-3.5 shrink-0" />
                          {exp.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5 shrink-0" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0 font-normal">
                      {formatExperienceRange(
                        exp.startDate,
                        exp.endDate,
                        exp.current,
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm leading-relaxed">
                    {exp.bullets.map((b, bi) => (
                      <li key={`${exp.id}-${bi}`} className="pl-1 marker:text-primary">
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
