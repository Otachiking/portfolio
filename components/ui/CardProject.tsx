import Link from 'next/link';
import { Avatar } from './Avatar';
import type { Project, Contributor } from '@/lib/types';

interface CardProjectProps {
  project: Project;
  contributors: Contributor[];
}

/**
 * Calculate how many tags can fit in approximately 280px width
 * Average tag: ~8px padding + ~6px per character + 6px gap
 * "+X" indicator: ~24px
 * We want to keep it to 1 line
 */
function getVisibleTagCount(tags: string[], maxWidth: number = 280): number {
  const tagPadding = 20; // px-2 = 8px * 2 + border
  const charWidth = 6; // approximate width per character at text-xs
  const gap = 6; // gap-1.5
  const plusIndicatorWidth = 28; // "+X" text width
  
  let currentWidth = 0;
  let count = 0;
  
  for (let i = 0; i < tags.length; i++) {
    const tagWidth = tagPadding + (tags[i].length * charWidth);
    const needsIndicator = i < tags.length - 1;
    const requiredSpace = tagWidth + (needsIndicator ? plusIndicatorWidth : 0);
    
    if (currentWidth + tagWidth + gap > maxWidth && count > 0) {
      break;
    }
    
    currentWidth += tagWidth + gap;
    count++;
  }
  
  return Math.max(1, count); // At least 1 tag
}

export function CardProject({ project, contributors }: CardProjectProps) {
  const projectContributors = contributors.filter((c) =>
    project.contributors.includes(c.id)
  );
  
  const visibleTagCount = getVisibleTagCount(project.tags);
  const visibleTags = project.tags.slice(0, visibleTagCount);
  const remainingCount = project.tags.length - visibleTagCount;

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
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-text/70">
          {project.excerpt}
        </p>

        {/* Tags - clickable, purple, dynamic count */}
        <div
          className="mb-4 flex flex-nowrap items-center gap-1.5 overflow-hidden"
          role="list"
          aria-label="Project tags"
        >
          {visibleTags.map((tag) => (
            <Link 
              key={tag} 
              href={`/projects?q=${encodeURIComponent(tag)}`}
              role="listitem"
              className="inline-flex items-center justify-center font-medium transition-all border px-2 py-0.5 text-xs bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 hover:border-secondary/40 whitespace-nowrap flex-shrink-0"
            >
              {tag}
            </Link>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-text/40 whitespace-nowrap flex-shrink-0">
              +{remainingCount}
            </span>
          )}
        </div>

        {/* Contributors */}
        {projectContributors.length > 0 && (
          <div className="flex items-center border-t border-text/10 pt-4">
            <div
              className="flex gap-1"
              role="list"
              aria-label="Contributors"
            >
              {projectContributors.map((contributor) => (
                <span key={contributor.id} role="listitem">
                  <Avatar contributor={contributor} size="sm" />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
