import { notFound } from "next/navigation";
import { projectsMeta, getProjectMeta } from "@/lib/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";

export function generateStaticParams() {
  return projectsMeta.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getProjectMeta(slug);

  if (!meta) {
    notFound();
  }

  return <ProjectDetail slug={slug} />;
}
