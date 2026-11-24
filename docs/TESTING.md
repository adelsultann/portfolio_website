# Verification report

Verified locally on 23 November 2026. No production deployment was performed. Final production output: 19 pages, 84 files, and 286 checked internal links/assets.

| Check | Result |
| --- | --- |
| `npm run check` | TypeScript, Astro templates and content schemas: pass |
| `npm run build` | Static production build and output verifier: pass |
| EN / AR desktop | Rendered and visually reviewed in Chrome |
| EN / AR mobile | Reviewed at 390 × 844; correct language/direction and no public horizontal overflow |
| Thmanyah | Local Regular / Medium / Bold faces integrated; browser confirms font loaded |
| Admin phone layout | Default CMS overflow found and fixed; navigation and form toolbar fit 390px, preview stacks below form |
| Separate Experience / Projects | Separate typed collections and distinct homepage sections, in requested order |
| Category filters | Click-tested; AI & Automation shows two matching projects |
| Image enlargement | Opens native dialog; Escape closes; keyboard focus returns to opener |
| Video | Poster and controls present, `preload=none`, no autoplay; actual playback advances without console errors |
| Images / PDF / local links | Generated-output verifier checks local references; responsive variants generated |
| Public CV | Only tailored Product Engineer PDF copied intentionally; private master excluded |
| Local CMS create | Created a temporary bilingual certification through Decap UI; actual JSON written to disk |
| Local CMS upload | Harmless image uploaded, associated with entry, and persisted to disk; sanitized MP4 uploaded and persisted too |
| Local CMS reload | Saved entry, Arabic text, image and order survived reload |
| Local CMS edit / order | Display-order change saved and reloaded; actual file checked |
| Local CMS gallery ordering | Dragged Airtable image ahead of video, saved, verified resulting array on disk; restored original gallery |
| Local CMS delete | Native confirmation displayed; synthetic entry removed; checked filesystem afterwards |
| Preview | Decap preview panel renders both language fields, text and gallery |
| Draft exclusion | Real fixture stayed absent from homepage, archive, project routes and sitemap |
| Publish / delete build flow | Fixture changed to published, rebuilt into both languages, then deleted and rebuilt away |
| Production configuration | Output verifier rejects `local_backend` or local unauthenticated editing in deployment files |
| Privacy / file limits | Source folders and master-resume filenames excluded from output; files under Pages limit |

All temporary QA entries and duplicate uploads were removed. Original source documents/media were preserved. The ordering test restored the original project JSON.

## Not verified without your accounts

- DecapBridge login, invitation restrictions and denial to an uninvited account.
- Remote GitHub token scope, editorial branches/PRs and persistent remote uploads.
- Cloudflare preview status integration, production rebuild after publication, custom domain/DNS and successful live deployment.
- Optional authenticated Cloudinary picker or large video quotas.
- Cross-browser/device lab testing, automated Lighthouse/axe scores, and assistive-technology testing beyond keyboard/dialog checks. No performance/accessibility score is claimed.
- Gallery drag reordering was verified with pointer input. Keyboard ordering of the CMS gallery did not move items in this version; the public site remains keyboard accessible. Entry ordering and gallery media now include numeric controls as a keyboard alternative; equal media numbers preserve drag order.

The unauthenticated **local-only** Decap file proxy verifies real file persistence. It does not prove production authorization or publishing. The deployment guide includes a required production acceptance test.

Re-run:

```powershell
npm run check
npm run build
npm run test:content
```

`test:content` temporarily creates a synthetic content fixture and rebuilds it through draft/published/deleted states, restoring the portfolio in `finally`. It does not publish remotely. Run it separately from live editorial work.
