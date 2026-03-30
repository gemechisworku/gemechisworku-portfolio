import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";

const contentDir = path.join(process.cwd(), "content");

const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  location: z.string(),
  phone: z.string(),
  email: z.string().email(),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    portfolio: z.string().url(),
  }),
  languages: z.array(z.string()),
});

const impactMetricSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  hint: z.string(),
  icon: z.enum(["trending", "shield", "users", "zap", "chart"]),
});

const skillsSchema = z.object({
  agents: z.array(z.string()),
  data: z.array(z.string()),
  platform: z.array(z.string()),
  productUi: z.array(z.string()),
  automation: z.array(z.string()),
});

const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startYear: z.number(),
  endYear: z.number(),
  cgpa: z.string(),
  focus: z.string(),
});

const experienceFrontmatterSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z
    .union([z.string(), z.literal("")])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  current: z.boolean(),
  order: z.number(),
  bullets: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return val;
      return val.map((item) =>
        typeof item === "string"
          ? item
          : (item as { bullet?: string }).bullet ?? String(item),
      );
    },
    z.array(z.string()),
  ),
});

const projectFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  technologies: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return val;
      return val.map((item) =>
        typeof item === "string"
          ? item
          : (item as { tech?: string }).tech ?? String(item),
      );
    },
    z.array(z.string()),
  ),
  association: z.string(),
  order: z.number(),
  featured: z.boolean(),
  iconKey: z.enum([
    "bot",
    "network",
    "credit",
    "sparkles",
    "database",
    "chart",
    "container",
  ]),
  accent: z.enum(["violet", "cyan", "amber", "emerald", "rose", "slate"]),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type ImpactMetric = z.infer<typeof impactMetricSchema>;
export type SkillsContent = z.infer<typeof skillsSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ExperienceEntry = z.infer<typeof experienceFrontmatterSchema> & {
  id: string;
};
export type ProjectEntry = z.infer<typeof projectFrontmatterSchema> & {
  body: string;
};

export const getSite = cache(async (): Promise<SiteContent> => {
  const raw = fs.readFileSync(path.join(contentDir, "site.json"), "utf8");
  return siteSchema.parse(JSON.parse(raw));
});

export const getImpactMetrics = cache(async (): Promise<ImpactMetric[]> => {
  const raw = fs.readFileSync(
    path.join(contentDir, "impact-metrics.json"),
    "utf8",
  );
  const data = JSON.parse(raw) as unknown;
  return z.array(impactMetricSchema).parse(data);
});

export const getSkills = cache(async (): Promise<SkillsContent> => {
  const raw = fs.readFileSync(path.join(contentDir, "skills.json"), "utf8");
  return skillsSchema.parse(JSON.parse(raw));
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const raw = fs.readFileSync(
    path.join(contentDir, "certifications.json"),
    "utf8",
  );
  return z.array(certificationSchema).parse(JSON.parse(raw));
});

export const getEducation = cache(async (): Promise<Education> => {
  const raw = fs.readFileSync(path.join(contentDir, "education.json"), "utf8");
  return educationSchema.parse(JSON.parse(raw));
});

function readMarkdownDir<T>(
  subdir: string,
  schema: z.ZodType<T>,
  idFromFile: (name: string) => string,
): (T & { id: string })[] {
  const dir = path.join(contentDir, subdir);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const out: (T & { id: string })[] = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw);
    const parsed = schema.parse(data);
    out.push({ ...parsed, id: idFromFile(file.replace(/\.md$/, "")) });
  }
  return out;
}

export const getExperiences = cache(async (): Promise<ExperienceEntry[]> => {
  const list = readMarkdownDir(
    "experiences",
    experienceFrontmatterSchema,
    (id) => id,
  );
  return list.sort((a, b) => a.order - b.order);
});

export const getProjects = cache(async (): Promise<ProjectEntry[]> => {
  const dir = path.join(contentDir, "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const out: ProjectEntry[] = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const parsed = projectFrontmatterSchema.parse(data);
    out.push({ ...parsed, body: content.trim() });
  }
  return out.sort((a, b) => a.order - b.order);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectEntry | null> => {
    const projects = await getProjects();
    return projects.find((p) => p.slug === slug) ?? null;
  },
);
