import {readFile,writeFile,mkdir} from 'node:fs/promises';
import YAML from 'yaml';
const config=JSON.parse(await readFile('config/cms-base.json','utf8'));
const settings=JSON.parse(await readFile('src/content/settings/main.json','utf8'));
config.site_url=settings.domain;config.display_url=settings.domain;
let ready=false;
try{const backend=YAML.parse(await readFile('config/cms-backend.yml','utf8'));if(backend.name!=='git-gateway'||!backend.identity_url?.startsWith('https://')||!backend.gateway_url?.startsWith('https://'))throw new Error('Copy the full DecapBridge backend block (without the outer backend key).');config.backend=backend;ready=true;}catch(e){if(e.code!=='ENOENT')throw e;}
if(process.env.CMS_CLOUDINARY_CLOUD_NAME&&process.env.CMS_CLOUDINARY_API_KEY)config.media_library={name:'cloudinary',config:{cloud_name:process.env.CMS_CLOUDINARY_CLOUD_NAME,api_key:process.env.CMS_CLOUDINARY_API_KEY,default_transformations:[]}};
const local=process.argv.includes('--local');
if(local){config.local_backend=true;config.publish_mode='simple';ready=true;}
await mkdir('public/admin',{recursive:true});
await writeFile('public/admin/config.yml',YAML.stringify(config));
await writeFile('public/admin/setup.json',JSON.stringify({configured:ready,local}));
console.log(local?'Local file editor enabled; this does not verify production authentication.':ready?'Admin authentication configured; verify access after deployment.':'Admin setup pending: add DecapBridge backend configuration. Editing is disabled until configured.');
