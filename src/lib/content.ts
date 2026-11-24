import {getCollection,getEntry} from 'astro:content';
export type Lang='en'|'ar';
export const langs:Lang[]=['en','ar'];
export async function siteData(){
 const [profile,settings,projects,experience,certifications]=await Promise.all([getEntry('profile','main'),getEntry('settings','main'),getCollection('projects'),getCollection('experience'),getCollection('certifications')]);
 if(!profile||!settings)throw new Error('Profile and site settings required');
 const sort=<T extends {data:{order:number,status:string}}>(items:T[])=>items.filter(x=>x.data.status==='published').sort((a,b)=>a.data.order-b.data.order);
 const sorted=sort(projects);const ids=new Set(sorted.map(p=>p.data.slug));
 if(ids.size!==sorted.length)throw new Error('Project slugs must be unique');
 for(const p of sorted)if(!settings.data.categories.some(c=>c.id===p.data.category))throw new Error(`Unknown category: ${p.data.category}`);
 const order=settings.data.projectOrder;
 sorted.sort((a,b)=>{const ai=order.indexOf(a.data.slug),bi=order.indexOf(b.data.slug);return (ai<0?9999:ai)-(bi<0?9999:bi)||a.data.order-b.data.order;});
 return {profile:profile.data,settings:settings.data,projects:sorted,experience:sort(experience),certifications:sort(certifications)};
}
export const labels={en:{about:'About',projects:'Projects',experience:'Experience',certifications:'Certifications',contact:'Contact',all:'All projects',read:'Read case study',cv:'Download CV',home:'Home',back:'All projects',problem:'The problem',solution:'The solution',contribution:'My contribution',implementation:'Implementation',outcomes:'The outcome',gallery:'Product & workflow',live:'Visit product',repo:'View source',pdf:'Download redacted overview (PDF)',close:'Close image',enlarge:'Enlarge image',filter:'Filter projects',allFilter:'All',skip:'Skip to content',next:'Next project',demo:'Demonstration summary',present:'Present'},ar:{about:'نبذة عنّي',projects:'المشاريع',experience:'الخبرات',certifications:'الشهادات',contact:'تواصل',all:'جميع المشاريع',read:'اقرأ دراسة المشروع',cv:'تحميل السيرة الذاتية',home:'الرئيسية',back:'جميع المشاريع',problem:'المشكلة',solution:'الحل',contribution:'مساهمتي',implementation:'التنفيذ',outcomes:'النتيجة',gallery:'المنتج ومسار العمل',live:'زيارة المنتج',repo:'عرض المصدر',pdf:'تحميل العرض المنقّح (PDF)',close:'إغلاق الصورة',enlarge:'تكبير الصورة',filter:'تصفية المشاريع',allFilter:'الكل',skip:'انتقل إلى المحتوى',next:'المشروع التالي',demo:'ملخّص العرض',present:'حتى الآن'}};
export function date(value:string,lang:Lang){if(!value)return '';return new Intl.DateTimeFormat(lang==='ar'?'ar-SA-u-ca-gregory':'en',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value+'-01T00:00:00Z'));}
export const engagementLabels={en:{'personal product':'Personal product',freelance:'Freelance',employment:'Employment',other:'Independent project',contract:'Contract',founder:'Founder'},ar:{'personal product':'منتج شخصي',freelance:'عمل حر',employment:'عمل وظيفي',other:'مشروع مستقل',contract:'تعاقد',founder:'مؤسس'}};
