import {text, ToolError, type Tool} from '../types.ts';
export const tool: Tool = {
  slug:'utm-builder', category:'marketing',
  title:text("UTM Link Builder for Campaign Tracking", "منشئ روابط UTM لتتبع الحملات التسويقية"),
  description:text("Build UTM tracking links for ads, email and social campaigns. Preserve existing URL parameters and learn how to review campaign traffic in GA4.", "أنشئ روابط UTM لتتبع الحملات الإعلانية والبريد ومنصات التواصل، مع الحفاظ على معاملات الرابط وشرح قراءة مصادر الزيارات في GA4."),
  intro:text('Give each campaign a consistent tracking link so acquisition reports are easier to interpret. Use the same spelling and case across your team.', 'امنح كل حملة رابط تتبع متسقًا لتسهيل قراءة تقارير الاستحواذ. وحّد الكتابة وحالة الأحرف بين أعضاء الفريق.'),
  relatedProject:'lead-management',
  fields:[
    {name:'url',label:text('Destination URL', 'رابط الوجهة'),type:'url',value:'https://example.com/offer?ref=summer',maxLength:8000},
    {name:'source',label:text('Campaign source', 'مصدر الحملة'),type:'text',value:'instagram',maxLength:200,hint:text('Example: instagram, newsletter, google', 'مثل: instagram أو newsletter أو google')},
    {name:'medium',label:text('Campaign medium', 'وسيط الحملة'),type:'text',value:'paid_social',maxLength:200},
    {name:'campaign',label:text('Campaign name', 'اسم الحملة'),type:'text',value:'summer_launch',maxLength:200},
    {name:'term',label:text('Campaign term (optional)', 'الكلمة المفتاحية للحملة (اختياري)'),type:'text',value:'',required:false,maxLength:200},
    {name:'content',label:text('Campaign content (optional)', 'محتوى الإعلان (اختياري)'),type:'text',value:'video_a',required:false,maxLength:200},
  ],
  method:text('The builder URL-encodes each value and replaces the five standard UTM parameters. Other query parameters and the URL fragment stay intact. Optional blank parameters are removed. Values are trimmed; spelling and case are preserved.', 'ترمّز الأداة القيم وتستبدل معاملات UTM الخمسة القياسية مع الحفاظ على بقية المعاملات وجزء الرابط بعد #. تُحذف المعاملات الاختيارية الفارغة والمسافات الطرفية مع الحفاظ على الكتابة وحالة الأحرف.'),
  example:text('The sample creates an Instagram paid-social link for summer_launch, identifying the video_a creative while preserving ref=summer.', 'ينشئ المثال رابط إنستغرام مدفوعًا لحملة summer_launch ويحدد الإعلان video_a مع الحفاظ على ref=summer.'),
  limitations:text('A tagged link does not install analytics or guarantee attribution. Do not put personal information in UTM values. Use these links for external campaigns; internal navigation tags can distort acquisition reporting.', 'الرابط لا يثبت أدوات التحليل ولا يضمن الإسناد. لا تضع معلومات شخصية في القيم. استخدمه للحملات الخارجية لأن وسوم الروابط الداخلية قد تشوّه تقارير الاستحواذ.'),
  evaluate(v) {
    let url: URL;
    try { url=new URL(v.url); } catch { throw new ToolError(text('Enter a complete HTTP or HTTPS URL.', 'أدخل رابط HTTP أو HTTPS كاملًا.')); }
    if(!['https:','http:'].includes(url.protocol)||url.username||url.password) throw new ToolError(text('Use HTTP or HTTPS without embedded login credentials.', 'استخدم HTTP أو HTTPS دون بيانات تسجيل دخول داخل الرابط.'));
    for(const key of ['source','medium','campaign','term','content']) {
      const value=(v[key]||'').trim();
      if(['source','medium','campaign'].includes(key)&&!value) throw new ToolError(text('Source, medium and campaign are required.', 'المصدر والوسيط واسم الحملة مطلوبة.'));
      url.searchParams.delete(`utm_${key}`);
      if(value)url.searchParams.set(`utm_${key}`,value);
    }
    return {code:url.href};
  },
};
