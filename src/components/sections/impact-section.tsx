"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Shield,
  Users,
  Zap,
  BarChart3,
} from "lucide-react";
import type { ImpactMetric } from "@/lib/content";

const iconMap = {
  trending: TrendingUp,
  shield: Shield,
  users: Users,
  zap: Zap,
  chart: BarChart3,
} as const;

type ImpactSectionProps = {
  metrics: ImpactMetric[];
};

export function ImpactSection({ metrics }: ImpactSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="impact" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Impact
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Outcomes from production delivery
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            Quantified highlights across banking, logistics, and GenAI — driven
            from content files (editable in the CMS when GitHub is configured).
          </p>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => {
            const Icon = iconMap[m.icon];
            return (
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.4 }}
              >
                <Card className="group h-full overflow-hidden border-border/80 bg-card/50 transition hover:border-primary/30 hover:shadow-md">
                  <CardContent className="flex flex-col gap-3 p-6">
                    <motion.div
                      whileHover={
                        reduce ? undefined : { scale: 1.05, rotate: -3 }
                      }
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-xl"
                    >
                      <Icon className="size-5" />
                    </motion.div>
                    <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                      {m.value}
                    </p>
                    <p className="text-sm font-medium leading-snug">{m.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {m.hint}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
