import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {readFileSync} from 'node:fs';
const settings=JSON.parse(readFileSync(new URL('./src/content/settings/main.json',import.meta.url),'utf8'));
export default defineConfig({
  site: settings.domain,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    // The root redirects to /en/; only list public, indexable pages.
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return pathname !== '/' && !/^\/admin(?:\/|$)/.test(pathname)
        && !/^\/404(?:\/|\.html$|$)/.test(pathname);
    },
    i18n: {defaultLocale: 'en', locales: {en: 'en', ar: 'ar'}},
  })],
  vite: {plugins: [tailwindcss()]},
});
