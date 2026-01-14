'use client';

import { useState, useMemo } from 'react';
import { CardProject, Pill } from '@/components/ui';
import type { Project, Contributor, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';

interface ProjectsClientProps {
  projects: Project[];
  contributors: Contributor[];
}

export function ProjectsClient({ projects, contributors }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      {/* Filter Pills */}
      <nav
        className="mb-12"
        role="navigation"
        aria-label="Project category filter"
      >
        <ul className="flex flex-wrap gap-3" role="list">
          {CATEGORIES.map((category) => (
            <li key={category} role="listitem">
              <Pill
                label={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Results count */}
      <p className="mb-8 text-sm text-text/60" aria-live="polite" aria-atomic="true">
        Showing {filteredProjects.length} project
        {filteredProjects.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
      </p>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Projects"
        >
          {filteredProjects.map((project) => (
            <div key={project.slug} role="listitem">
              <CardProject project={project} contributors={contributors} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-text/60">
            No projects found in this category.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className="mt-4 text-primary hover:underline focus:underline"
          >
            View all projects
          </button>
        </div>
      )}
    </>
  );
}
