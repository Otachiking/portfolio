import Link from 'next/link';
import { CardProject, CertificatesSection } from '@/components/ui';
import { HeroSection } from '@/components/hero';
import { getBestProjects, getContributors, getCertificates } from '@/lib';

export default function HomePage() {
  const projects = getBestProjects(6);
  const contributors = getContributors();
  const certificates = getCertificates();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Work Section */}
      <section
        className="py-24"
        aria-labelledby="featured-heading"
      >
        <div className="container-main">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
                Featured
              </p>
              <h2 id="featured-heading" className="heading-2">
                Selected Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-text/70 transition-colors hover:text-primary"
            >
              View all projects
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>

          <div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Featured projects"
          >
            {projects.map((project) => (
              <div key={project.slug} role="listitem">
                <CardProject project={project} contributors={contributors} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills/Categories Section */}
      <section
        className="border-t border-text/10 bg-card-bg py-24"
        aria-labelledby="skills-heading"
      >
        <div className="container-main">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
              Expertise
            </p>
            <h2 id="skills-heading" className="heading-2">
              Areas of Focus
            </h2>
          </div>

          <div
            className="grid gap-8 md:grid-cols-3"
            role="list"
            aria-label="Areas of expertise"
          >
            <div
              className="border border-text/10 bg-background p-8"
              role="listitem"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center bg-primary text-2xl text-white"
                aria-hidden="true"
              >
                🎨
              </div>
              <h3 className="heading-3 mb-3">UI/UX & Web</h3>
              <p className="text-text/70">
                User-centered design and modern web development. From research and prototypes
                to production-ready React and Next.js applications.
              </p>
            </div>

            <div
              className="border border-text/10 bg-background p-8"
              role="listitem"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center bg-secondary text-2xl text-white"
                aria-hidden="true"
              >
                🤖
              </div>
              <h3 className="heading-3 mb-3">AI & Machine Learning</h3>
              <p className="text-text/70">
                Intelligent systems from computer vision to NLP and generative AI. 
                Building ML solutions that solve real-world problems.
              </p>
            </div>

            <div
              className="border border-text/10 bg-background p-8"
              role="listitem"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center bg-text text-2xl text-white"
                aria-hidden="true"
              >
                📊
              </div>
              <h3 className="heading-3 mb-3">Data Analysis & Visualization</h3>
              <p className="text-text/70">
                Transforming raw data into actionable insights through analysis, 
                storytelling, and interactive visualizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CertificatesSection certificates={certificates} />

      {/* CTA Section */}
      <section
        className="py-24 transition-all duration-500"
        aria-labelledby="cta-heading"
      >
        <div className="container-main text-center">
          <h2 id="cta-heading" className="heading-2 mb-4">
            Interested in working together?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-text/70">
            Always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center border-2 border-primary bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
