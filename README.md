# Alejandro Ocaña Garcia — Portfolio

Senior Full-Stack Engineer portfolio website built with Angular 21 and SCSS.

## Quick Start

```bash
pnpm install
pnpm start
```

Open [http://localhost:4200](http://localhost:4200) to view.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server |
| `pnpm run build` | Production build |
| `pnpm run test:unit` | Run unit tests (Vitest) |
| `pnpm run test:e2e` | Run Playwright E2E tests |
| `pnpm run test:e2e:ui` | Run E2E tests with UI |

## Customization

Edit `src/app/core/portfolio-data.service.ts` to update content:

```typescript
@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  personalInfo = {
    name: 'Alejandro Ocaña Garcia',
    title: 'Senior Full-Stack Engineer',
    // ...
  };
}
```

## Tech Stack

- **Framework:** Angular 21 (Standalone Components)
- **Language:** TypeScript
- **Styling:** SCSS with CSS variables
- **Testing:** Vitest + Playwright

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── portfolio-data.service.ts  # All content
│   ├── layout/
│   │   ├── navbar/
│   │   └── footer/
│   ├── sections/
│   │   ├── hero/
│   │   ├── impact-metrics/
│   │   ├── about/
│   │   ├── technical-approach/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── projects/
│   │   └── tech-stack/
│   └── shared/
│       └── components/
│           └── icon/
├── styles.scss                    # CSS variables + global styles
└── index.html
```

## Features

- Fully responsive (mobile-first)
- Dark/light mode (follows system preference)
- Smooth animations with Angular animations
- Accessible (semantic HTML, ARIA labels, focus states)
- Mobile hamburger menu with backdrop
- Scroll-to-top button on all pages

## Sections

- Hero with terminal-style code display
- Impact metrics (years, projects, people,ROI)
- About with current role and focus areas
- Technical approach (4 principles)
- Work experience timeline
- Education & certifications
- Featured projects with links
- Tech stack (Frontend, Backend, Databases, DevOps, Emerging)
- Footer with social links

## Deployment

Build for production:

```bash
pnpm run build
```

Deploy to any static hosting (Netlify, Vercel, Firebase Hosting, etc.).

## Contact

- GitHub: [https://github.com/AlejOcana](https://github.com/AlejOcana)
- LinkedIn: [https://www.linkedin.com/in/alejandro-ocana-garcia](https://www.linkedin.com/in/alejandro-ocana-garcia)
- Email: [alejandro.ocana.garcia@gmail.com](mailto:alejandro.ocana.garcia@gmail.com)