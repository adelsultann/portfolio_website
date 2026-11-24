import {readFile,writeFile,unlink,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const fixture='src/content/projects/qa-lifecycle-fixture.json';
const original=JSON.parse(await readFile('src/content/projects/sofra.json','utf8'));
const data={...original,slug:'qa-lifecycle-fixture',title:{en:'QA lifecycle fixture',ar:'اختبار دورة النشر'},status:'draft',featured:true,order:9999};
function build(){const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run','build'],{stdio:'pipe',shell:process.platform==='win32',encoding:'utf8'});if(result.status!==0)throw new Error(result.stdout+'\n'+result.stderr);}
async function exists(path){try{await access(path);return true;}catch{return false;}}
try{
 await writeFile(fixture,JSON.stringify(data));build();
 assert(!await exists('dist/en/projects/qa-lifecycle-fixture/index.html'));
 for(const path of ['dist/en/index.html','dist/en/projects/index.html','dist/sitemap-0.xml'])assert(!(await readFile(path,'utf8')).includes('qa-lifecycle-fixture'),'Draft leaked into '+path);
 data.status='published';await writeFile(fixture,JSON.stringify(data));build();
 assert(await exists('dist/en/projects/qa-lifecycle-fixture/index.html'));
 assert((await readFile('dist/en/index.html','utf8')).includes('QA lifecycle fixture'));
 console.log('PASS: actual draft content excluded, published file generated after rebuild, both language routes checked by build verifier.');
}finally{await unlink(fixture).catch(()=>{});build();}
assert(!await exists('dist/en/projects/qa-lifecycle-fixture/index.html'));
console.log('PASS: deleted test content removed after rebuild. Original portfolio restored. This is a filesystem/build lifecycle test, not remote CMS authentication verification.');
