import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectRenderer } from '@/components/projects';
import { getProjectBySlug, getAllProjectSlugs, getContributors } from '@/lib';
import { Pill } from '@/components/ui';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This ensures that only pre-generated paths are valid
// Any other path will result in a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: 'article',
      publishedTime: project.date,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const contributors = getContributors();

  if (!project) {
    notFound();
  }

  // Get contributors for this project
  const projectContributors = contributors.filter((c) =>
    project.contributors.includes(c.id)
  );

  return (
    <article className="pt-16 pb-8 sm:pt-24 sm:pb-12" aria-labelledby="project-title">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm" role="list">
            <li>
              <Link
                href="/"
                className="text-text/60 underline underline-offset-2 transition-colors hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-text/40">
              /
            </li>
            <li>
              <Link
                href="/projects"
                className="text-text/60 underline underline-offset-2 transition-colors hover:text-primary"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-text/40">
              /
            </li>
            <li>
              <span className="text-text" aria-current="page">
                {project.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Thumbnail */}
        <figure className="mb-8">
          <div className="overflow-hidden border border-text/10 bg-text/5">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} project thumbnail`}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10">
                <div className="text-center">
                  <p className="text-4xl font-bold text-text/20">
                    {project.title.charAt(0)}
                  </p>
                  <p className="mt-2 text-sm text-text/40">
                    Add thumbnail image
                  </p>
                </div>
              </div>
            )}
          </div>
        </figure>

        {/* Project Header */}
        <header className="mb-8">
          <h1 id="project-title" className="heading-1 mb-4 text-balance">
            {project.title}
          </h1>

          {/* Meta row: Category, Label, Date */}
          <div className="flex flex-wrap items-center gap-3">
            <Pill label={project.category} variant="tag" size="sm" />
            <Pill label={project.project_type} variant="default" size="sm" />
            <span className="text-sm text-text/60">
              <time dateTime={project.date}>
                {new Date(project.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </time>
            </span>
          </div>
        </header>

        {/* Accordion Sections */}
        <div className="space-y-2">
          <ProjectRenderer
            sections={project.sections}
            project={project}
            contributors={projectContributors}
          />
        </div>

        {/* Back Navigation */}
        <nav
          className="mt-12 border-t border-text/10 pt-6"
          aria-label="Project navigation"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-text/70 transition-colors hover:text-primary"
          >
            <span
              className="transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ←
            </span>
            Back to all projects
          </Link>
        </nav>
      </div>
    </article>
  );
}
