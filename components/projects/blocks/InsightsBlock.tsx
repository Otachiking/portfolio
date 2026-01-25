import type { ReactElement } from 'react';

interface InsightsBlockProps {
  content: string;
}

export function InsightsBlock({ content }: InsightsBlockProps) {
  // Parse markdown-like content
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const elements: ReactElement[] = [];
    let currentParagraph: string[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushParagraph = (index: number) => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-text/80">
            {currentParagraph.join(' ')}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (index: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="mb-4 ml-4 list-disc space-y-1">
            {listItems.map((item, i) => (
              <li key={i} className="text-text/80">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        flushParagraph(index);
        flushList(index);
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        flushParagraph(index);
        flushList(index);
        elements.push(
          <h3 key={`h-${index}`} className="mb-3 mt-6 font-semibold text-text">
            {trimmedLine.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ')) {
        flushParagraph(index);
        inList = true;
        listItems.push(trimmedLine.substring(2));
      } else {
        flushList(index);
        currentParagraph.push(trimmedLine);
      }
    });

    flushParagraph(lines.length);
    flushList(lines.length);

    return elements;
  };

  return (
    <div>{parseContent(content)}</div>
  );
}
