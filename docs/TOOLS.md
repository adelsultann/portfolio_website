# Useful tools

The bilingual directory lives at `/en/tools/` and `/ar/tools/`. Each tool has a
stable descriptive slug, a static page, a canonical URL, language alternates,
unique metadata, a worked example, assumptions, related work, and WebApplication
and BreadcrumbList structured data. The sitemap automatically discovers these
static routes. No promise of rankings or rich results is implied.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/tools/<slug>/index.ts` | One tool's bilingual copy, field schema and pure evaluator |
| `src/tools/registry.ts` | Build-time registration and categories |
| `src/tools/guides.ts` | Static bilingual instructions, interpretation, mistakes, FAQs and references |
| `src/tools/types.ts` | Typed tool, field and result contracts |
| `src/tools/shared.ts` | Numeric validation and locale formatting |
| `src/tools/client.ts` | Form lifecycle, lazy imports, safe output rendering and clipboard fallback |
| `src/components/tools/ToolForm.astro` | Shared server-rendered form and sample results |
| `src/pages/[lang]/tools/` | Directory and tool routes |
| `src/styles/tools.css` | Styles loaded on tool pages only |
| `scripts/test-tools.ts` | Formula, validation, escaping and payload-limit tests |

## Add a tool

1. Create `src/tools/<slug>/index.ts`, exporting `tool: Tool`. Use an existing
   tool as a template. Keep the evaluator pure: accept string values and a
   language, return metrics, optional code, optional rows and a localized note.
   Throw `ToolError` with English and Arabic text for expected invalid input.
2. Supply both languages for all copy and labels. Include a useful worked
   example, explain formulas and assumptions, and set a published related project
   slug when relevant. Use stable ASCII slugs and a category in the registry.
3. Import it into `registry.ts` and add it to `tools`. Routes, directory cards,
   related-tool navigation, language alternates and sitemap entries follow.
   Add a matching slug in `guides.ts` with both languages for usage steps,
   result interpretation, common mistakes and questions. Editorial guides stay
   out of interactive chunks. Project pages link back through `relatedProject`.
4. Extend `scripts/test-tools.ts` with meaningful examples and edge cases. Update
   the explicit launch tool count when intentionally adding a tool.
5. Run `npm run test:tools`, `npm run check`, and `npm run build`. Use
   `npm run dev` for interactive local review. Use `npm run preview` after a build
   to inspect the production version and sitemap.

## Performance and privacy

No new dependencies, framework runtime, remote APIs, database, analytics events,
localStorage or cookies are required. Forms and sample results are static HTML.
The directory has no calculator script. Individual tool pages load a small shared
controller; the selected tool module loads only on the first form interaction.
Other tool modules are not fetched. User values are never inserted as HTML or
executed. Generated JavaScript is displayed as text and is not run by the site.

The JSON inspector accepts up to 100,000 characters and caps field traversal at
200 rows / 32 levels; payloads deeper than 128 levels or with non-finite numbers
are rejected before formatting. It is a paste-in inspector, not a webhook receiver. Copy
uses the Clipboard API and falls back to selecting the text for manual copying.
Inputs are not persisted across reloads or language changes.

GA4 guidance references Google's data layer documentation and event naming rules:
https://developers.google.com/tag-platform/tag-manager/datalayer
https://support.google.com/analytics/answer/13316687

Tool behavior and copy are code-managed; these executable utilities are not part
of the Decap content editor.
