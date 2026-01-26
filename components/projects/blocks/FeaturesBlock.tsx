interface FeaturesBlockProps {
  content: string;
}

export function FeaturesBlock({ content }: FeaturesBlockProps) {
  // Parse markdown-like content into structured elements
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-2 mb-4 text-text/80 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-text/80">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      flushList();
      return;
    }

    // Heading 3 (###)
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-text mt-6 mb-3 first:mt-0">
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    // Heading 4 (####)
    if (trimmed.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={key++} className="text-base font-semibold text-text mt-4 mb-2">
          {trimmed.slice(5)}
        </h4>
      );
      return;
    }

    // Bold heading (**text**)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      flushList();
      elements.push(
        <h4 key={key++} className="text-base font-semibold text-text mt-4 mb-2">
          {trimmed.slice(2, -2)}
        </h4>
      );
      return;
    }

    // List item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={key++} className="body-base mb-4 last:mb-0 text-text/80">
        {trimmed}
      </p>
    );
  });

  flushList();

  return (
    <div className="prose prose-lg max-w-none">
      {elements}
    </div>
  );
}
