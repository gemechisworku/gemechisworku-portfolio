import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return { title: project.title };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/#work"
        className="text-muted-foreground hover:text-foreground hover:bg-muted/80 -ml-2 mb-8 inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>
      <p className="text-muted-foreground text-sm font-medium">
        {project.association}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        {project.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      {project.body ? (
        <div className="text-muted-foreground mt-10 space-y-4 text-base leading-relaxed [&_p]:leading-relaxed">
          <ReactMarkdown>{project.body}</ReactMarkdown>
        </div>
      ) : null}
    </article>
  );
}
