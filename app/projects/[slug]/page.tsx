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
          <h1 id="project-title" className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-2 text-balance">
            {project.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg italic text-text/70 mb-6">
            {project.excerpt}
          </p>

          {/* Meta row with labels and attachment buttons - same row on desktop */}
          <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            {/* Left: Category, Label, Date */}
            <div className="flex flex-wrap items-center gap-2">
              <Pill label={project.category} variant="tag" size="md" />
              <Pill label={project.project_type} variant="default" size="md" />
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

            {/* Right on desktop, below on mobile: Hotbar buttons */}
            {project.links && (() => {
              const linkCount = [project.links.liveApp, project.links.video, project.links.github || project.links.source, project.links.paper].filter(Boolean).length;
              return (
                <div 
                  className="grid gap-2 sm:flex sm:gap-2"
                  style={{ gridTemplateColumns: `repeat(${linkCount}, 1fr)` }}
                >
                  {project.links.liveApp && (
                    <a
                      href={project.links.liveApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 min-h-[44px] px-3 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 transition-colors sm:flex-row-reverse sm:min-h-0 sm:py-1.5 sm:gap-1.5"
                    >
                      <span className="material-icons" style={{ fontSize: '20px' }}>star</span>
                      <span>Demo</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                  {project.links.video && (
                    <a
                      href={project.links.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 min-h-[44px] px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors sm:flex-row-reverse sm:min-h-0 sm:py-1.5 sm:gap-1.5"
                    >
                      <span className="material-icons" style={{ fontSize: '20px' }}>play_arrow</span>
                      <span>Video</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                  {(project.links.github || project.links.source) && (
                    <a
                      href={project.links.source || project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 min-h-[44px] px-3 py-2 text-sm font-medium text-white bg-dark-grey hover:bg-dark-grey/80 transition-colors sm:flex-row-reverse sm:min-h-0 sm:py-1.5 sm:gap-1.5"
                    >
                      <span className="material-icons" style={{ fontSize: '20px' }}>folder</span>
                      <span>Source</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 min-h-[44px] px-3 py-2 text-sm font-medium text-text border border-text/30 bg-light-grey hover:bg-light-grey/80 transition-colors sm:flex-row-reverse sm:min-h-0 sm:py-1.5 sm:gap-1.5"
                    >
                      <span className="material-icons" style={{ fontSize: '20px' }}>description</span>
                      <span>Paper</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                </div>
              );
            })()}
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
              {/* Tech Stack - dark grey pills using CSS variable */}
              {project.techStack && project.techStack.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text/50 mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium bg-dark-grey/20 text-text border border-dark-grey/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags - purple pills using secondary color */}
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
