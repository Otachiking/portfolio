import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-24">
      <div className="container-main text-center">
        <p className="mb-4 text-8xl font-bold text-primary">404</p>
        <h1 className="heading-2 mb-4">Project Not Found</h1>
        <p className="mb-8 text-text/70">
          The project you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border-2 border-primary bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            View All Projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-text/20 px-8 py-3 font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
