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
console.log(`Verified ${files.length} output files, ${checked} internal links/assets, bilingual sections, draft routes, source privacy, and Cloudflare asset limits.`);
