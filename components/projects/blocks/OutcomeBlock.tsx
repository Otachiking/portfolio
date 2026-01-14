interface Metric {
  name: string;
  value: string;
}

interface OutcomeBlockProps {
  metrics?: Metric[];
  content: string;
}

export function OutcomeBlock({ metrics, content }: OutcomeBlockProps) {
  return (
    <section className="mb-12" aria-labelledby="outcome-heading">
      <h2
        id="outcome-heading"
        className="heading-2 mb-6 border-l-4 border-primary pl-4"
      >
        Outcome
      </h2>

      {/* Metrics Grid */}
      {metrics && metrics.length > 0 && (
        <div
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Project metrics"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="border border-text/10 bg-card-bg p-6 text-center"
              role="listitem"
            >
              <p className="text-3xl font-bold text-primary" aria-hidden="true">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-text/60">{metric.name}</p>
              <span className="sr-only">
                {metric.name}: {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-text/80">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </section>
  );
}
