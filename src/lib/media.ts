import metadata from '../generated/media.json';
export function imageInfo(src:string){return (metadata as Record<string,{width:number;height:number;srcset:string}>)[src]||{width:1200,height:675,srcset:''};}
