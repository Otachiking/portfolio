# Portfolio — Next.js SSG

A design-forward portfolio built with Next.js (App Router), Tailwind CSS, and Static Site Generation (SSG). Features a clean, typographic aesthetic with full accessibility (WCAG) support.

## ✨ Features

- **Static Site Generation** — All pages are pre-rendered at build time for optimal performance
- **Block-based Content** — Project content is stored as Markdown with structured frontmatter sections
- **Centralized Data** — Contributors stored in `data/contributors.json` for consistency
- **Dark Mode** — System preference detection with manual toggle
- **WCAG Accessible** — Semantic HTML, ARIA labels, keyboard navigation, skip links
- **Gen-Z Aesthetic** — Clean, square corners, generous spacing, typographic hierarchy

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Font**: Plus Jakarta Sans
- **Markdown**: gray-matter for frontmatter parsing
- **Utilities**: clsx, date-fns

## 📁 Project Structure

```
/
├─ app/
│  ├─ layout.tsx              # Root layout with Header, Footer
│  ├─ globals.css             # Tailwind + custom styles
│  ├─ page.tsx                # Home / Landing page
│  └─ projects/
│     ├─ page.tsx             # Projects listing + filtering
│     └─ [slug]/
│        └─ page.tsx          # Project detail (block-based)
├─ components/
│  ├─ ui/                     # Reusable UI components
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Pill.tsx
│  │  ├─ CardProject.tsx
│  │  ├─ Avatar.tsx           # Avatar with initials fallback
│  │  └─ DarkModeToggle.tsx
│  └─ projects/
│     ├─ ProjectRenderer.tsx  # Maps sections to block components
│     ├─ ProjectMeta.tsx      # Project metadata sidebar
│     └─ blocks/              # Content block components
│        ├─ OverviewBlock.tsx
│        ├─ ImageBlock.tsx
│        ├─ GalleryBlock.tsx
│        ├─ ProcessBlock.tsx
│        ├─ OutcomeBlock.tsx
│        └─ InsightsBlock.tsx
├─ data/
│  ├─ contributors.json       # Centralized people data
│  └─ projects/               # Project markdown files
│     ├─ 2025-01-helmet.md
│     ├─ 2025-02-dashboard.md
│     └─ 2025-03-ecommerce.md
├─ lib/
│  ├─ types.ts                # TypeScript types
│  └─ projects.ts             # Data fetching utilities
└─ public/
   └─ images/                 # Project images & assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (SSG) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |

## 📝 Adding Projects

1. Create a new markdown file in `data/projects/`:

```md
---
title: "Project Title"
slug: "project-slug"
date: "2025-01-01"
category: "UI/UX"  # UI/UX | Data & ML/AI | Web Dev
project_type: "Personal Project"
thumbnail: "/images/projects/project-thumb.jpg"
excerpt: "Short description of the project."
contributors:
  - "contributor-id"
tags:
  - "Tag1"
  - "Tag2"
sections:
  - type: "overview"
    content: |
      Overview content here...
  - type: "process"
    content: |
      Process description...
  - type: "image"
    src: "/images/projects/image.jpg"
    alt: "Image description"
  - type: "outcome"
    metrics:
      - name: "Metric Name"
        value: "Value"
    content: |
      Outcome description...
  - type: "insights"
    content: |
      Key insights...
---
```

2. Add contributors to `data/contributors.json`:

```json
{
  "id": "contributor-id",
  "name": "Full Name",
  "role": "Role Title",
  "linkedin": "https://linkedin.com/in/username",
  "photo": "/images/people/photo.jpg"
}
```

3. Add images to `public/images/`

## 🎨 Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --color-text: 59 59 63;
  --color-primary: 204 0 44;
  --color-secondary: 73 39 109;
  --bg: 255 255 255;
  --card-bg: 255 255 255;
}

.dark {
  --color-text: 245 245 247;
  --bg: 17 17 19;
  --card-bg: 28 28 32;
}
```

### Typography

The project uses Plus Jakarta Sans from Google Fonts. To change:

1. Update the Google Fonts import in `globals.css`
2. Update `--font-plus-jakarta` variable

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy (auto-detects Next.js)

### Static Export

The project is configured for static export:

```bash
pnpm build
```

The static files will be in the `out/` directory, ready for any static hosting.

## ♿ Accessibility

- **Skip Link**: Jump directly to main content
- **Semantic HTML**: Proper use of `nav`, `main`, `article`, `section`
- **ARIA Labels**: Screen reader support throughout
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Indicators**: Visible focus states
- **Color Contrast**: WCAG AA compliant color combinations
- **Alt Text**: All images have descriptive alt text

## 📄 License

MIT License - feel free to use this template for your own portfolio.

---

Built with ❤️ using Next.js and Tailwind CSS
