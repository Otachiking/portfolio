import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectRenderer } from '@/components/projects';
import { getProjectBySlug, getAllProjectSlugs, getContributors } from '@/lib';
import { Pill, Avatar } from '@/components/ui';

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
          <h1 id="project-title" className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4 text-balance">
            {project.title}
          </h1>

          {/* Meta row with labels and attachment buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            {/* Left: Category, Label, Date */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base font-medium text-text/80">Category:</span>
              <Pill label={project.category} variant="tag" size="md" />
              <span className="text-base font-medium text-text/80">Label:</span>
              <Pill label={project.project_type} variant="default" size="md" />
              <span className="text-base font-medium text-text/70">
                <time dateTime={project.date}>
                  {new Date(project.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </time>
              </span>
            </div>

            {/* Right: Attachment buttons */}
            {project.links && (
              <div className="flex items-center gap-2">
                {project.links.liveApp && (
                  <a
                    href={project.links.liveApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    Demo
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
                {project.links.video && (
                  <a
                    href={project.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Video
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
                {(project.links.github || project.links.source) && (
                  <a
                    href={project.links.source || project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-text/50 hover:bg-text/60 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
                    </svg>
                    Source
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                )}
              </div>
            )}
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

        {/* Contributors, Tech Stack, Tags - 2 Column Layout */}
        <div className="mt-10 border-t border-text/10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Contributors */}
            {projectContributors.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50 mb-4">
                  Contributors
                </h3>
                <div className="flex flex-col gap-3">
                  {projectContributors.map((contributor) => (
                    <a
                      key={contributor.id}
                      href={contributor.linkedin || '#'}
                      target={contributor.linkedin ? '_blank' : undefined}
                      rel={contributor.linkedin ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 p-2 -mx-2 transition-all hover:bg-text/5 group cursor-pointer"
                    >
                      <div className="transition-transform group-hover:scale-110">
                        <Avatar contributor={contributor} size="md" showPopover={false} />
                      </div>
                      <span className="font-medium text-text group-hover:text-primary transition-colors">
                        {contributor.name}
                        {contributor.linkedin && <span className="sr-only">(opens in new tab)</span>}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Right Column: Tech Stack & Tags */}
            <div className="flex flex-col gap-6">
              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium bg-card-bg text-text border border-text/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
