Execution brief — prompt ready to paste to GitHub Copilot (VSCode)

Tujuan: buat Draft-1 portfolio Next.js (App Router) yang clean, design-forward (Gen-Z aesthetic), accessible (WCAG), ringan (SSG), dan scalable (data-driven, block-based content). Hasil harus berupa project yang full implementation (folder terpisah, tidak single file), Tailwind + Plus Jakarta Sans, dark-mode ready, dan deployment-friendly untuk Vercel.

Gunakan prompt berikut sekali paste ke Copilot / chat-assistant dalam VSCode. Ia harus menghasilkan file/folder sesuai spesifikasi, sample data (3 project), dan dokumentasi singkat di repository root (README).

1) Ringkasan singkat untuk Copilot

Buat aplikasi Next.js menggunakan App Router dengan Static Site Generation (SSG). Styling pakai Tailwind CSS. Font: Plus Jakarta Sans. Implementasi harus modular, terstruktur, teruji minimal (lintable), dan aksesibilitas WCAG-aware. Data content disimpan statically dalam repo (markdown dengan frontmatter + centralized contributors JSON). Tidak ada admin CMS. Jangan menghasilkan desain generik AI — estetika bersih, typographic, warna sesuai variabel yang diberikan, dan radius square (no rounded corners).

2) Tech stack & libs (recommendasi yang harus di-install)

Next.js (App Router) — latest stable

React 18+

Tailwind CSS

gray-matter (parse frontmatter)

remark / remark-html (render markdown) or next-mdx-remote (optional)

clsx

date-fns (format tanggal) — optional

autoprefixer / postcss (via Tailwind setup)

eslint + prettier config (basic)

Semua build statically (getStaticPaths / getStaticProps equivalent in App Router: use generateStaticParams + fetch at build time).

3) Folder structure (required; create these files & folders)
/ (repo root)
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                 # Home / Landing (best 3 works)
│  ├─ projects/
│  │  ├─ page.tsx              # Projects listing + filter pills
│  │  └─ [slug]/
│  │     └─ page.tsx           # Project detail renderer (block-based)
├─ components/
│  ├─ ui/
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Pill.tsx
│  │  ├─ CardProject.tsx
│  │  ├─ Avatar.tsx           # avatar with initials fallback
│  │  └─ DarkModeToggle.tsx
│  ├─ projects/
│  │  ├─ ProjectRenderer.tsx  # reads sections[] and renders blocks
│  │  ├─ blocks/
│  │  │  ├─ OverviewBlock.tsx
│  │  │  ├─ ImageBlock.tsx
│  │  │  ├─ GalleryBlock.tsx
│  │  │  ├─ ProcessBlock.tsx
│  │  │  ├─ OutcomeBlock.tsx
│  │  │  └─ InsightsBlock.tsx
│  │  └─ ProjectMeta.tsx
├─ data/
│  ├─ contributors.json       # centralized people data
│  └─ projects/
│     ├─ 2025-xx-helmet.md
│     ├─ 2025-xx-dashboard.md
│     └─ 2025-xx-portfolio.md
├─ public/
│  └─ images/                 # placeholders and thumbnails
├─ styles/
│  └─ tailwind.css            # imports + custom util classes
├─ tailwind.config.js
├─ next.config.js
├─ package.json
└─ README.md

4) Data model (required examples)
contributors.json (centralized)
[
  {
    "id": "falah-akbar",
    "name": "Falah Akbar",
    "linkedin": "https://www.linkedin.com/in/falah-akbar",
    "photo": "/images/people/falah.jpg"
  },
  {
    "id": "sara-n",
    "name": "Sara Nur",
    "linkedin": "https://www.linkedin.com/in/saranur",
    "photo": ""
  }
]


If photo empty → Avatar component must render initials (e.g., FA).

Sample project markdown frontmatter (data/projects/2025-01-helmet.md)
---
title: "Helmet Detection for Night CCTV"
slug: "helmet-detection-night-cctv"
date: "2025-01-03"
category: "Data & ML/AI"
project_type: "Personal Project"
thumbnail: "/images/projects/helmet-thumb.jpg"
contributors:
  - "falah-akbar"
  - "sara-n"
tags:
  - "Computer Vision"
  - "YOLO"
  - "Deployment"
sections:
  - type: "overview"
    content: |
      Short, non-technical overview (3-4 lines) describing problem and audience.
  - type: "process"
    content: |
      Paragraph(s) describing empathy, constraints, approach, design thinking steps.
  - type: "image"
    src: "/images/projects/helmet-1.jpg"
    alt: "Model bounding boxes example"
  - type: "outcome"
    metrics:
      - name: "mAP50"
        value: "0.82"
      - name: "F1"
        value: "0.78"
    content: |
      Narrative describing impact and rollout.
  - type: "insights"
    content: |
      Short bullet/paragraph about lessons learned, accessibility considerations, and next steps.
---


sections is an ordered array; renderer uses type to decide component.

5) Slug

Slug = URL-friendly unique identifier. Example: helmet-detection-night-cctv.

Ensure slugs are unique across projects. Use slug frontmatter or generate from title if missing.

6) Rendering logic (block-based renderer)

ProjectRenderer reads sections[] and maps type → corresponding block component.

Each block component must:

Accept content, src, alt, metrics, etc.

Use semantic HTML (section, h2, p, figure, figcaption).

Ensure images have alt and role="img" handled.

Implement SSG page generation:

Use generateStaticParams() (App Router) to return all slugs.

Each project page reads markdown at build time and renders static HTML.

7) Projects listing & filtering

Projects page does SSG to output full list.

Category Pills: UI/UX | Data & ML/AI | Web Dev — default shows All.

Filtering can be client-side (fast) using preloaded SSG array of projects (JSON) for instant UI filtering.

Each project card shows title, one-liner, tags, thumbnail, contributors avatars.

8) Accessibility (WCAG) requirements — must enforce

Semantic markup (nav, main, header, footer, article, section).

Skip link (<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>).

Keyboard focus states visible and logical order.

ARIA labels where necessary (e.g., role="list", aria-labelledby, aria-describedby).

Sufficient color contrast (verify combinations of --color-text vs background). If contrast short, use borders or text shadows to compensate or adjust background.

Images must have alt. Decorative images must include aria-hidden="true".

Provide text alternatives for visual-only information (e.g., charts: provide numeric summary).

Ensure forms (if any) have accessible labels.

Ensure links open in same tab unless explicit target="_blank" with rel="noopener noreferrer" and a visible external link indicator.

Ensure Dark mode still meets contrast.

9) UI & Design constraints (must follow)

Font: Plus Jakarta Sans (import via local file or Google/Font provider if available).

Colors: use CSS variables:

:root{
  --color-text: rgb(59,59,63);
  --color-primary: rgb(204,0,44);
  --color-secondary: rgb(73,39,109);
  --bg: #ffffff;
  --card-bg: #ffffff;
  --radius: 0px; /* square corners */
}


Use Tailwind theme extension to add these colors and font family.

Avatar style: square, consistent padding. If no photo show initials inside a 48x48 square with background using --color-secondary or neutral palette.

Keep spacing generous, typographic scale clear, minimal motion. No heavy animation.

10) Contributors UX

Avatars small (32–48px) shown on cards and project detail.

Hover → show a small popover (name + role optional) with button/link to LinkedIn.

Click avatar → open LinkedIn in new tab.

Must be accessible via keyboard (focusable).

11) Deliverables for Draft-1 (what Copilot should produce)

Fully working Next.js App Router project scaffold.

Implement components as listed (Header, Footer, CardProject, ProjectRenderer + blocks).

Tailwind config and global css with font import and variables.

data/projects/*.md (3 sample projects) and data/contributors.json (3 contributors).

Static generation: home, /projects, and /projects/[slug] pages produced at build time.

Client-side filter for categories (pills) and tags (optional).

Accessibility features listed implemented.

README.md with instructions to run (pnpm or npm) and deploy to Vercel.

Minimal ESLint/prettier config and sensible package.json scripts (dev, build, start).

Tests not required but code should be modular and easy to iterate.

12) Constraints / Do NOTs (strict)

DO NOT create heavy server components or runtime DB.

DO NOT produce generic AI design artifacts (no stock UI kits that look templated).

Avoid large dependency chains — keep dependencies minimal.

Do not auto-generate content beyond provided sample projects; placeholder text allowed but keep tone design-led and technical where applicable.

13) Small coding examples to include in repo (for Copilot to follow)

Tailwind config snippet (colors + font).

Example generateStaticParams pattern (App Router) — Copilot should create this automatically based on data/projects files.

Avatar component behavior: fallback to initials if no photo.