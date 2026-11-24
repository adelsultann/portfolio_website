import assert from 'node:assert/strict';
import {test} from 'node:test';
import {tools} from '../src/tools/registry.ts';
import {ToolError} from '../src/tools/types.ts';
const evaluate=(slug:string,overrides:Record<string,string>={},lang:'en'|'ar'='en')=>{
  const tool=tools.find(t=>t.slug===slug)!;
  return tool.evaluate({...Object.fromEntries(tool.fields.map(f=>[f.name,f.value])),...overrides},lang);
};
test('all six tools have valid examples in both languages',()=>{
  assert.equal(tools.length,6);
  for(const tool of tools)for(const lang of ['en','ar'] as const){
    const result=evaluate(tool.slug,{},lang);
    assert(result.metrics?.length||result.code);
    assert(tool.title[lang]&&tool.description[lang]&&tool.method[lang]&&tool.example[lang]);
  }
});
test('campaign uses margin and additional variable costs for break-even',()=>{
  assert.deepEqual(evaluate('campaign-profitability').metrics?.map(m=>m.value),['4×','800','2.22×']);
  assert.equal(evaluate('campaign-profitability',{revenue:'0'}).metrics?.[2].value,'Not available');
  assert.equal(evaluate('campaign-profitability',{margin:'0'}).metrics?.[2].value,'Not available');
  assert.equal(evaluate('campaign-profitability',{costs:'3000'}).metrics?.[1].value,'-2,000');
});
test('numeric tools reject invalid ranges, blanks, negative values and zero divisors',()=>{
  const invalidCases:Record<string,string>[]=[{spend:'0'},{spend:'NaN'},{spend:''},{margin:'101'},{revenue:'-1'}];
  for(const overrides of invalidCases)assert.throws(()=>evaluate('campaign-profitability',overrides),ToolError);
  assert.throws(()=>evaluate('saas-unit-economics',{customers:'0'}),ToolError);
  assert.throws(()=>evaluate('saas-unit-economics',{churn:'101'}),ToolError);
  assert.throws(()=>evaluate('automation-savings',{runs:'1e308',before:'1e308'}),ToolError);
});
test('UTM replaces duplicates, removes blank optional values and preserves query and fragment',()=>{
  const result=evaluate('utm-builder',{url:'https://example.com/?ref=1&utm_source=old&utm_source=duplicate&utm_term=old#offer',campaign:'حملة الصيف',term:'',content:''});
  const url=new URL(result.code!);
  assert.equal(url.searchParams.get('ref'),'1');
  assert.deepEqual(url.searchParams.getAll('utm_source'),['instagram']);
  assert.equal(url.searchParams.get('utm_campaign'),'حملة الصيف');
  assert(!url.searchParams.has('utm_term'));assert(!url.searchParams.has('utm_content'));
  assert.equal(url.hash,'#offer');
  assert.throws(()=>evaluate('utm-builder',{source:'   '}),ToolError);
  for(const url of ['javascript:alert(1)','ftp://example.com','https://user:pass@example.com','example.com'])assert.throws(()=>evaluate('utm-builder',{url}),ToolError);
});
test('GA4 event output is valid JavaScript with safe literal escaping',()=>{
  const code=evaluate('ga4-event-builder',{parameters:JSON.stringify({label:'</script><script>alert(1)</script>'})}).code!;
  assert(!code.includes('</script>'));
  const fakeWindow:{dataLayer?:unknown[]}={};
  new Function('window',code)(fakeWindow);
  assert.deepEqual(fakeWindow.dataLayer,[{event:'whatsapp_click',label:'</script><script>alert(1)</script>'}]);
});
test('GA4 validates custom names, parameters, reserved keys and bounds',()=>{
  for(const event of ['1event','bad name','page_view','ga_event','x'.repeat(41)])assert.throws(()=>evaluate('ga4-event-builder',{event}),ToolError);
  for(const parameters of ['{','null','[]','{"event":"override"}','{"nested":{}}','{"__proto__":"bad"}','{"x":1e999}',JSON.stringify({long:'x'.repeat(101)}),JSON.stringify(Object.fromEntries(Array.from({length:26},(_,i)=>['key'+i,i])))])assert.throws(()=>evaluate('ga4-event-builder',{parameters}),ToolError);
});
test('automation reports capacity and negative benefits without fabricated payback',()=>{
  assert.deepEqual(evaluate('automation-savings').metrics?.map(m=>m.value),['26.67','2,000','1,900','1.58']);
  const loss=evaluate('automation-savings',{after:'12'}).metrics!;
  assert.equal(loss[0].value,'-6.67');assert.equal(loss[3].value,'Not available');
  assert.equal(evaluate('automation-savings',{setup:'0'}).metrics?.[3].value,'0');
});
test('SaaS unit economics handle zero churn, zero CAC and zero margin',()=>{
  assert.deepEqual(evaluate('saas-unit-economics').metrics?.map(m=>m.value),['200','1,600','8×','2.5']);
  assert.equal(evaluate('saas-unit-economics',{churn:'0'}).metrics?.[1].value,'Not available');
  assert.equal(evaluate('saas-unit-economics',{spend:'0'}).metrics?.[2].value,'Not available');
  assert.equal(evaluate('saas-unit-economics',{margin:'0'}).metrics?.[3].value,'Not available');
});
test('JSON inspector supports primitives, arrays, nulls and unusual keys safely',()=>{
  const result=evaluate('webhook-inspector',{payload:'{"a.b":[null,false],"<img src=x>":"<script>"}'});
  assert(result.rows?.some(r=>r.path==='$["a.b"][0]'&&r.type==='null'));
  assert(result.rows?.some(r=>r.type==='boolean'&&r.value==='false'));
  assert.equal(evaluate('webhook-inspector',{payload:'null'}).code,'null');
  assert.equal(evaluate('webhook-inspector',{payload:'42'}).rows?.[0].type,'number');
  assert.throws(()=>evaluate('webhook-inspector',{payload:'{"a":}'}),ToolError);
  assert.throws(()=>evaluate('webhook-inspector',{payload:' '.repeat(100001)}),ToolError);
  assert.throws(()=>evaluate('webhook-inspector',{payload:'{"amount":1e999}'}),ToolError);
  assert.throws(()=>evaluate('webhook-inspector',{payload:'['.repeat(130)+'0'+']'.repeat(130)}),ToolError);
});
test('JSON inspector caps wide and deep traversal and preserves formatted content',()=>{
  const wide=JSON.stringify(Array.from({length:300},(_,i)=>i));
  const result=evaluate('webhook-inspector',{payload:wide});
  assert.equal(result.rows?.length,200);assert(result.note);assert.equal(JSON.parse(result.code!).length,300);
  const deep='{"a":'.repeat(40)+'1'+'}'.repeat(40);
  assert(evaluate('webhook-inspector',{payload:deep}).note);
});
