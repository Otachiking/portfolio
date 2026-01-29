'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CardProject, Pill } from '@/components/ui';
import type { Project, Contributor, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';

interface ProjectsClientProps {
  projects: Project[];
  contributors: Contributor[];
}

export function ProjectsClient({ projects, contributors }: ProjectsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category') as Category;
    if (q) setSearchQuery(q);
    if (category && CATEGORIES.includes(category)) setActiveCategory(category);
  }, [searchParams]);

  // Update URL when search changes
  const updateURL = (query: string, category: Category) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'All') params.set('category', category);
    const newURL = params.toString() ? `/projects?${params.toString()}` : '/projects';
    router.replace(newURL, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(value, activeCategory);
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    updateURL(searchQuery, category);
  };

  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter((project) => project.category === activeCategory);
    }

    // Filter by search query (title, project_type/label, tags)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(query);
        const labelMatch = project.project_type.toLowerCase().includes(query);
        const tagMatch = project.tags.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || labelMatch || tagMatch;
      });
    }

    return result;
  }, [projects, activeCategory, searchQuery]);

  return (
    <>
      {/* Search Bar and Category Pills in one row */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar - Left */}
        <div className="relative flex-1 max-w-md">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text/40">
            search
          </span>
          <input
            type="text"
            placeholder="Search by title, label, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
            aria-label="Search projects"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-text transition-colors"
              aria-label="Clear search"
            >
              <span className="material-icons text-xl">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills - Right */}
        <nav role="navigation" aria-label="Project category filter">
          <ul className="flex flex-wrap gap-2" role="list">
            {CATEGORIES.map((category) => (
              <li key={category} role="listitem">
                <Pill
                  label={category}
                  isActive={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Results count */}
      <p className="mb-8 text-sm text-text/60" aria-live="polite" aria-atomic="true">
        Showing {filteredProjects.length} project
        {filteredProjects.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {searchQuery && ` matching "${searchQuery}"`}
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
            No projects found{searchQuery && ` for "${searchQuery}"`}.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              updateURL('', 'All');
            }}
            className="mt-4 text-primary hover:underline focus:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
