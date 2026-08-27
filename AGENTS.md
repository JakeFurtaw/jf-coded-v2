## IMPORTANT — READ FIRST
1. NEVER commit or push to the repository without first asking the user.
2. NEVER just start editing files. Always develop a plan and ask the user for approval unless stated otherwise by the user.
3. Treat existing site copy as intentional. Flag concerns, don't silently rewrite — get approval first. (Genuine typos are fair game.)

## Project Overview
This website serves as my developer portfolio site along with my virtual resume. I also have some basic contact information. Whenever stuff gets written on the site make sure it sounds proper, technical where it fits, and intelligent.

The site is live at [jfcoded.com](https://www.jfcoded.com) and deployed on Vercel — treat this repo as production.

## Key Files
- `lib/projects.ts` — single source of truth for all project data; `featuredProjectIds` controls the homepage. Pages import from here, never re-type project copy.
- `app/globals.css` — theme tokens: `--space-bg`/`--space-card`, cyan `--primary`, purple `--accent`, the `.glass` class.
- `components/ui/` — shadcn/ui base + custom components (Navbar, Footer, ProjectTimeline, magnetic-button, cursor-glow). Reuse before creating.
- `public/projectImages/<ProjectName>/` — where project screenshots live.

## Code Style Guidelines
Write clean, modular code. Try and make reusable components when you can as this site is very copy and paste friendly.

**Frontend**
- TypeScript `strict` mode (see `tsconfig.json`).
- Lint with `npm run lint` (ESLint 9 flat config).
- Stack: Next.js 16, React 19, and Tailwind CSS v4.

**Visual conventions**
- Dark mode is forced, glassmorphic, cyan-accented. New components use the `glass` class + `bg-space-*` tokens, not hardcoded hex.
- Two icon libs coexist by convention: `lucide-react` for UI icons, `react-icons` for brand icons (GitHub/LinkedIn/X/Discord). Don't mix.
- Framer Motion for animations, kept subtle (~0.2–0.9s).

## Running the App
```bash
npm install        # first time only
npm run dev        # frontend on http://localhost:3000
npm run build      # typecheck + production build
npm run start      # serve the production build locally
```

## Verification
No test suite exists in this repo. A change is done when `npm run build` passes and the result is visually verified in a browser (e.g. via `npm run start`).

## Security Considerations
None really for this repo.
