from pathlib import Path
from PIL import Image,ImageDraw
import subprocess,shutil,json
out=Path('public/media');out.mkdir(parents=True,exist_ok=True)
def img(src,name,rects=[]):
 im=Image.open(src).convert('RGB'); d=ImageDraw.Draw(im)
 for r in rects:
  box=tuple(int(v*s) for v,s in zip(r,[im.width,im.height,im.width,im.height]));d.rectangle(box,fill='#11283e');d.text((box[0]+8,box[1]+8),'PRIVATE DATA REMOVED',fill='white')
 im.save(out/(name+'.webp'),'WEBP',quality=88)
 thumb=im.copy();thumb.thumbnail((720,720));thumb.save(out/(name+'-720.webp'),'WEBP',quality=82)
 return im.size
print('ga4',img('projects_screen_shot/adding_GTA_with_custome_event/1753467601444.jpg','ga4-events'))
print('airtable',img('projects_screen_shot/automated_social_media_posting_system/Screenshot_airtable.png','social-airtable'))
print('n8n',img('projects_screen_shot/automated_social_media_posting_system/Screenshot_n8n.png','social-n8n'))
for i in range(1,4):
 rects={1:[],2:[(.0,.11,1,.52)],3:[(0,0,1,.41)]}[i]
 print('crm',i,img(f'tmp/crm-{i}.png',f'crm-{i}',rects))
for folder,name in [('automated_bookKeeping','invoice-workflow'),('automated_social_media_posting_system','social-workflow')]:
 src=next(Path('projects_screen_shot',folder).glob('*.mp4'))
 # Opaque masks persist across every frame, including transitions. Audio removed because not yet privacy-reviewed.
 vf='drawbox=x=0:y=0:w=640:h=ih:color=0x11283e:t=fill,drawbox=x=0:y=0:w=iw:h=75:color=0x11283e:t=fill,drawbox=x=0:y=675:w=iw:h=45:color=0x11283e:t=fill' if name.startswith('invoice') else 'drawbox=x=0:y=0:w=iw:h=80:color=0x11283e:t=fill,drawbox=x=0:y=80:w=640:h=ih-80:color=0x11283e:t=fill'
 subprocess.run(['ffmpeg','-y','-i',str(src),'-vf',vf,'-an','-c:v','libx264','-crf','24','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(out/(name+'.mp4')),'-loglevel','error'],check=True)
 subprocess.run(['ffmpeg','-y','-i',str(out/(name+'.mp4')),'-frames:v','1',str(out/(name+'.webp')),'-loglevel','error'],check=True)
# Only the tailored Product Engineer CV is intentionally public. Never copy master evidence.
shutil.copy2('CVs/Verified/.qa_word/Adel_Alsultan_Product_Engineer_CV.pdf',out/'adel-alsultan-cv.pdf')
# Raster-only redacted PDF; no recoverable underlying customer text.
pages=[Image.open(out/f'crm-{i}.webp').convert('RGB') for i in range(1,4)]
pages[0].save(out/'crm-overview-redacted.pdf',save_all=True,append_images=pages[1:])

from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import subprocess
for name,steps in [('invoice-workflow',['WhatsApp invoice','OCR + AI extraction','Google Sheets record','WhatsApp confirmation']),('social-workflow',['AI-assisted content','Airtable review','Human approval','Buffer publishing'])]:
 im=Image.new('RGBA',(640,720),(17,40,62,255));d=ImageDraw.Draw(im);font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',25);small=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',16)
 d.text((50,95),'WORKFLOW DEMONSTRATION',font=small,fill='#8edcca')
 for i,step in enumerate(steps):
  y=180+i*90;d.text((50,y),step,font=font,fill='#edf2f7')
  if i<3:d.line((50,y+55,550,y+55),fill='#35506b',width=1)
 d.text((50,620),'Private source data has been removed.',font=small,fill='#b5c3d4');im.save('tmp/'+name+'-panel.png')
 subprocess.run(['ffmpeg','-y','-i','public/media/'+name+'.mp4','-i','tmp/'+name+'-panel.png','-filter_complex','[0:v][1:v]overlay=0:0','-an','-c:v','libx264','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','tmp/'+name+'-panel.mp4','-loglevel','error'],check=True)
 Path('public/media/'+name+'.mp4').write_bytes(Path('tmp/'+name+'-panel.mp4').read_bytes())
 subprocess.run(['ffmpeg','-y','-i','public/media/'+name+'.mp4','-frames:v','1','public/media/'+name+'.webp','-loglevel','error'],check=True)
