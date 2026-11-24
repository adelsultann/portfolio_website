# Adel Al-Sultan — portfolio

An original dark navy and teal engineering portfolio. English `/en/`, Arabic `/ar/`, separate experience and project collections, six case studies, four certifications, and a Decap CMS visual editor at `/admin/`.

## Run locally

Use Node 22.19.0 (see `.nvmrc`). From this directory:

```powershell
npm ci
npm run dev
```

For real local editing, run `npm run cms` in a second terminal. Visit the URL printed by Astro plus `/admin/`. Local editing writes actual files; it is **not** production login or publishing. The local proxy binds only to this computer. Never expose port 8081 publicly.

```powershell
npm run check
npm run build
npm run preview
```

`npm run build` generates the production CMS configuration, optimizes image derivatives, builds static pages and checks internal links, draft exclusion, private-source exclusion and file-size limits. Production admin editing stays disabled until the authentication configuration is supplied. A built site never uses the unauthenticated local proxy.

## Architecture

- Astro 7, TypeScript, Tailwind 4, static rendering and typed Content Collections.
- Locally hosted Thmanyah Serif Display for Arabic glyphs (Regular, Medium, Bold), supplied by Adel. English uses a native sans-serif stack with Segoe UI on Windows; original font files remain untouched.
- Small native JavaScript for filtering, active navigation and accessible image dialogs. No public React runtime is needed.
- JSON content under Content Collections is an implementation detail: normal edits use CMS forms. MDX is intentionally omitted because arbitrary JSX would compromise the form-only workflow. Case studies have structured bilingual fields instead.
- Decap CMS provides forms, validation, media uploads, entry deletion confirmation, list reordering, editorial drafts and preview panels. A responsive shell makes the collections and editor usable on phone screens. DecapBridge supplies hosted invite-only authentication and a Git gateway. No custom authentication service.
- Cloudflare **Pages**, Git-connected static deployment. No Astro Cloudflare adapter or server function is needed. `wrangler.toml` describes the Pages output directory.
- Public content is built from `src/content`. Original `CVs/` and `projects_screen_shot/` are ignored by Git and never copied wholesale. Only reviewed public derivatives in `public/media/` ship. The private master resume is not published.

Read [Deployment](docs/DEPLOYMENT.md), [Editing](docs/EDITING.md), [Evidence and media decisions](docs/CONTENT-AUDIT.md), and [Verification](docs/TESTING.md).

## Useful tools

Six free browser-based tools live at `/en/tools/` and `/ar/tools/`: campaign
profitability, UTM links, GA4 events, automation savings, JSON payload inspection,
and SaaS unit economics. Each tool has its own static search-friendly page.
See [Tools](docs/TOOLS.md) for structure, assumptions and how to add another tool.
Run `npm run test:tools` to check formulas, validation and output handling.

## Domain and categories

The canonical domain has one source: Site Settings → Production domain (`src/content/settings/main.json`). CMS build configuration, robots, sitemap, metadata and structured data read it. Categories can be added in Site Settings; projects select them by relation.

## Services and cost

GitHub and Cloudflare accounts are required. DecapBridge is a third-party trust dependency that holds a repository-scoped access token server-side. Its documented free tier supports this single-owner site; verify quotas when signing up. No paid service is required for the supplied media. Optional Cloudinary needs an account and may incur charges as storage/bandwidth grows. Repository-backed uploads are limited to 20 MiB per file by the editor and build; Cloudflare Pages has a 25 MiB asset limit. Existing optimized videos are below 2 MiB.

## Before going live

Complete the authentication setup, verify invite-only access and real production persistence, inspect the public media derivatives, and test the Cloudflare publishing flow. Setup is deliberately fail-closed: there is no fake save or public registration fallback.
