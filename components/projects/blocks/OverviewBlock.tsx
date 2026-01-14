interface OverviewBlockProps {
  content: string;
}

export function OverviewBlock({ content }: OverviewBlockProps) {
  return (
    <section className="mb-12" aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="heading-2 mb-6 border-l-4 border-primary pl-4"
      >
        Overview
      </h2>
      <div className="prose prose-lg max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="body-large mb-4 text-text/80">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </section>
  );
}
