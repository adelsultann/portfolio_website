import {text, ToolError, type Tool, type Result} from '../types.ts';
export const tool: Tool = {
  slug:'webhook-inspector',category:'development',
  title:text("JSON Validator & Webhook Payload Inspector", "مدقق ومنسق JSON لبيانات Webhook"),
  description:text("Validate and format JSON in your browser. Inspect webhook field paths, types and values for integration mapping, without uploading your payload.", "تحقق من صحة JSON ونسّقه، وافحص مسارات حقول Webhook وأنواعها وقيمها لتجهيز التكامل، داخل المتصفح دون رفع البيانات."),
  intro:text('Paste a sample payload to understand its structure before mapping fields in an integration. Nothing is uploaded, and this tool does not receive live webhooks.', 'الصق نموذجًا من البيانات لفهم بنيتها قبل ربط الحقول في التكامل. لا تُرفع البيانات ولا تستقبل الأداة طلبات Webhook مباشرة.'),
  relatedProject:'invoice-automation',
  fields:[{name:'payload',label:text('JSON payload', 'بيانات JSON'),type:'textarea',value:'{\n  "event": "invoice.created",\n  "invoice": {\n    "id": "INV-1042",\n    "amount": 250,\n    "paid": false,\n    "items": [{"name": "Service", "quantity": 1}]\n  }\n}',maxLength:100000,hint:text('Maximum 100,000 characters. Displays up to 200 field rows and 32 nesting levels. Avoid live credentials.', 'الحد الأقصى ١٠٠٬٠٠٠ حرف. تعرض الأداة حتى ٢٠٠ صف و٣٢ مستوى تداخل. تجنب بيانات الدخول الفعلية.')}],
  method:text('The inspector parses JSON, formats it with two-space indentation and traverses its fields using bracket paths such as $["invoice"]["amount"]. Arrays use numeric indices. The table identifies objects, arrays, null, strings, numbers and booleans.', 'تحلل الأداة JSON وتنسقه بمسافتين وتستعرض الحقول بمسارات مثل $["invoice"]["amount"]. تستخدم المصفوفات فهارس رقمية. يوضح الجدول الكائنات والمصفوفات والقيم الفارغة والنصوص والأرقام والقيم المنطقية.'),
  example:text('In the sample, $["invoice"]["amount"] is the number 250 and $["invoice"]["paid"] is the boolean false. These paths help identify fields for mapping; they are descriptive paths, not executable expressions.', 'في المثال، المسار $["invoice"]["amount"] رقم قيمته ٢٥٠ و$["invoice"]["paid"] قيمة منطقية false. تساعد المسارات على تحديد الحقول للربط وهي وصفية وليست تعبيرات تنفيذية.'),
  limitations:text('This is a local JSON inspector, not an HTTP endpoint or schema validator. JavaScript numbers may round integers beyond 9,007,199,254,740,991; represent large identifiers as strings. Duplicate JSON keys retain only the final value. Field traversal is capped to keep the page responsive. Payloads deeper than 128 levels or containing numbers outside the finite range are rejected.', 'هذه أداة محلية لفحص JSON وليست نقطة استقبال HTTP أو مدقق مخطط. قد تُقرّب أرقام JavaScript الأعداد الصحيحة الأكبر من 9,007,199,254,740,991؛ مثّل المعرّفات الكبيرة كنصوص. عند تكرار المفتاح تبقى قيمته الأخيرة. يُحدّ الاستعراض للحفاظ على سرعة الصفحة. تُرفض البيانات الأعمق من ١٢٨ مستوى والأرقام خارج النطاق المحدود.'),
  evaluate(v) {
    if(v.payload.length>100000)throw new ToolError(text('Keep the payload under 100,000 characters.', 'اجعل البيانات أقل من ١٠٠٬٠٠٠ حرف.'));
    let value:unknown;
    try {value=JSON.parse(v.payload);} catch {throw new ToolError(text('Invalid JSON. Check double quotes, commas and brackets.', 'JSON غير صالح. تحقق من علامات الاقتباس المزدوجة والفواصل والأقواس.'));}
    // Guard the complete payload before formatting, including parts outside the table cap.
    const check=[{value,depth:0}];
    while(check.length){
      const item=check.pop()!;
      if(item.depth>128)throw new ToolError(text('Limit JSON nesting to 128 levels.', 'اجعل تداخل JSON ضمن ١٢٨ مستوى.'));
      if(typeof item.value==='number'&&!Number.isFinite(item.value))throw new ToolError(text('A number exceeds the supported range. Quote large numeric identifiers as strings.', 'يتجاوز أحد الأرقام النطاق المدعوم. ضع المعرّفات الرقمية الكبيرة بين علامتي اقتباس كنصوص.'));
      if(item.value!==null&&typeof item.value==='object')for(const child of Object.values(item.value))check.push({value:child,depth:item.depth+1});
    }
    const rows:NonNullable<Result['rows']>=[], stack=[{path:'$',value,depth:0}];
    let truncated=false;
    while(stack.length&&rows.length<200){
      const item=stack.pop()!;
      const type=item.value===null?'null':Array.isArray(item.value)?'array':typeof item.value;
      const container=item.value!==null&&typeof item.value==='object';
      rows.push({path:item.path,type,value:container?`${Object.keys(item.value as object).length} ${type==='array'?'items':'fields'}`:JSON.stringify(item.value)});
      if(container){
        const entries=Object.entries(item.value as Record<string,unknown>);
        if(item.depth>=32){if(entries.length)truncated=true;continue;}
        const selected=entries.slice(0,200);
        if(entries.length>200)truncated=true;
        for(const [key,child] of selected.reverse())stack.push({path:`${item.path}[${Array.isArray(item.value)?key:JSON.stringify(key)}]`,value:child,depth:item.depth+1});
      }
    }
    let code:string;
    try {code=JSON.stringify(value,null,2);}catch {throw new ToolError(text('This payload is nested too deeply to format. Reduce its nesting.', 'البيانات متداخلة بدرجة كبيرة. قلّل مستويات التداخل.'));}
    return {code,rows,...(truncated||stack.length?{note:text('Field table limited to 200 rows and 32 levels. The formatted JSON is complete.', 'جدول الحقول محدود بـ٢٠٠ صف و٣٢ مستوى. JSON المنسق كامل.')}: {})};
  },
};
