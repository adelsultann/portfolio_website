import {text, type Tool} from '../types.ts';
import {number, positive, format, unavailable} from '../shared.ts';
export const tool: Tool = {
  slug: 'campaign-profitability', category: 'marketing',
  title:text("ROAS & Break-Even ROAS Calculator", "حاسبة العائد على الإنفاق الإعلاني ROAS ونقطة التعادل"),
  description:text("Calculate ROAS, break-even ROAS and the amount left after advertising and variable costs. See a worked example and understand campaign profitability.", "احسب العائد على الإنفاق الإعلاني ROAS وحد التعادل والمبلغ المتبقي بعد التكاليف والإعلانات، مع مثال عملي يوضح ربحية الحملة."),
  intro: text('Revenue alone does not tell you whether advertising pays off. Include product and fulfilment costs to see what remains after advertising.', 'الإيرادات وحدها لا تكفي لتقييم الإعلان. أضف تكلفة المنتجات والتنفيذ لتعرف المبلغ المتبقي بعد الإنفاق الإعلاني.'),
  relatedProject: 'whatsapp-event-tracking',
  fields: [
    {name:'spend', label:text('Ad spend', 'الإنفاق الإعلاني'), type:'number', value:'1000', min:0.01, step:'any'},
    {name:'revenue', label:text('Attributed revenue', 'الإيرادات المنسوبة للحملة'), type:'number', value:'4000', min:0, step:'any'},
    {name:'margin', label:text('Gross margin (%)', 'هامش الربح الإجمالي (%)'), type:'number', value:'50', min:0, max:100, step:'any', hint:text('After product costs, before advertising and the additional costs below.', 'بعد تكلفة المنتجات وقبل الإعلان والتكاليف الإضافية أدناه.')},
    {name:'costs', label:text('Additional variable costs', 'التكاليف المتغيرة الإضافية'), type:'number', value:'200', min:0, step:'any', hint:text('Total fulfilment, payment and other campaign costs not already included in the margin. Use one currency throughout.', 'تكاليف تجهيز الطلبات والشحن ورسوم الدفع والتكاليف غير المحتسبة في الهامش. استخدم عملة واحدة لكل المبالغ.')},
  ],
  method: text('ROAS = revenue ÷ ad spend. Contribution after ads = revenue × gross margin − additional variable costs − ad spend. Effective pre-ad margin = gross margin − additional variable costs ÷ revenue. Break-even ROAS = 1 ÷ effective pre-ad margin.', 'ROAS = الإيرادات ÷ الإنفاق الإعلاني. المساهمة بعد الإعلان = الإيرادات × الهامش − التكاليف المتغيرة الإضافية − الإنفاق. الهامش الفعلي قبل الإعلان = الهامش − التكاليف الإضافية ÷ الإيرادات. ROAS التعادل = ١ ÷ الهامش الفعلي.'),
  example: text('With 1,000 in spend, 4,000 in revenue, a 50% margin and 200 in other costs: ROAS is 4×, contribution after ads is 800, and break-even ROAS is about 2.22×.', 'عند إنفاق ١٬٠٠٠ وإيرادات ٤٬٠٠٠ وهامش ٥٠٪ وتكاليف إضافية ٢٠٠: ROAS يساوي ٤ أضعاف، والمساهمة بعد الإعلان ٨٠٠، وROAS التعادل نحو ٢٫٢٢ ضعف.'),
  limitations: text('Contribution is not net profit: fixed overhead, taxes, returns and attribution errors may change the result. Break-even ROAS assumes the effective variable-cost ratio stays constant as revenue grows. With no revenue or a non-positive effective margin, that threshold cannot be estimated.', 'المساهمة ليست صافي الربح؛ المصاريف الثابتة والضرائب والمرتجعات وأخطاء الإسناد تؤثر على النتيجة. يفترض التعادل ثبات نسبة التكاليف المتغيرة مع نمو الإيرادات. لا يمكن تقدير الحد عند انعدام الإيرادات أو عدم إيجابية الهامش الفعلي.'),
  evaluate(v, lang) {
    const spend=positive(number(v,'spend')), revenue=number(v,'revenue'), margin=number(v,'margin',100)/100, costs=number(v,'costs');
    const effective=revenue>0 ? margin-costs/revenue : 0;
    return {metrics:[
      {label:text('ROAS', 'العائد على الإنفاق'), value:format(revenue/spend,lang,'×')},
      {label:text('Contribution after ads', 'المساهمة بعد الإعلان'), value:format(revenue*margin-costs-spend,lang)},
      {label:text('Break-even ROAS', 'ROAS التعادل'), value:effective>0?format(1/effective,lang,'×'):unavailable(lang)},
    ]};
  },
};
