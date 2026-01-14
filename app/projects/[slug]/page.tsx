import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectRenderer, ProjectMeta } from '@/components/projects';
import { getProjectBySlug, getAllProjectSlugs, getContributors } from '@/lib';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

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

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  const contributors = getContributors();

  if (!project) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-24" aria-labelledby="project-title">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm" role="list">
            <li>
              <Link
                href="/"
                className="text-text/60 transition-colors hover:text-primary"
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
                className="text-text/60 transition-colors hover:text-primary"
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

        {/* Project Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-text/60">
            <span>{project.category}</span>
            <span aria-hidden="true">•</span>
            <span>{project.project_type}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          <h1 id="project-title" className="heading-1 mb-4 text-balance">
            {project.title}
          </h1>
          <p className="max-w-3xl text-xl text-text/70">{project.excerpt}</p>
        </header>

        {/* Hero Image */}
        {project.thumbnail && (
          <figure className="mb-16">
            <div className="overflow-hidden border border-text/10 bg-text/5">
              <img
                src={project.thumbnail}
                alt={`${project.title} project thumbnail`}
                className="aspect-video w-full object-cover"
              />
            </div>
          </figure>
        )}

        {/* Content Layout */}
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="min-w-0">
            <ProjectRenderer sections={project.sections} />
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ProjectMeta project={project} contributors={contributors} />
          </aside>
        </div>

        {/* Navigation */}
        <nav className="mt-16 border-t border-text/10 pt-8" aria-label="Project navigation">
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
