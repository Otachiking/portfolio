import {
  OverviewBlock,
  ImageBlock,
  GalleryBlock,
  ProcessBlock,
  OutcomeBlock,
  InsightsBlock,
  VideoBlock,
  DemoBlock,
  FeaturesBlock,
} from './blocks';
import { AccordionSection } from '@/components/ui';
import type { Section, Project, Contributor } from '@/lib/types';

interface ProjectRendererProps {
  sections: Section[];
  project: Project;
  contributors: Contributor[];
}

// Section configuration for accordion behavior
// Order: Overview, Interactive App (demo), Features, Video, Process, Outcome, Insights, Gallery
// Default open: Overview and Interactive App. If no Interactive App, Video is opened too.
const SECTION_CONFIG: Record<string, { title: string; order: number }> = {
  overview: { title: 'Overview', order: 1 },
  demo: { title: 'Interactive App', order: 2 },
  features: { title: 'Features', order: 3 },
  video: { title: 'Video', order: 4 },
  process: { title: 'Process', order: 5 },
  outcome: { title: 'Outcome', order: 6 },
  insights: { title: 'Insights', order: 7 },
  gallery: { title: 'Gallery', order: 8 },
  image: { title: 'Image', order: 9 },
};

function hasContent(section: Section): boolean {
  switch (section.type) {
    case 'overview':
    case 'process':
    case 'insights':
    case 'features':
      return Boolean(section.content?.trim());
    case 'video':
    case 'demo':
      return Boolean(section.url?.trim());
    case 'image':
      return Boolean(section.src?.trim());
    case 'gallery':
      return Boolean(section.images && section.images.length > 0);
    case 'outcome':
      return Boolean(section.content?.trim() || (section.metrics && section.metrics.length > 0));
    default:
      return true;
  }
}

export function ProjectRenderer({ sections, project, contributors }: ProjectRendererProps) {
  // Sort sections by configured order
  const sortedSections = [...sections]
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
  );
}

function renderSectionContent(section: Section): React.ReactNode {
  switch (section.type) {
    case 'overview':
      return <OverviewBlock content={section.content || ''} />;

    case 'process':
      return <ProcessBlock content={section.content || ''} />;

    case 'image':
      return (
        <ImageBlock
          src={section.src || ''}
          alt={section.alt || ''}
          caption={section.caption}
        />
      );

    case 'gallery':
      return <GalleryBlock images={section.images || []} />;

    case 'outcome':
      return (
        <OutcomeBlock
          metrics={section.metrics}
          content={section.content || ''}
        />
      );

    case 'insights':
      return <InsightsBlock content={section.content || ''} />;

    case 'video':
      return <VideoBlock url={section.url || ''} title={section.title} />;

    case 'demo':
      return <DemoBlock url={section.url || ''} title={section.title} />;

    case 'features':
      return <FeaturesBlock content={section.content || ''} />;

    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
