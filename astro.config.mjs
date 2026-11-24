import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {readFileSync} from 'node:fs';
const settings=JSON.parse(readFileSync(new URL('./src/content/settings/main.json',import.meta.url),'utf8'));
export default defineConfig({site:settings.domain,output:'static',trailingSlash:'always',integrations:[sitemap({filter:(page)=>!page.includes('/admin')&&!page.endsWith('/404/')} )],vite:{plugins:[tailwindcss()]}});
