import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project, Contributor, Quote, Certificate } from './types';

const projectsDirectory = path.join(process.cwd(), 'data/projects');
const contributorsPath = path.join(process.cwd(), 'data/contributors.json');
const quotesPath = path.join(process.cwd(), 'data/quotes.json');
const certificatesPath = path.join(process.cwd(), 'data/certificates.json');

export function getContributors(): Contributor[] {
  const fileContents = fs.readFileSync(contributorsPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllProjects(): Project[] {
  // Get all markdown files from the projects directory
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse the frontmatter
      const { data } = matter(fileContents);

      return {
        title: data.title,
        slug: data.slug,
        date: data.date,
        category: data.category,
        project_type: data.project_type,
        thumbnail: data.thumbnail,
        excerpt: data.excerpt,
        contributors: data.contributors || [],
        tags: data.tags || [],
        techStack: data.techStack || [],
        links: data.links || data.deliverables || undefined,
        sections: data.sections || [],
        featured: data.featured || false,
      } as Project;
    });

  // Sort projects by date (newest first)
  return allProjects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const fileNames = fs.readdirSync(projectsDirectory);

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (data.slug === slug) {
      return {
        title: data.title,
        slug: data.slug,
        date: data.date,
        category: data.category,
        project_type: data.project_type,
        thumbnail: data.thumbnail,
        excerpt: data.excerpt,
        contributors: data.contributors || [],
        tags: data.tags || [],
        techStack: data.techStack || [],
        links: data.links || data.deliverables || undefined,
        sections: data.sections || [],
        featured: data.featured || false,
        content,
      } as Project;
    }
  }

  return null;
}

export function getAllProjectSlugs(): string[] {
  const projects = getAllProjects();
  return projects.map((project) => project.slug);
}

export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects();

  if (category === 'All') {
    return allProjects;
  }

  return allProjects.filter((project) => project.category === category);
}

export function getBestProjects(count: number = 3): Project[] {
  const allProjects = getAllProjects();
  // Prioritize featured projects in specific order: AI-Desa, FiFuFa, Amazon
  const priorityOrder = ['ai-desa-ocr-kk', 'fifufa-fun-facts-generator', 'amazon-network-analysis'];
  const featuredProjects = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.slug);
      const bIndex = priorityOrder.indexOf(b.slug);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  const otherProjects = allProjects.filter((p) => !p.featured);
  return [...featuredProjects, ...otherProjects].slice(0, count);
}

export function getQuotes(): Quote[] {
  const fileContents = fs.readFileSync(quotesPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getCertificates(): Certificate[] {
  const fileContents = fs.readFileSync(certificatesPath, 'utf8');
  return JSON.parse(fileContents);
}
