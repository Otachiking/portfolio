import type { ReactElement } from 'react';

interface DetailBlockProps {
  content: string;
}

export function DetailBlock({ content }: DetailBlockProps) {
  // Parse markdown-like content with bold headers
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const elements: ReactElement[] = [];
    let currentParagraph: string[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="mb-4 text-text/80">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        // Bold header
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="mb-4 text-text/80">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <h3 key={`h-${index}`} className="mb-2 mt-6 font-semibold text-text">
            {trimmedLine.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ')) {
        // List item
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="mb-4 text-text/80">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <li key={`li-${index}`} className="ml-4 text-text/80">
            {trimmedLine.substring(2)}
          </li>
        );
      } else {
        currentParagraph.push(trimmedLine);
      }
    });

    if (currentParagraph.length > 0) {
      elements.push(
        <p key="final" className="mb-4 text-text/80">
          {currentParagraph.join(' ')}
        </p>
      );
    }

    return elements;
  };

  return (
    <div className="space-y-2">{parseContent(content)}</div>
  );
}
