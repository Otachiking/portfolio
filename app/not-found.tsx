import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-24">
      <div className="container-main text-center">
        <p className="mb-4 text-8xl font-bold text-primary">404</p>
        <h1 className="heading-2 mb-4">Page Not Found</h1>
        <p className="mb-8 text-text/70">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center border-2 border-primary bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
