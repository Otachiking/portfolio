import {
  OverviewBlock,
  ImageBlock,
  GalleryBlock,
  ProcessBlock,
  OutcomeBlock,
  InsightsBlock,
} from './blocks';
import type { Section } from '@/lib/types';

interface ProjectRendererProps {
  sections: Section[];
}

export function ProjectRenderer({ sections }: ProjectRendererProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const key = `${section.type}-${index}`;

        switch (section.type) {
          case 'overview':
            return <OverviewBlock key={key} content={section.content || ''} />;

          case 'process':
            return <ProcessBlock key={key} content={section.content || ''} />;

          case 'image':
            return (
              <ImageBlock
                key={key}
                src={section.src || ''}
                alt={section.alt || ''}
                caption={section.caption}
              />
            );

          case 'gallery':
            return (
              <GalleryBlock
                key={key}
                images={section.images || []}
              />
            );

          case 'outcome':
            return (
              <OutcomeBlock
                key={key}
                metrics={section.metrics}
                content={section.content || ''}
              />
            );

          case 'insights':
            return <InsightsBlock key={key} content={section.content || ''} />;

          default:
            console.warn(`Unknown section type: ${section.type}`);
            return null;
        }
      })}
    </div>
  );
}
