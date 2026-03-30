import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { WorkSection } from "@/components/sections/work-section";
import { StackSection } from "@/components/sections/stack-section";
import { EducationSection } from "@/components/sections/education-section";
import {
  getSite,
  getImpactMetrics,
  getExperiences,
  getProjects,
  getSkills,
  getCertifications,
  getEducation,
} from "@/lib/content";

export default async function Home() {
  const [
    site,
    metrics,
    experiences,
    projects,
    skills,
    certifications,
    education,
  ] = await Promise.all([
    getSite(),
    getImpactMetrics(),
    getExperiences(),
    getProjects(),
    getSkills(),
    getCertifications(),
    getEducation(),
  ]);

  const projectCards = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    technologies: p.technologies,
    association: p.association,
    iconKey: p.iconKey,
    accent: p.accent,
  }));

  return (
    <>
      <HeroSection
        role={site.role}
        headline={site.headline}
        subheadline={site.subheadline}
      />
      <ImpactSection metrics={metrics} />
      <ExperienceSection experiences={experiences} />
      <WorkSection projects={projectCards} />
      <StackSection skills={skills} />
      <EducationSection
        education={education}
        certifications={certifications}
        languages={site.languages}
      />
    </>
  );
}
