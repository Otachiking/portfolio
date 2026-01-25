interface OverviewBlockProps {
  content: string;
}

export function OverviewBlock({ content }: OverviewBlockProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="body-large mb-4 last:mb-0 text-text/80">
          {paragraph.trim()}
        </p>
      ))}
    </div>
  );
}
