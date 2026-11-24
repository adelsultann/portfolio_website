import {readdir,readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const dist=resolve('dist');const files=[];
async function walk(p){for(const item of await readdir(p,{withFileTypes:true})){const path=join(p,item.name);if(item.isDirectory())await walk(path);else files.push(path);}}
await walk(dist);
for(const file of files){assert((await stat(file)).size<25*1024*1024,`Cloudflare 25 MiB limit: ${file}`);assert(!/Master_Evidence|projects_screen_shot|[/\\]CVs[/\\]/i.test(file),`Private source leaked: ${file}`);}
const read=p=>readFile(join(dist,p),'utf8');
const projects=await Promise.all((await readdir('src/content/projects')).filter(x=>x.endsWith('.json')).map(async f=>JSON.parse(await readFile(join('src/content/projects',f),'utf8'))));
for(const lang of ['en','ar']){
 const home=await read(`${lang}/index.html`);assert(home.includes(`lang="${lang}"`));assert(home.includes(`dir="${lang==='ar'?'rtl':'ltr'}"`));
 const order=['about','projects','experience','certifications','contact'].map(s=>home.indexOf(`id="${s}"`));assert(order.every(x=>x>=0));assert(order.every((x,i)=>!i||x>order[i-1]),'Homepage section order');
 for(const p of projects){const exists=files.some(f=>f===join(dist,lang,'projects',p.slug,'index.html'));assert.equal(exists,p.status==='published',`Draft route exclusion: ${p.slug}`);}
 const archive=await read(`${lang}/projects/index.html`);assert(archive.includes('data-filter="all"'));
}
let checked=0;
for(const file of files.filter(f=>f.endsWith('.html')&&!f.includes(join('dist','admin')))){
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:src|href|poster)="(\/[^"#?]*)/g)){
  const path=decodeURIComponent(match[1]);if(path==='')continue;
  const target=join(dist,path);const candidates=[target,join(target,'index.html')];let found=false;
  for(const c of candidates)try{if((await stat(c)).isFile()){found=true;break;}}catch{}
  assert(found,`Broken local asset or link: ${path} in ${file}`);checked++;
 }
}
const adminSetup=JSON.parse(await read('admin/setup.json'));assert(!adminSetup.local,'Local unauthenticated proxy must never be deployed');const adminConfig=await read('admin/config.yml');assert(!adminConfig.includes('local_backend:'),'Local backend leaked into production config');
const sitemap=await read('sitemap-0.xml');for(const p of projects.filter(p=>p.status==='draft'))assert(!sitemap.includes('/projects/'+p.slug+'/'));
const settings=JSON.parse(await readFile('src/content/settings/main.json','utf8'));
const domain=settings.domain.replace(/\/$/,'');
const sitemapIndex=await read('sitemap-index.xml');
assert(sitemapIndex.includes(`<loc>${domain}/sitemap-0.xml</loc>`),'Sitemap index must reference the production sitemap');
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
const expectedUrls=['en','ar'].flatMap(lang=>[
 `${domain}/${lang}/`,`${domain}/${lang}/projects/`,
 ...projects.filter(p=>p.status==='published').map(p=>`${domain}/${lang}/projects/${p.slug}/`),
]);
for(const url of expectedUrls)assert(sitemapUrls.includes(url),`Missing sitemap URL: ${url}`);
assert.equal(new Set(sitemapUrls).size,sitemapUrls.length,'Duplicate sitemap URLs');
for(const url of sitemapUrls){
 const parsed=new URL(url);assert.equal(parsed.origin,new URL(domain).origin,'Sitemap must use production domain');
 assert(!/^\/(?:$|admin(?:\/|$)|404(?:\/|\.html$|$))/.test(parsed.pathname),`Non-indexable sitemap URL: ${url}`);
 assert(files.includes(join(dist,decodeURIComponent(parsed.pathname),'index.html')),`Sitemap URL has no built page: ${url}`);
}
for(const lang of ['en','ar'])assert(sitemap.includes(`hreflang="${lang}"`),`Missing sitemap language: ${lang}`);
const robots=await read('robots.txt');
if(!process.env.CF_PAGES_BRANCH||process.env.CF_PAGES_BRANCH==='main')assert(robots.includes(`Sitemap: ${domain}/sitemap-index.xml`),'robots.txt must advertise the sitemap index');
const toolSlugs=(await readdir('src/tools',{withFileTypes:true})).filter(entry=>entry.isDirectory()).map(entry=>entry.name);
for(const lang of ['en','ar']){
 const directory=await read(`${lang}/tools/index.html`);
 assert(directory.includes(`href="/${lang}/tools/`));
 assert(!(directory.match(/<script[^>]+src="([^"]+)"/g)||[]).some(tag=>tag.includes('ToolForm')),'Tool directory must not load the form controller');
 const home=await read(`${lang}/index.html`);
 assert(home.includes(`href="/${lang}/tools/"`),'Tools link missing from global header');
 for(const slug of toolSlugs){
  const url=`${domain}/${lang}/tools/${slug}/`;
  assert(sitemapUrls.includes(url),`Tool sitemap URL missing: ${url}`);
  const html=await read(`${lang}/tools/${slug}/index.html`);
  assert(html.includes(`rel="canonical" href="${url}"`),`Tool canonical missing: ${slug}`);
  assert(html.includes('WebApplication')&&html.includes('BreadcrumbList'),`Tool structured data missing: ${slug}`);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`Tool should have one H1: ${slug}`);
  assert(html.includes(`data-tool="${slug}"`),'Tool controller hook missing');
  assert(html.includes('data-result-body'),'Static example results missing');
 }
}
console.log(`Verified ${files.length} output files, ${checked} internal links/assets, bilingual sections, draft routes, source privacy, and Cloudflare asset limits.`);
