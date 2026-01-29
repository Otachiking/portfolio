import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllProjects, getContributors } from '@/lib';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore all projects spanning UI/UX design, machine learning, and web development.',
};

function ProjectsLoading() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default function ProjectsPage() {
  const projects = getAllProjects();
  const contributors = getContributors();

  return (
    <section className="py-16 sm:py-24" aria-labelledby="projects-heading">
      <div className="container-main">
        {/* Page Header */}
        <header className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Work
          </p>
          <h1 id="projects-heading" className="heading-1 mb-4">
            All Projects
          </h1>
          <p className="max-w-2xl text-lg text-text/70">
            A collection of work spanning UI/UX design, data science & machine
            learning, and modern web development. Each project represents a unique
            challenge and learning opportunity.
          </p>
        </header>

        {/* Client-side filtering wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsClient projects={projects} contributors={contributors} />
        </Suspense>
      </div>
    </section>
  );
}
