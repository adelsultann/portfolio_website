import {ToolError, type Tool, type Lang, type Result} from './types';

// Lazy chunks: only the active tool is requested, on the first interaction.
const modules=import.meta.glob<{tool:Tool}>('./*/index.ts');
export function mountTools() {
  document.querySelectorAll<HTMLElement>('[data-tool]').forEach(root=>{
    const lang=root.dataset.lang as Lang;
    const say=(en:string,ar:string)=>lang==='ar'?ar:en;
    const form=root.querySelector<HTMLFormElement>('form')!;
    const error=root.querySelector<HTMLElement>('[data-error]')!;
    const body=root.querySelector<HTMLElement>('[data-result-body]')!;
    const status=root.querySelector<HTMLElement>('[data-status]')!;
    const output=root.querySelector<HTMLTextAreaElement>('[data-code]')!;
    const copy=root.querySelector<HTMLButtonElement>('[data-copy]')!;
    const load=modules[`./${root.dataset.tool}/index.ts`];
    let pending:Promise<{tool:Tool}>|undefined, revision=0, timer:ReturnType<typeof setTimeout>;
    function clear(message:string) {
      body.hidden=true;
      output.value='';
      error.textContent=message;
      error.hidden=false;
      status.textContent=say('Results need valid inputs.','تحتاج النتائج إلى مدخلات صالحة.');
    }
    function render(result:Result) {
      const metrics=root.querySelector<HTMLElement>('[data-metrics]')!;
      metrics.replaceChildren();metrics.hidden=!result.metrics;
      for(const metric of result.metrics||[]){
        const item=document.createElement('div'), label=document.createElement('dt'), value=document.createElement('dd');
        label.textContent=metric.label[lang];value.textContent=metric.value;value.dir='auto';
        item.append(label,value);metrics.append(item);
      }
      root.querySelector<HTMLElement>('[data-code-wrap]')!.hidden=result.code===undefined;
      output.value=result.code||'';
      const note=root.querySelector<HTMLElement>('[data-note]')!;
      note.hidden=!result.note;note.textContent=result.note?.[lang]||'';
      root.querySelector<HTMLElement>('[data-table-wrap]')!.hidden=!result.rows;
      const rows=root.querySelector<HTMLElement>('[data-rows]')!;rows.replaceChildren();
      for(const row of result.rows||[]){
        const tr=document.createElement('tr');
        for(const value of [row.path,row.type,row.value]){const td=document.createElement('td');td.textContent=value;td.dir='ltr';tr.append(td);}
        rows.append(tr);
      }
      error.hidden=true;error.textContent='';body.hidden=false;
      status.textContent=say('Results updated. Inputs stay in your browser.','تم تحديث النتائج. تبقى المدخلات في متصفحك.');
    }
    async function update(report=false) {
      const current=++revision;
      if(!form.checkValidity()){
        clear(say('Complete the required fields and check their allowed ranges.','أكمل الحقول المطلوبة وتحقق من نطاق القيم المسموح.'));
        if(report)form.reportValidity();
        return;
      }
      try {
        if(!load)throw new Error('Tool module missing');
        const {tool}=await (pending??=load());
        if(current!==revision)return;
        const values=Object.fromEntries(Array.from(new FormData(form),([key,value])=>[key,String(value)]));
        render(tool.evaluate(values,lang));
      } catch(e) {
        if(current!==revision)return;
        pending=undefined;
        clear(e instanceof ToolError?e.copy[lang]:say('Unable to update results. Reload the page and try again.','تعذر تحديث النتائج. أعد تحميل الصفحة وحاول مجددًا.'));
      }
    }
    // Native validation is invoked explicitly so errors also clear stale results.
    form.noValidate=true;
    form.addEventListener('submit',event=>{event.preventDefault();clearTimeout(timer);void update(true);});
    form.addEventListener('input',()=>{
      ++revision;body.hidden=true;output.value='';error.hidden=true;
      status.textContent=say('Updating…','جارٍ التحديث…');
      clearTimeout(timer);timer=setTimeout(()=>void update(),300);
    });
    form.addEventListener('reset',()=>{++revision;clearTimeout(timer);timer=setTimeout(()=>void update(),0);});
    copy.addEventListener('click',async()=>{
      const value=output.value;if(!value)return;
      try {
        await navigator.clipboard.writeText(value);
        status.textContent=say('Output copied.','تم نسخ الناتج.');
      } catch {
        output.focus();output.select();
        status.textContent=say('Output selected. Use your device’s copy command.','تم تحديد الناتج. استخدم أمر النسخ في جهازك.');
      }
    });
  });
}
