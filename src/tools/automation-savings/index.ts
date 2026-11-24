import {text, type Tool} from '../types.ts';
import {number, format, unavailable} from '../shared.ts';
export const tool: Tool = {
  slug:'automation-savings',category:'business',
  title:text("Automation Time Savings & Payback Calculator", "حاسبة توفير الوقت واسترداد تكلفة الأتمتة"),
  description:text("Estimate hours saved, monthly capacity value and automation payback. Include setup, operating costs and human review to assess a workflow.", "قدّر ساعات العمل الموفرة وقيمة الوقت وفترة استرداد تكلفة الأتمتة، مع احتساب الإعداد والتشغيل والمراجعة البشرية."),
  intro:text('Estimate the value of a repetitive workflow before building an automation. Include the human review that will still be needed.', 'قدّر قيمة أتمتة المهمة المتكررة قبل تنفيذها، مع احتساب المراجعة البشرية التي ستظل مطلوبة.'),
  relatedProject:'invoice-automation',
  fields:[
    {name:'runs',label:text('Runs per month', 'عدد العمليات شهريًا'),type:'number',value:'200',min:0,step:'1'},
    {name:'before',label:text('Manual minutes per run', 'دقائق العمل اليدوي لكل عملية'),type:'number',value:'10',min:0,step:'any'},
    {name:'after',label:text('Minutes per run after automation', 'الدقائق لكل عملية بعد الأتمتة'),type:'number',value:'2',min:0,step:'any'},
    {name:'hourly',label:text('Value per working hour', 'قيمة ساعة العمل'),type:'number',value:'75',min:0,step:'any'},
    {name:'monthly',label:text('Monthly operating cost', 'تكلفة التشغيل الشهرية'),type:'number',value:'100',min:0,step:'any'},
    {name:'setup',label:text('One-time setup cost', 'تكلفة الإعداد لمرة واحدة'),type:'number',value:'3000',min:0,step:'any'},
  ],
  method:text('Monthly hours saved = runs × (manual minutes − automated minutes) ÷ 60. Capacity value = hours saved × hourly value. Net monthly benefit = capacity value − monthly operating cost. Payback months = setup cost ÷ positive net monthly benefit. Use one currency for all costs.', 'الساعات الموفرة = عدد العمليات × (الدقائق اليدوية − دقائق ما بعد الأتمتة) ÷ ٦٠. قيمة الوقت = الساعات الموفرة × قيمة الساعة. المنفعة الشهرية = قيمة الوقت − التشغيل الشهري. فترة الاسترداد = الإعداد ÷ المنفعة الشهرية الموجبة. استخدم عملة واحدة.'),
  example:text('For 200 runs, reducing 10 minutes to 2 saves 26.67 hours monthly. At 75 per hour and 100 monthly cost, the estimated benefit is 1,900 and a 3,000 setup pays back in about 1.58 months.', 'عند تنفيذ ٢٠٠ عملية وخفض المدة من ١٠ إلى دقيقتين، يُوفّر نحو ٢٦٫٦٧ ساعة شهريًا. بقيمة ٧٥ للساعة وتشغيل ١٠٠، تبلغ المنفعة ١٬٩٠٠ ويُسترد إعداد بقيمة ٣٬٠٠٠ خلال نحو ١٫٥٨ شهر.'),
  limitations:text('Recovered employee time is capacity, not necessarily cash savings. Include monitoring, exceptions, maintenance and review in your assumptions. A negative time saving means the proposed workflow takes longer. Payback is unavailable when the monthly benefit is zero or negative.', 'الوقت المستعاد قدرة عمل إضافية وليس بالضرورة توفيرًا نقديًا. احتسب المتابعة والاستثناءات والصيانة والمراجعة. التوفير السالب يعني أن الإجراء الجديد يستغرق وقتًا أطول. لا توجد فترة استرداد عند منفعة شهرية صفرية أو سالبة.'),
  evaluate(v,lang) {
    const runs=number(v,'runs'), before=number(v,'before'), after=number(v,'after'), hourly=number(v,'hourly'), monthly=number(v,'monthly'), setup=number(v,'setup');
    const hours=runs*(before-after)/60, capacity=hours*hourly, net=capacity-monthly;
    return {metrics:[
      {label:text('Hours saved / month', 'الساعات الموفرة شهريًا'),value:format(hours,lang)},
      {label:text('Monthly capacity value', 'قيمة الوقت شهريًا'),value:format(capacity,lang)},
      {label:text('Net monthly benefit', 'المنفعة الشهرية'),value:format(net,lang)},
      {label:text('Payback (months)', 'الاسترداد (بالأشهر)'),value:net>0?format(setup/net,lang):unavailable(lang)},
    ]};
  },
};
