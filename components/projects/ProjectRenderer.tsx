import {
  OverviewBlock,
  ImageBlock,
  GalleryBlock,
  ProcessBlock,
  OutcomeBlock,
  InsightsBlock,
  VideoBlock,
  DemoBlock,
} from './blocks';
import { AccordionSection } from '@/components/ui';
import type { Section, Project, Contributor } from '@/lib/types';
import { Avatar } from '@/components/ui';

interface ProjectRendererProps {
  sections: Section[];
  project: Project;
  contributors: Contributor[];
}

// Section configuration for accordion behavior
const SECTION_CONFIG: Record<string, { title: string; defaultOpen: boolean; order: number }> = {
  overview: { title: 'Overview', defaultOpen: true, order: 1 },
  video: { title: 'Video Demonstration', defaultOpen: true, order: 2 },
  demo: { title: 'Demo — Try it Yourself!', defaultOpen: false, order: 3 },
  process: { title: 'Process', defaultOpen: false, order: 4 },
  gallery: { title: 'Gallery', defaultOpen: false, order: 5 },
  outcome: { title: 'Evaluation — Outcome', defaultOpen: false, order: 6 },
  insights: { title: 'Evaluation — Insights', defaultOpen: false, order: 7 },
  image: { title: 'Image', defaultOpen: false, order: 8 },
};

function hasContent(section: Section): boolean {
  switch (section.type) {
    case 'overview':
    case 'process':
    case 'insights':
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

  return (
    <div className="space-y-4">
      {sortedSections.map((section, index) => {
        const key = `${section.type}-${index}`;
        const config = SECTION_CONFIG[section.type] || { 
          title: section.title || section.type, 
          defaultOpen: false 
        };

        const sectionContent = renderSectionContent(section);
        if (!sectionContent) return null;

        return (
          <AccordionSection
            key={key}
            title={section.title || config.title}
            defaultOpen={config.defaultOpen}
          >
            {sectionContent}
          </AccordionSection>
        );
      })}

      {/* Team Section - Always at the end if contributors exist */}
      {contributors.length > 0 && (
        <AccordionSection title="Team" defaultOpen={false}>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wide text-text/60">
              Contributors
            </h3>
            <ul className="space-y-3">
              {contributors.map((contributor) => (
                <li key={contributor.id}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      contributor={contributor}
                      size="sm"
                      showPopover={false}
                    />
                    <div>
                      {contributor.linkedin ? (
                        <a
                          href={contributor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-text underline underline-offset-2 transition-colors hover:text-primary"
                        >
                          {contributor.name}
                          <span className="sr-only">(opens in new tab)</span>
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-text">
                          {contributor.name}
                        </span>
                      )}
                      {contributor.role && (
                        <p className="text-xs text-text/60">{contributor.role}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AccordionSection>
      )}

      {/* Tags Section */}
      {project.tags && project.tags.length > 0 && (
        <AccordionSection title="Tags & Technologies" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-text/20 bg-text/5 px-3 py-1 text-sm text-text/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </AccordionSection>
      )}
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

    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
}
