import {
  OverviewBlock,
  ImageBlock,
  GalleryBlock,
  DetailBlock,
  VideoBlock,
  DemoBlock,
  WIPBlock,
} from './blocks';
import { AccordionSection } from '@/components/ui';
import type { Section, Project, Contributor } from '@/lib/types';

interface ProjectRendererProps {
  sections: Section[];
  project: Project;
  contributors: Contributor[];
}

// Section configuration for accordion behavior
// Order: Overview, Demo App, Video, Detail
// Default open: Overview and Demo App. If no Demo App, Video is opened too.
// Note: Gallery is rendered separately (not in accordion)
const SECTION_CONFIG: Record<string, { title: string; order: number }> = {
  overview: { title: 'Overview', order: 1 },
  demo: { title: 'Demo App', order: 2 },
  video: { title: 'Video', order: 3 },
  detail: { title: 'Detail', order: 4 },
  image: { title: 'Image', order: 5 },
  wip: { title: 'Coming Soon', order: 6 },
};

function hasContent(section: Section): boolean {
  switch (section.type) {
    case 'overview':
    case 'detail':
      return Boolean(section.content?.trim());
    case 'video':
    case 'demo':
      return Boolean(section.url?.trim());
    case 'image':
      return Boolean(section.src?.trim());
    case 'gallery':
      return Boolean(section.images && section.images.length > 0);
    case 'wip':
      return true; // WIP sections always show
    default:
      return true;
  }
}

export function ProjectRenderer({ sections, project, contributors }: ProjectRendererProps) {
  // Separate gallery sections from accordion sections
  const gallerySections = sections.filter(s => s.type === 'gallery' && hasContent(s));
  const accordionSections = sections.filter(s => s.type !== 'gallery');

  // Sort accordion sections by configured order
  const sortedSections = [...accordionSections]
    .filter(hasContent)
    .sort((a, b) => {
      const orderA = SECTION_CONFIG[a.type]?.order ?? 99;
      const orderB = SECTION_CONFIG[b.type]?.order ?? 99;
      return orderA - orderB;
    });

  // Check if there's a demo section with content
  const hasDemo = sortedSections.some(s => s.type === 'demo');

  // Determine which sections should be open by default
  // Overview and Interactive App (demo) are always open if they have content
  // Video is opened only if there's no Interactive App
  const getDefaultOpen = (sectionType: string): boolean => {
    if (sectionType === 'overview') return true;
    if (sectionType === 'demo') return true;
    if (sectionType === 'video' && !hasDemo) return true;
    return false;
  };

  // Track index for alternating colors across all accordions
  let accordionIndex = 0;

  return (
    <div>
      {/* Accordion Sections */}
      <div className="space-y-2">
        {sortedSections.map((section, index) => {
          const key = `${section.type}-${index}`;
          const config = SECTION_CONFIG[section.type] || { 
            title: section.title || section.type
          };

          const sectionContent = renderSectionContent(section);
          if (!sectionContent) return null;

          const variant = accordionIndex % 2 === 0 ? 'primary' : 'secondary';
          accordionIndex++;

          // Use section.title if provided (e.g., "Video"), otherwise use config title
          const displayTitle = section.title || config.title;

          return (
            <AccordionSection
              key={key}
              title={displayTitle}
              defaultOpen={getDefaultOpen(section.type)}
              variant={variant}
            >
              {sectionContent}
            </AccordionSection>
          );
        })}
      </div>

      {/* Gallery Sections - Rendered separately, not in accordion */}
      {gallerySections.map((section, index) => (
        <GalleryBlock 
          key={`gallery-${index}`}
          images={section.images || []} 
          title={section.title || 'Gallery'}
        />
      ))}
    </div>
  );
}

function renderSectionContent(section: Section): React.ReactNode {
  switch (section.type) {
    case 'overview':
      return <OverviewBlock content={section.content || ''} />;

    case 'detail':
      return <DetailBlock content={section.content || ''} />;

    case 'image':
      return (
        <ImageBlock
          src={section.src || ''}
          alt={section.alt || ''}
          caption={section.caption}
        />
      );

    case 'video':
      return <VideoBlock url={section.url || ''} title={section.title} />;

    case 'demo':
      return <DemoBlock url={section.url || ''} title={section.title} />;

    case 'wip':
      return <WIPBlock title={section.title} message={section.wipMessage} />;

    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
