export interface Contributor {
  id: string;
  name: string;
  linkedin?: string;
  photo?: string;
}

export interface Metric {
  name: string;
  value: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Section {
  type: 'overview' | 'process' | 'image' | 'gallery' | 'outcome' | 'insights' | 'video' | 'demo' | 'features';
  title?: string;
  content?: string;
  src?: string;
  alt?: string;
  caption?: string;
  images?: GalleryImage[];
  metrics?: Metric[];
  url?: string; // For video embeds (YouTube) or demo iframe URLs
}

export interface ProjectLinks {
  liveApp?: string;
  video?: string;
  github?: string;
  source?: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  project_type: string;
  thumbnail: string;
  excerpt: string;
  contributors: string[];
  tags: string[];
  techStack?: string[];
  links?: ProjectLinks;
  sections: Section[];
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
  content?: string;
}

export type Category = 'All' | 'UI/UX' | 'AI/ML & Data' | 'Web Dev';

export const CATEGORIES: Category[] = ['All', 'UI/UX', 'AI/ML & Data', 'Web Dev'];

export interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
  context?: string;
}
