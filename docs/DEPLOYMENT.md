# Deploy to your Cloudflare account

## 1. Repository

Create a **private** GitHub repository, e.g. `adelsultann/portfolio-website`. This folder currently contains private source materials excluded in `.gitignore`. Check `git status` before committing. Do not force-add `CVs`, `projects_screen_shot`, `tmp`, or secrets.

```powershell
git init
git branch -M main
git add .
git commit -m "Build bilingual engineering portfolio and visual CMS"
git remote add origin https://github.com/adelsultann/portfolio-website.git
git push -u origin main
```

Use your actual repository name. This work does not create a remote repository or deploy automatically.

## 2. Cloudflare Pages

In your Cloudflare dashboard: Workers & Pages → Create application → Pages → Connect to Git → select this repository.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | repository root |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment | `NODE_VERSION=22.19.0` |

Save and deploy. Connect `adelalsultan.com` in the Pages project's Custom domains screen and follow its DNS instructions. The site is fully static: no runtime database, binding or adapter is required. Cloudflare must install dependencies, including development dependencies, because the build scripts use YAML.

Enable preview builds for branches and pull requests, including `cms/*`. The Git integration rebuilds on each CMS publish (a merge/commit to main). Failed builds keep the previous successful production deployment. Publishing in Decap is **not proof of successful deployment**.

Protect preview deployment access through Cloudflare Access if drafts are confidential. Branch previews include `noindex` and disallow crawling; these are not access controls. Draft entries remain excluded from routes even in branch builds. To preview a new project as a complete route on a draft branch, choose Published in its Public visibility field, save it as an **editorial draft**, and inspect the branch preview without merging. For a content-only preview, use the built-in editor panel, which shows either visibility state.

The editor preview link depends on a compatible Git commit status from Cloudflare. If “Check for Preview” cannot find it, use the preview URL listed in Cloudflare's deployment dashboard. DecapBridge's gateway/status integration must be verified with your account; the in-editor content preview does not depend on that integration.

## 3. Invite-only production CMS authentication

1. Sign up at https://decapbridge.com/ using your own account. The documented free tier is sufficient for one site/owner. Select **Add site**.
2. Choose GitHub and enter the actual `owner/repository` path.
3. In GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens, create a token restricted to **this repository only**, with Contents read/write and Pull requests read/write (Metadata read is implicit). Set an expiry and note its renewal date.
4. Put the token **only in DecapBridge's Git access token field**. Never paste it into this project, browser code, Cloudflare public variables, or a chat message.
5. Set CMS login URL to `https://adelalsultan.com/admin/`. Choose **PKCE** for hosted Google/Microsoft/password login. No custom OAuth application/server is required with this choice; DecapBridge handles it.
6. Create the site. From its generated configuration, copy the full `backend:` object's contents into `config/cms-backend.yml`, **without** the outer `backend:` key. Preserve its generated auth/PKCE fields and service URLs exactly; do not guess IDs or callback URLs. The supplied `config/cms-backend.example.yml` only illustrates the file shape.
7. Commit that public service configuration and push. It contains service URLs/IDs, not the repository token. The build merges it into the form schema. Do not replace `cms-base.json` with the provider's entire sample configuration.
8. In DecapBridge Manage collaborators, authorize **only your email/account**. Do not invite others; do not enable open authoring. Public registration on DecapBridge itself does not grant access to your site. Check the site's member list.
9. Open `/admin/`, sign in, and complete the acceptance tests below. If the token expires or is revoked, replace it in DecapBridge and re-test publishing.

DecapBridge receives privileged repository access as a hosted third party. GitHub repository owners/collaborators retain their normal repository permissions. To enforce only your account, keep that repository private and its collaborators restricted too. A visible admin page is not authorization; all remote writes must be enforced by DecapBridge/GitHub.

## 4. Required production acceptance test

- Sign in as your authorized account. Create an unfeatured test project as an editorial draft, upload a harmless screenshot, reload and confirm both persist.
- Verify its branch/PR exists and that the main website and sitemap do not list the draft.
- Use the content preview and, when available, Cloudflare branch preview. Check both languages.
- Change visibility to Published, approve and publish. Wait for a successful main deployment. Confirm the exact edit appears on the domain.
- Edit the order and remove the test entry using the CMS confirmation dialog. Verify the resulting deployment removes it.
- Sign out. In a private browser window, verify you cannot edit/publish. Test a second uninvited account if available: it must be denied site access.

Production sign-in, gateway token restrictions, remote upload persistence, PR workflow and live deployment have not been verified without your accounts. Do not count local proxy tests as proof of these properties.

## 5. Media storage

The standard editor uploads into the repository under `public/media/uploads`. A 20 MiB per-file limit leaves headroom below Pages' 25 MiB ceiling; the build rejects oversized assets too. Keep videos short and compressed, with a poster. Do not use Git LFS for Pages assets unless you separately verify its checkout/delivery behavior.

For larger video, enable the established **Cloudinary Media Library** integration: set `CMS_CLOUDINARY_CLOUD_NAME` and `CMS_CLOUDINARY_API_KEY` in Cloudflare build variables. These are public identifiers, not the API secret. Sign in to your Cloudinary account when opening its media picker. Never add the API secret to the site. Use the resulting HTTPS video URL and a poster URL; external files are not bundled in Pages. Check your Cloudinary plan's upload size, storage and bandwidth quotas before use. No Cloudinary integration or large upload has been authenticated/tested in this session.

## Google Search Console sitemap

`npm run build` automatically generates `dist/sitemap-index.xml` and
`dist/sitemap-0.xml` using the production domain from Site Settings. Both languages
and published project pages are included, with language alternates. The root
redirect, admin, error pages and draft projects are excluded.

To inspect locally, run `npm run build` then `npm run preview`, and open
`/sitemap-index.xml`, `/sitemap-0.xml` and `/robots.txt` on the preview server.
Sitemaps are build output; they are not generated by the development server.

After deploying, confirm `https://adelalsultan.com/sitemap-index.xml` is accessible.
In Google Search Console, select the verified domain property, open **Sitemaps**,
and submit `https://adelalsultan.com/sitemap-index.xml` (or `sitemap-index.xml`
if the field already supplies the domain). Submit the hosted URL, not a local
file upload. Future builds update the sitemap automatically.

Reference: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## Official compatibility references

Checked 23 November 2026:

- Astro + Decap: https://docs.astro.build/en/guides/cms/decap-cms/
- Cloudflare Astro and Git builds: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Decap editorial workflow: https://decapcms.org/docs/editorial-workflows/
- Decap preview links: https://decapcms.org/docs/deploy-preview-links/
- DecapBridge authentication setup: https://decapbridge.com/docs/getting-started
- DecapBridge plans: https://decapbridge.com/
- Cloudinary authenticated picker: https://decapcms.org/docs/cloudinary/
- Decap local persistence proxy: https://decapcms.org/docs/decap-proxy/
