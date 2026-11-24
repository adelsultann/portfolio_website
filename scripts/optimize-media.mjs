import sharp from 'sharp';
sharp.cache(false);
import {readdir,mkdir,writeFile,stat,unlink} from 'node:fs/promises';
import {join,extname,basename,resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';
await mkdir('public/media/responsive',{recursive:true});await mkdir('src/generated',{recursive:true});
const derivativeRoot=resolve('public/media/responsive');
for(const entry of await readdir(derivativeRoot,{withFileTypes:true})){if(!entry.isFile())continue;const target=resolve(derivativeRoot,entry.name);if(!target.startsWith(derivativeRoot+sep))throw new Error('Unsafe derivative path');await unlink(target);}
const metadata={};
async function walk(dir){for(const file of await readdir(dir,{withFileTypes:true})){if(file.name==='responsive')continue;const path=join(dir,file.name);if(file.isDirectory()){await walk(path);continue;}if((await stat(path)).size>20*1024*1024)throw new Error(`Asset exceeds editorial 20 MiB limit: ${path}. Use authenticated external media storage.`);if(!/\.(png|jpe?g|webp|avif|svg)$/i.test(path)||/-720\.webp$/.test(path))continue;if(extname(path)==='.svg')await sharp(path).jpeg({quality:88}).toFile(path.replace(/\.svg$/,'.jpg'));const m=await sharp(path).metadata();const src='/'+path.replaceAll('\\','/').replace(/^public\//,'');const item={width:m.width,height:m.height,srcset:''};if(extname(path)!=='.svg'){const variants=[];for(const width of [480,960,1440].filter(w=>w<m.width)){const name=basename(path).replace(/\.[^.]+$/,'')+'-'+createHash('sha256').update(src).digest('hex').slice(0,8)+'-'+width+'.webp';const dest=join('public/media/responsive',name);await sharp(path).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(dest);variants.push(`/media/responsive/${name} ${width}w`);}variants.push(`${src} ${m.width}w`);item.srcset=variants.join(', ');}metadata[src]=item;}}
await walk('public/media');await writeFile('src/generated/media.json',JSON.stringify(metadata,null,2));
console.log(`Prepared responsive metadata for ${Object.keys(metadata).length} images.`);

