# Alejandro Ocaña Garcia

**Senior Full-Stack Engineer** · [Live Demo](https://portfolio-alejandro.vercel.app) · [GitHub](https://github.com/AlejOcana) · [LinkedIn](https://www.linkedin.com/in/alejandro-ocana-garcia)

> A performance-focused, accessible portfolio built with Angular 21. Mobile-first, dark-mode ready, and meticulously crafted to reflect senior-level engineering standards.

---

## Key Features

- **Single-page architecture** with anchor-based navigation (`#about`, `#projects`, etc.) and zero page reloads.
- **Dark mode built in** using `prefers-color-scheme: dark` with no manual toggle needed.
- **Custom design system** powered entirely by CSS custom properties in SCSS. No Tailwind, no Material UI.
- **Scroll-triggered animations** via a custom `ScrollRevealDirective` with staggered entrance effects.
- **Inline SVG icon system** with a typed `IconComponent` and strict `IconName` union type. No icon libraries.
- **Terminal-style hero** with a live code display that introduces the owner on load.

---

## What's New: Mobile Navigation Redesign

The mobile navigation was rebuilt from the ground up with UX as the primary driver.

- **Partial drawer layout** replaces the old full-screen overlay. The drawer takes 75% of the viewport width, keeping context visible behind it.
- **Touch gesture support** lets users swipe the drawer closed, matching native mobile patterns.
- **Focus trap** locks keyboard navigation inside the open drawer so tabbing behaves predictably.
- **Accessible throughout** with proper ARIA attributes, roles, and closed-on-Escape behavior.
- **Icon-enriched links** help users scan navigation options faster.
- **Improved glassmorphism contrast** on scroll keeps the navbar readable against any background.

These changes reduce cognitive load on mobile and make the navigation feel like a native component rather than a web afterthought.

---

## Technical Highlights

### Angular 21 with Standalone Components

The entire app uses `standalone: true` across every component, directive, and pipe. There are zero `NgModule` declarations. Bootstrapping happens through `bootstrapApplication()` in `main.ts`. This keeps the module graph flat and tree-shaking optimal.

### Strict TypeScript

TypeScript runs with `module: "preserve"` and strict mode enabled. The icon system uses a union type for allowed icon names, and the portfolio content is backed by defined TypeScript interfaces in `portfolio.models.ts`. No `any` escapes.

### Custom CSS Architecture

Styles are organized around CSS custom properties defined in `styles.scss` and consumed throughout the app. Variables cover colors (light and dark palettes), spacing, typography, shadows, transitions, and border radii. Dark mode overrides the `:root` variables inside a `prefers-color-scheme: dark` media query with no class toggling.

### Single Source of Truth for Content

All portfolio data lives in `PortfolioDataService`. Personal info, work experience, education, projects, tech stack, and impact metrics are centralized in one injectable service. Editing content means editing data, not templates.

### Animation Without Bloat

Two animation systems coexist intentionally:
- **Angular Animation triggers** for enter transitions (`:enter`, `query`, `stagger`) on section load.
- **CSS animation classes** (`.animate-fade-up`, `.animate-scale-in`) activated by the `ScrollRevealDirective` when elements scroll into view.

This keeps bundle size down while delivering smooth, performant motion.

---

## Performance and Accessibility

- **Production budget enforced** at 500 kB warning and 1 MB error. The build pipeline enforces these limits.
- **Semantic HTML** throughout, with landmark elements (`<nav>`, `<main>`, `<section>`, `<footer>`).
- **ARIA labels** on interactive elements, icons, and navigation controls.
- **Focus management** for the mobile drawer and scroll-to-top button.
- **Reduced motion support** via `prefers-reduced-motion` media queries where appropriate.
- **Automatic dark mode** respects system preference without user configuration.

---

## Development

### Prerequisites

- Node.js 20+
- pnpm 10.33.2 (locked in `packageManager` field)

### Commands

```bash
pnpm install          # Install dependencies
pnpm start            # Dev server at http://localhost:4200
pnpm run build        # Production build (esbuild via @angular/build:application)
pnpm run test:unit    # Run unit tests (Vitest)
pnpm run test:e2e     # Run Playwright E2E tests (auto-starts dev server)
pnpm run test:e2e:ui  # E2E tests with Playwright UI mode
pnpm run lint         # ESLint for TypeScript and HTML templates
```

### Testing

Unit tests use Vitest with jsdom and Angular TestBed, initialized in `tests/setup.ts`. Tests live in `/tests/` (not co-located with source). E2E tests use Playwright and run against the dev server at `http://localhost:4200`.

---

## Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── portfolio-data.service.ts   # Single source of truth for all content
│   │   └── portfolio.models.ts         # TypeScript interfaces for every data shape
│   ├── layout/
│   │   ├── navbar/                     # Navigation with responsive drawer
│   │   └── footer/                     # Social links and contact
│   ├── sections/
│   │   ├── hero/                       # Terminal-style intro
│   │   ├── impact-metrics/             # Stats and accomplishments
│   │   ├── about/                      # Background and focus areas
│   │   ├── technical-approach/         # Engineering philosophy
│   │   ├── experience/                 # Career timeline
│   │   ├── education/                  # Credentials
│   │   ├── projects/                   # Featured work
│   │   └── tech-stack/                 # Technology proficiency
│   └── shared/
│       └── components/
│           └── icon/                   # Typed inline SVG icon component
├── styles.scss                         # CSS variables and global utilities
├── main.ts                             # bootstrapApplication() entry point
└── index.html
```

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **No routing** | Single-page portfolio with anchor-based navigation. Simpler, faster, no router overhead. |
| **Standalone components only** | Angular 21 idiomatic. No NgModules, flat dependency graph, better tree-shaking. |
| **Centralized data service** | One file to update all portfolio content. Templates stay declarative. |
| **Custom icon component** | Inline SVGs avoid icon library dependencies. Typed `IconName` prevents invalid references. |
| **CSS variables over frameworks** | Zero dependency on Tailwind or Material. Full control over the design system. |
| **SCSS over plain CSS** | Nesting, mixins, and variables at build time. Compiled to clean CSS for production. |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 21 (standalone) |
| Language | TypeScript (strict mode) |
| Styling | SCSS with custom properties |
| Unit Tests | Vitest + jsdom + TestBed |
| E2E Tests | Playwright |
| Build | @angular/build:application (esbuild) |
| Linting | ESLint + angular-eslint |
| Deployment | Vercel |

---

## Connect

Built and maintained by **Alejandro Ocaña Garcia**.

- GitHub: [AlejOcana](https://github.com/AlejOcana)
- LinkedIn: [alejandro-ocana-garcia](https://www.linkedin.com/in/alejandro-ocana-garcia)
- Email: [alejandro.ocana.garcia@gmail.com](mailto:alejandro.ocana.garcia@gmail.com)

Interested in the code? Contributions, forks, and feedback are welcome.
