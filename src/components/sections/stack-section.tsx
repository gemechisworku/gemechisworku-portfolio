"use client";

import { motion, useReducedMotion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { SkillsContent } from "@/lib/content";

const tabConfig = [
  { key: "agents" as const, label: "Agents & LLMs" },
  { key: "data" as const, label: "Data & ML" },
  { key: "platform" as const, label: "Platform" },
  { key: "productUi" as const, label: "Product UI" },
  { key: "automation" as const, label: "Automation" },
] as const;

type StackSectionProps = {
  skills: SkillsContent;
};

export function StackSection({ skills }: StackSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Stack
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools & surfaces
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            Representative skills from your CV — edit in{" "}
            <code className="text-foreground text-sm">content/skills.json</code>{" "}
            or via Decap when configured.
          </p>
        </motion.div>
        <motion.div
          className="mt-10"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Tabs defaultValue="agents" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-muted/50 p-2 sm:grid-cols-3 lg:grid-cols-5">
              {tabConfig.map((t) => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  className="rounded-lg text-xs sm:text-sm data-[state=active]:shadow-sm"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabConfig.map((t) => (
              <TabsContent key={t.key} value={t.key} className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {skills[t.key].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm font-normal transition hover:bg-primary/10 hover:text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
