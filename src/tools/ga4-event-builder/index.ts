import {text, ToolError, type Tool} from '../types.ts';
export const tool: Tool = {
  slug:'ga4-event-builder', category:'development',
  title:text("GA4 dataLayer Event Builder for GTM", "منشئ كود أحداث GA4 عبر Google Tag Manager"),
  description:text("Generate a dataLayer.push event for GTM with custom JSON parameters. Follow the trigger, variable and GA4 tag setup, then test your tracking.", "أنشئ كود dataLayer.push لأحداث GA4، وتعرّف على إعداد المشغّل والمتغيرات والوسم في Google Tag Manager واختبار التتبع."),
  intro:text('Turn a product action into a clear tracking event. Generate the browser snippet, then connect it to a GA4 event tag in Google Tag Manager.', 'حوّل إجراء المستخدم إلى حدث تتبع واضح. أنشئ الكود ثم اربطه بوسم حدث GA4 في Google Tag Manager.'),
  relatedProject:'whatsapp-event-tracking',
  fields:[
    {name:'event',label:text('Custom event name', 'اسم الحدث المخصص'),type:'text',value:'whatsapp_click',maxLength:40,hint:text('Start with a letter; use letters, numbers and underscores. Example: whatsapp_click.', 'ابدأ بحرف إنجليزي واستخدم الحروف والأرقام والشرطة السفلية. مثل whatsapp_click.')},
    {name:'parameters',label:text('Parameters (JSON object)', 'المعاملات (كائن JSON)'),type:'textarea',value:'{\n  "button_location": "contact",\n  "page_language": "en"\n}',maxLength:10000,hint:text('Up to 25 custom parameters. Values: strings up to 100 characters, finite numbers, or booleans. Do not include personal data.', 'حتى ٢٥ معاملًا مخصصًا. القيم: نص حتى ١٠٠ حرف أو رقم محدود أو قيمة منطقية. لا تُضمّن بيانات شخصية.')},
  ],
  method:text('The event key identifies the action. Other keys supply context that GTM can read through Data Layer Variables. A matching Custom Event trigger activates your configured GA4 Event tag. The snippet preserves an existing dataLayer rather than replacing it.', 'يحدد المفتاح event الإجراء، وتحمل المفاتيح الأخرى سياقه الذي يقرأه GTM عبر Data Layer Variables. يفعّل مشغّل Custom Event المطابق وسم GA4 Event الذي أعددته. يحافظ الكود على dataLayer الموجودة بدل استبدالها.'),
  example:text('whatsapp_click with button_location=contact identifies which button was used. The snippet queues the event; GTM must be installed and configured to send it to GA4.', 'الحدث whatsapp_click مع button_location=contact يوضح الزر المستخدم. يضيف الكود الحدث إلى قائمة الانتظار ويجب تثبيت GTM وإعداده لإرساله إلى GA4.'),
  limitations:text('This builder targets flat custom events, not ecommerce item arrays. It validates naming syntax and common reserved prefixes, not every GA4 reserved name or account-specific rule. Confirm the naming rules in the linked documentation. Consent and your tracking setup control whether events are sent. Custom parameters may need GA4 custom definitions for reporting.', 'تدعم الأداة أحداثًا مخصصة بمعاملات بسيطة ولا تدعم مصفوفات منتجات التجارة الإلكترونية. تتحقق من صيغة الأسماء والبادئات المحجوزة الشائعة وليس كل الأسماء المحجوزة أو قواعد الحساب. راجع الوثائق المرتبطة. يعتمد إرسال الأحداث على الموافقة وإعدادات التتبع، وقد تحتاج المعاملات إلى تعريفات مخصصة في GA4.'),
  evaluate(v) {
    const valid=(s:string)=>/^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(s)&&!/^(?:google_|ga_|firebase_|gtm_|query_id)/i.test(s);
    const reserved=['ad_impression','app_remove','app_store_refund','app_store_subscription_cancel','app_store_subscription_renew','click','error','file_download','first_open','first_visit','form_start','form_submit','in_app_purchase','page_view','scroll','session_start','user_engagement','view_complete','video_progress','video_start','view_search_results'];
    if(!valid(v.event)||reserved.includes(v.event.toLowerCase())) throw new ToolError(text('Use a custom event name: a letter first, then letters, numbers or underscores (40 characters maximum). Avoid reserved names and prefixes.', 'استخدم اسم حدث مخصص يبدأ بحرف إنجليزي ثم حروف أو أرقام أو شرطة سفلية حتى ٤٠ حرفًا. تجنب الأسماء والبادئات المحجوزة.'));
    let parameters: unknown;
    try {parameters=JSON.parse(v.parameters);} catch {throw new ToolError(text('Parameters must be valid JSON.', 'يجب أن تكون المعاملات JSON صالحًا.'));}
    if(!parameters||typeof parameters!=='object'||Array.isArray(parameters)||Object.keys(parameters).length>25) throw new ToolError(text('Use a JSON object with at most 25 parameters.', 'استخدم كائن JSON يحتوي على ٢٥ معاملًا كحد أقصى.'));
    for(const [key,value] of Object.entries(parameters)) {
      if(!valid(key)||['event','__proto__','constructor','prototype'].includes(key)||!['string','number','boolean'].includes(typeof value)||(typeof value==='string'&&[...value].length>100)||(typeof value==='number'&&!Number.isFinite(value))) throw new ToolError(text('Use valid parameter names and simple values: strings (100 characters maximum), finite numbers or booleans. The key "event" is reserved.', 'استخدم أسماء معاملات صالحة وقيمًا بسيطة: نصوص حتى ١٠٠ حرف أو أرقام محدودة أو قيم منطقية. المفتاح event محجوز.'));
    }
    const payload=JSON.stringify({event:v.event,...parameters},null,2).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
    return {code:`window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push(${payload});`};
  },
};
