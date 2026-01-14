import { Avatar } from '@/components/ui/Avatar';
import { Pill } from '@/components/ui/Pill';
import type { Project, Contributor } from '@/lib/types';

interface ProjectMetaProps {
  project: Project;
  contributors: Contributor[];
}

export function ProjectMeta({ project, contributors }: ProjectMetaProps) {
  const projectContributors = contributors.filter((c) =>
    project.contributors.includes(c.id)
  );

  return (
    <aside
      className="border border-text/10 bg-card-bg p-6"
      aria-label="Project metadata"
    >
      <h2 className="sr-only">Project Information</h2>

      <dl className="space-y-6">
        {/* Date */}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-text/50">
            Date
          </dt>
          <dd className="mt-1">
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </dd>
        </div>

        {/* Category */}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-text/50">
            Category
          </dt>
          <dd className="mt-1">{project.category}</dd>
        </div>

        {/* Project Type */}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-text/50">
            Project Type
          </dt>
          <dd className="mt-1">{project.project_type}</dd>
        </div>

        {/* Tags */}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wider text-text/50">
            Technologies
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2" role="list">
            {project.tags.map((tag) => (
              <span key={tag} role="listitem">
                <Pill label={tag} variant="tag" size="sm" />
              </span>
            ))}
          </dd>
        </div>

        {/* Contributors */}
        {projectContributors.length > 0 && (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-text/50">
              Contributors
            </dt>
            <dd className="mt-3 space-y-3" role="list">
              {projectContributors.map((contributor) => (
                <div
                  key={contributor.id}
                  className="flex items-center gap-3"
                  role="listitem"
                >
                  <Avatar contributor={contributor} size="md" />
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    {contributor.role && (
                      <p className="text-sm text-text/60">{contributor.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
