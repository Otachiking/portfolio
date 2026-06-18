import Link from 'next/link';
import type { Project, Contributor } from '@/lib/types';

interface CardProjectProps {
  project: Project;
  contributors: Contributor[];
}

export function CardProject({ project, contributors: _contributors }: CardProjectProps) {
  return (
    <article
      className="group flex h-full flex-col border border-text/10 bg-card-bg transition-all hover:border-primary/50"
      aria-labelledby={`project-title-${project.slug}`}
    >
      {/* Thumbnail */}
      <Link
        href={`/projects/${project.slug}`}
        className="block aspect-video overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative h-full w-full bg-text/5">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl font-bold text-text/20" aria-hidden="true">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category & Date */}
        <div className="mb-3 flex items-center justify-between text-xs text-text/60">
          <Link
            href={`/projects?q=${encodeURIComponent(project.category)}`}
            className="hover:text-primary transition-colors"
          >
            {project.category}
          </Link>
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </time>
        </div>

        {/* Title */}
        <h3
          id={`project-title-${project.slug}`}
          className="heading-3 mb-2 transition-colors group-hover:text-primary"
        >
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            {project.title}
            <span className="sr-only">, view project details</span>
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="line-clamp-2 flex-1 text-sm text-text/70">
          {project.excerpt}
        </p>
      </div>
    </article>
  );
}
