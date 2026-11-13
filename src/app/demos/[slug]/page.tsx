import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { demos, getDemo } from "@/lib/data/demos";
import { DemoPlayer } from "@/components/DemoPlayer";

export function generateStaticParams() {
  return demos.map(demo => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  if (!demo) notFound();

  return {
    title: `${demo.title.es} · Demo`,
    description: demo.description.es,
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getDemo(slug)) notFound();
  return <DemoPlayer slug={slug} />;
}
