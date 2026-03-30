"use client";

import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Certification, Education } from "@/lib/content";
import { GraduationCap, Languages } from "lucide-react";

type EducationSectionProps = {
  education: Education;
  certifications: Certification[];
  languages: string[];
};

export function EducationSection({
  education,
  certifications,
  languages,
}: EducationSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Education & credentials
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Background
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-full border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-primary size-5" />
                  <CardTitle className="text-lg">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-semibold">{education.institution}</p>
                <p className="text-muted-foreground">{education.degree}</p>
                <p className="text-muted-foreground">
                  {education.startYear} — {education.endYear} · CGPA{" "}
                  {education.cgpa}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Focus: {education.focus}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <Card className="h-full border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Languages className="text-primary size-5" />
                  <CardTitle className="text-lg">Languages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-1.5 text-sm">
                  {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Separator className="my-10" />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="mb-4 text-lg font-semibold">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((c, i) => (
              <li
                key={`${c.name}-${i}`}
                className="border-border/80 border-b pb-4 last:border-0 last:pb-0"
              >
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
