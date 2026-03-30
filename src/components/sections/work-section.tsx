"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Bot,
  CreditCard,
  Network,
  Sparkles,
  Database,
  BarChart3,
  Container,
} from "lucide-react";

const iconMap = {
  bot: Bot,
  network: Network,
  credit: CreditCard,
  sparkles: Sparkles,
  database: Database,
  chart: BarChart3,
  container: Container,
} as const;

const accentMap = {
  violet: "from-violet-500/20 to-fuchsia-500/10",
  cyan: "from-cyan-500/20 to-blue-500/10",
  amber: "from-amber-500/20 to-orange-500/10",
  emerald: "from-emerald-500/20 to-teal-500/10",
  rose: "from-rose-500/20 to-pink-500/10",
  slate: "from-slate-500/20 to-zinc-500/10",
} as const;

export type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  association: string;
  iconKey: keyof typeof iconMap;
  accent: keyof typeof accentMap;
};

type WorkSectionProps = {
  projects: ProjectCard[];
};

export function WorkSection({ projects }: WorkSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Projects
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            Enterprise AI, data platforms, and ML pipelines — detail pages can be
            wired next; content is Markdown under{" "}
            <code className="text-foreground text-sm">content/projects</code>.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Icon = iconMap[p.iconKey];
            const accent = accentMap[p.accent];
            return (
              <motion.div
                key={p.slug}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.45 }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block h-full"
                >
                  <Card className="relative h-full overflow-hidden border-border/80 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition group-hover:opacity-100`}
                    />
                    <CardHeader className="relative">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="bg-background/80 inline-flex size-10 items-center justify-center rounded-xl border shadow-sm backdrop-blur">
                          <Icon className="size-5" />
                        </div>
                        <ArrowUpRight className="text-muted-foreground size-5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                      </div>
                      <p className="text-muted-foreground text-xs font-medium">
                        {p.association}
                      </p>
                      <CardTitle className="text-xl leading-snug">
                        {p.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {p.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-wrap gap-2 pt-0">
                      {p.technologies.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="font-normal"
                        >
                          {t}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
