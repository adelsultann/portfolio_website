import {text, type Tool} from '../types.ts';
import {number, positive, format, unavailable} from '../shared.ts';
export const tool: Tool = {
  slug:'saas-unit-economics',category:'business',
  title:text("SaaS CAC, LTV & Payback Calculator", "حاسبة تكلفة اكتساب العميل CAC وقيمته LTV للمنتجات الاشتراكية"),
  description:text("Calculate SaaS CAC, estimated LTV, LTV:CAC and acquisition payback from revenue, margin and monthly customer churn. Understand the assumptions.", "احسب تكلفة اكتساب العميل CAC وقيمته التقديرية LTV وفترة الاسترداد لمنتجات الاشتراك، وافهم أثر هامش الربح ومعدل فقد العملاء."),
  intro:text('Check whether subscription revenue can support your acquisition costs. Match your acquisition spending and new paying customers to the same period.', 'تحقق من قدرة إيرادات الاشتراك على تغطية تكلفة الاستحواذ. طابق الإنفاق والعملاء الجدد الدافعين لنفس الفترة.'),
  relatedProject:'sofra',
  fields:[
    {name:'spend',label:text('Sales & marketing spend for period', 'إنفاق المبيعات والتسويق للفترة'),type:'number',value:'10000',min:0,step:'any'},
    {name:'customers',label:text('New paying customers in period', 'العملاء الدافعون الجدد للفترة'),type:'number',value:'50',min:1,step:'1'},
    {name:'arpu',label:text('Monthly revenue per customer', 'الإيراد الشهري لكل عميل'),type:'number',value:'100',min:0,step:'any'},
    {name:'margin',label:text('Gross margin (%)', 'هامش الربح الإجمالي (%)'),type:'number',value:'80',min:0,max:100,step:'any'},
    {name:'churn',label:text('Monthly customer churn (%)', 'فقد العملاء الشهري (%)'),type:'number',value:'5',min:0,max:100,step:'any',hint:text('Customer churn, not revenue churn. Enter 5 for 5%.', 'فقد العملاء وليس الإيرادات. أدخل 5 لنسبة 5٪.')},
  ],
  method:text('CAC = sales and marketing spend ÷ new paying customers. Monthly gross profit per customer = monthly revenue × gross margin. Estimated LTV = monthly gross profit ÷ monthly customer churn. LTV:CAC = LTV ÷ CAC. CAC payback months = CAC ÷ monthly gross profit. Use one currency.', 'CAC = إنفاق المبيعات والتسويق ÷ العملاء الجدد الدافعين. الربح الإجمالي الشهري للعميل = الإيراد الشهري × الهامش. LTV التقديرية = الربح الإجمالي الشهري ÷ فقد العملاء الشهري. النسبة = LTV ÷ CAC. أشهر الاسترداد = CAC ÷ الربح الإجمالي الشهري. استخدم عملة واحدة.'),
  example:text('Spending 10,000 to acquire 50 customers gives CAC of 200. At 100 monthly revenue, 80% margin and 5% monthly churn: estimated LTV is 1,600, LTV:CAC is 8×, and CAC payback is 2.5 months.', 'إنفاق ١٠٬٠٠٠ لاكتساب ٥٠ عميلًا يعطي CAC قدرها ٢٠٠. مع إيراد شهري ١٠٠ وهامش ٨٠٪ وتسرب شهري ٥٪: LTV تساوي ١٬٦٠٠ والنسبة ٨ أضعاف والاسترداد خلال ٢٫٥ شهر.'),
  limitations:text('This simplified model assumes stable churn and margins, with no expansion revenue, discounting or cohort changes. Zero churn does not prove infinite value; LTV is unavailable in that case. Zero CAC leaves LTV:CAC undefined. Validate assumptions against actual customer cohorts.', 'يفترض النموذج ثبات الفقد والهامش دون توسع في الإيرادات أو خصم مالي أو تغير الشرائح. الفقد الصفري لا يثبت قيمة لا نهائية؛ لا تُقدّر LTV عنده. عندما تكون CAC صفرًا لا تُعرّف النسبة. تحقق من الافتراضات باستخدام شرائح العملاء الفعلية.'),
  evaluate(v,lang){
    const spend=number(v,'spend'), customers=positive(number(v,'customers')), arpu=number(v,'arpu'), margin=number(v,'margin',100)/100, churn=number(v,'churn',100)/100;
    const cac=spend/customers, gross=arpu*margin, ltv=churn>0?gross/churn:null;
    return {metrics:[
      {label:text('CAC', 'تكلفة اكتساب العميل'),value:format(cac,lang)},
      {label:text('Estimated LTV', 'قيمة العميل التقديرية'),value:ltv===null?unavailable(lang):format(ltv,lang)},
      {label:text('LTV:CAC', 'نسبة LTV إلى CAC'),value:ltv!==null&&cac>0?format(ltv/cac,lang,'×'):unavailable(lang)},
      {label:text('CAC payback (months)', 'استرداد CAC (بالأشهر)'),value:gross>0?format(cac/gross,lang):unavailable(lang)},
    ]};
  },
};
