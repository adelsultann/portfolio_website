// Editorial content is imported only by static pages, never by calculator chunks.
import {text, type Text} from './types';

interface Guide {
  steps: Text[];
  interpretation: Text;
  mistakes: Text[];
  questions: {question: Text; answer: Text}[];
  sources?: {url: string; label: Text}[];
}

export const guides: Record<string, Guide> = {
  'campaign-profitability': {
    steps: [
      text('Enter advertising spend and revenue attributed to the same campaign and period.', 'أدخل الإنفاق الإعلاني والإيرادات المنسوبة إلى الحملة نفسها وخلال الفترة نفسها.'),
      text('Enter gross margin after product costs, then add shipping, payment fees and other variable costs only if they are not already included.', 'أدخل هامش الربح الإجمالي بعد تكلفة المنتجات، ثم أضف الشحن ورسوم الدفع والتكاليف المتغيرة التي لم تُحتسب في الهامش.'),
      text('Compare your ROAS with break-even ROAS, then review the amount remaining after ads before deciding whether to increase spending.', 'قارن العائد على الإنفاق الإعلاني بحد التعادل، وراجع المبلغ المتبقي بعد الإعلان قبل اتخاذ قرار زيادة الإنفاق.'),
    ],
    interpretation: text('ROAS of 4× means four units of revenue for every unit spent on advertising. It does not mean four units of profit. In the sample, revenue of 4,000 leaves 800 after product costs, additional variable costs and ads. ROAS above the estimated 2.22× break-even point covers these modeled costs; fixed overhead and other excluded expenses still need to be paid.', 'عائد إعلاني قدره ٤ أضعاف يعني إيرادات بقيمة ٤ ريالات مقابل كل ريال إعلاني، ولا يعني ربحًا قدره ٤ ريالات. في المثال، يتبقى ٨٠٠ من إيرادات قدرها ٤٬٠٠٠ بعد تكلفة المنتجات والتكاليف المتغيرة الإضافية والإعلانات. تجاوز حد التعادل المقدر بـ٢٫٢٢ ضعف يغطي التكاليف المدخلة فقط؛ وتبقى المصاريف الثابتة وأي تكاليف مستبعدة.'),
    mistakes: [
      text('Do not count shipping or payment fees twice. Keep the gross-margin definition consistent.', 'لا تحتسب الشحن أو رسوم الدفع مرتين. استخدم تعريفًا ثابتًا لهامش الربح.'),
      text('Use a consistent tax basis for revenue and costs. Adjust revenue for refunds and cancellations, and check whether ad platforms claim overlapping sales.', 'استخدم أساسًا ضريبيًا متسقًا للإيرادات والتكاليف. عدّل الإيرادات للمرتجعات والإلغاءات، وتحقق من عدم احتساب البيع نفسه لدى أكثر من منصة إعلانية.'),
    ],
    questions: [
      {question:text('What is the difference between ROAS and ROI?', 'ما الفرق بين ROAS وROI؟'),answer:text('ROAS divides attributed revenue by ad spend. ROI compares profit with the investment used to generate it. This tool reports contribution after ads, not full business ROI or net profit.', 'يقسم ROAS الإيرادات المنسوبة للإعلان على الإنفاق الإعلاني. أما ROI فيقارن الربح بالاستثمار الذي حققه. تعرض هذه الأداة المبلغ المتبقي بعد الإعلان، ولا تحسب العائد الكامل على الاستثمار أو صافي ربح المنشأة.')},
      {question:text('What is a good ROAS?', 'ما العائد الإعلاني الجيد؟'),answer:text('There is no universal target. A useful target must cover your variable costs, advertising, overhead and desired profit. Start with your own break-even point rather than a benchmark from a different business.', 'لا يوجد رقم مناسب للجميع. يجب أن يغطي هدفك التكاليف المتغيرة والإعلانات والمصاريف الثابتة والربح المطلوب. ابدأ بحد التعادل الخاص بنشاطك بدل الاعتماد على رقم من نشاط مختلف.')},
    ],
  },
  'utm-builder': {
    steps: [
      text('Paste the final landing-page URL. Existing non-UTM query parameters and the fragment are preserved.', 'الصق رابط صفحة الهبوط النهائي. تحتفظ الأداة بمعاملات الرابط الأخرى والجزء الذي يلي علامة #.'),
      text('Choose a source, medium and campaign name. For example: instagram / paid_social / winter_offer, or newsletter / email / product_launch.', 'اختر المصدر والوسيط واسم الحملة. مثال: instagram / paid_social / winter_offer أو newsletter / email / product_launch.'),
      text('Use content to distinguish creatives, such as video_a and image_b. Use term for a paid keyword when relevant. Copy and test the generated link before publishing.', 'استخدم محتوى الإعلان لتمييز النسخ، مثل video_a وimage_b، والكلمة المفتاحية عند الحاجة. انسخ الرابط الناتج واختبره قبل النشر.'),
    ],
    interpretation: text('Source identifies where the visit came from; medium identifies the marketing channel; campaign groups links under one initiative. For example, instagram and paid_social distinguish the platform from the channel. With GA4 correctly installed, use the Traffic acquisition report and session source/medium or session campaign dimensions to review the resulting traffic. A click is not proof of a lead or sale.', 'يحدد المصدر المنصة التي جاءت منها الزيارة، ويحدد الوسيط القناة التسويقية، ويجمع اسم الحملة روابط المبادرة الواحدة. مثلًا، instagram هي المنصة وpaid_social هي القناة. عند إعداد GA4 بشكل صحيح، راجع تقرير اكتساب الزيارات وأبعاد مصدر/وسيط الجلسة أو حملة الجلسة. النقرة وحدها لا تثبت تسجيل عميل محتمل أو عملية بيع.'),
    mistakes: [
      text('Keep naming and case consistent: Instagram and instagram can fragment reporting. Do not use campaign tags on internal navigation.', 'وحّد الأسماء وحالة الأحرف؛ قد تؤدي Instagram وinstagram إلى تقسيم التقارير. لا تستخدم وسوم الحملات في روابط التنقل الداخلية.'),
      text('Test redirects: the final landing page must retain the tracking parameters. Never put names, phone numbers or other personal data into UTM values.', 'اختبر إعادة التوجيه وتأكد من وصول معاملات التتبع إلى صفحة الهبوط النهائية. لا تضع أسماء أو أرقام هواتف أو بيانات شخصية في قيم UTM.'),
    ],
    questions: [
      {question:text('Do I need UTMs for Google Ads?', 'هل أحتاج إلى UTM في إعلانات Google؟'),answer:text('Google Ads auto-tagging and a linked GA4 property can supply campaign information. Manual UTMs may support other reporting systems, but they are not a replacement for that setup. Preserve auto-tagging identifiers and check your attribution configuration before combining methods.', 'يمكن للوسم التلقائي في Google Ads وربط الحساب بـGA4 توفير معلومات الحملة. قد تخدم وسوم UTM أنظمة تقارير أخرى، لكنها لا تغني عن هذا الإعداد. حافظ على معرّفات الوسم التلقائي وراجع إعدادات الإسناد قبل الجمع بين الطريقتين.')},
      {question:text('Does this link track conversions by itself?', 'هل يتتبع الرابط التحويلات بمفرده؟'),answer:text('No. UTMs label incoming traffic. Your site still needs analytics and the relevant lead, signup or purchase events. Browser settings, consent and redirects can affect measurement.', 'لا. تصف UTM مصدر الزيارات الواردة. يحتاج الموقع أيضًا إلى أدوات التحليل وأحداث العملاء المحتملين أو التسجيل أو الشراء. وقد تؤثر إعدادات المتصفح والموافقة وإعادة التوجيه في القياس.')},
    ],
    sources:[{url:'https://support.google.com/analytics/answer/10917952',label:text('Google Analytics campaign URL guidance', 'دليل Google Analytics لروابط الحملات')}],
  },
  'ga4-event-builder': {
    steps: [
      text('Choose a custom action name such as whatsapp_click. Add simple JSON parameters such as button_location and page_language, then generate the snippet.', 'اختر اسم إجراء مخصصًا مثل whatsapp_click، وأضف معاملات JSON بسيطة مثل button_location وpage_language، ثم أنشئ الكود.'),
      text('Install GTM on your site. Run the generated dataLayer.push only when the intended action occurs, for example inside the WhatsApp button click handler.', 'ثبّت GTM في موقعك. شغّل dataLayer.push الناتج عند حدوث الإجراء المقصود فقط، مثل النقر على زر واتساب.'),
      text('In GTM, create a Custom Event trigger with exactly the same event name. Create Data Layer Variables for the parameter keys you want to send.', 'أنشئ في GTM مشغّل Custom Event مطابقًا تمامًا لاسم الحدث. وأنشئ Data Layer Variables لمفاتيح المعاملات التي تريد إرسالها.'),
      text('Configure a GA4 Event tag with your Google tag, event name and parameter variables, then attach the Custom Event trigger.', 'أعدّ وسم GA4 Event باستخدام وسم Google واسم الحدث ومتغيرات المعاملات، ثم اربطه بمشغّل الحدث المخصص.'),
      text('Test the action in GTM Preview and GA4 DebugView. Confirm one intended action produces one event, check consent behavior, then publish the container.', 'اختبر الإجراء في GTM Preview وGA4 DebugView. تأكد من أن الإجراء الواحد يرسل حدثًا واحدًا، وراجع سلوك الموافقة، ثم انشر الحاوية.'),
    ],
    interpretation: text('The data layer is the handoff between your site and GTM. The event key identifies the action; other keys carry context. Generating or copying this code does not install tracking or send data to GA4. A whatsapp_click event measures contact intent, not a completed conversation or sale. Confirm the downstream outcome separately.', 'طبقة البيانات هي حلقة الوصل بين موقعك وGTM. يحدد المفتاح event الإجراء، وتحمل المفاتيح الأخرى سياقه. إنشاء الكود أو نسخه لا يثبّت التتبع ولا يرسل البيانات إلى GA4. يقيس حدث whatsapp_click نية التواصل، وليس محادثة مكتملة أو عملية بيع. تحقق من النتيجة النهائية بشكل منفصل.'),
    mistakes: [
      text('Do not trigger the snippet on every page load when it represents a click. Avoid a second GTM click trigger that sends the same event again.', 'لا تشغّل الكود عند كل تحميل للصفحة إذا كان يمثل نقرة. وتجنب مشغّل نقر إضافي يرسل الحدث نفسه مرة ثانية.'),
      text('Keep event names and parameter keys identical across code and GTM. Never include email addresses, phone numbers or other personally identifiable information.', 'طابق أسماء الأحداث ومفاتيح المعاملات بين الكود وGTM. لا تُضمّن البريد الإلكتروني أو أرقام الهواتف أو أي معلومات تحدد هوية الأشخاص.'),
    ],
    questions: [
      {question:text('Why is my event missing from GA4?', 'لماذا لا يظهر الحدث في GA4؟'),answer:text('Check that GTM is installed, the action pushes the event, the trigger matches its exact name and the tag points to the correct property. Use Preview and DebugView to isolate each stage. Consent, blockers and report processing can also affect visibility.', 'تحقق من تثبيت GTM، وإضافة الحدث عند تنفيذ الإجراء، ومطابقة اسم المشغّل، وتوجيه الوسم إلى الموقع الصحيح في GA4. استخدم Preview وDebugView لفحص كل مرحلة. وقد تؤثر الموافقة وأدوات الحجب ووقت معالجة التقارير في الظهور.')},
      {question:text('Will custom parameters appear in reports automatically?', 'هل تظهر المعاملات المخصصة تلقائيًا في التقارير؟'),answer:text('Sending a parameter is separate from making it available in reports. You may need a GA4 custom dimension or metric with the correct scope. Verify the payload in DebugView before configuring reporting.', 'إرسال المعامل يختلف عن إتاحته في التقارير. قد تحتاج إلى بُعد أو مقياس مخصص في GA4 بنطاق مناسب. تحقق من البيانات في DebugView قبل إعداد التقارير.')},
    ],
    sources:[{url:'https://developers.google.com/tag-platform/tag-manager/datalayer',label:text('Google Tag Manager data layer documentation', 'توثيق طبقة البيانات في Google Tag Manager')},{url:'https://support.google.com/analytics/answer/13316687',label:text('GA4 event naming rules', 'قواعد تسمية أحداث GA4')}],
  },
  'automation-savings': {
    steps: [
      text('Count monthly runs and measure the current manual time per run. Use a typical month rather than your busiest day.', 'احسب عدد العمليات الشهرية وقِس وقت العمل اليدوي لكل عملية. استخدم شهرًا معتادًا بدل تعميم أكثر أيامك ازدحامًا.'),
      text('Estimate the human time remaining after automation, including review and exceptions. Enter a consistent hourly cost or capacity value.', 'قدّر الوقت البشري المتبقي بعد الأتمتة، بما يشمل المراجعة والاستثناءات. أدخل تكلفة أو قيمة متسقة لساعة العمل.'),
      text('Add monthly subscriptions, usage and maintenance costs. Include setup and training in the one-time cost, then compare conservative and optimistic scenarios.', 'أضف الاشتراكات والاستخدام والصيانة إلى التشغيل الشهري. واحتسب الإعداد والتدريب ضمن التكلفة الأولية، ثم قارن سيناريو متحفظًا بآخر متفائل.'),
    ],
    interpretation: text('The example recovers 26.67 hours a month, valued at 2,000. After 100 in monthly running costs, modeled benefit is 1,900 and a 3,000 setup pays back in about 1.58 months. This is an estimate based on the value assigned to time. Cash payback only follows if that capacity reduces actual spending or generates additional contribution.', 'يوفّر المثال ٢٦٫٦٧ ساعة شهريًا بقيمة مقدرة تبلغ ٢٬٠٠٠. بعد خصم ١٠٠ للتشغيل، تصبح المنفعة المقدرة ١٬٩٠٠ وتُسترد تكلفة إعداد قدرها ٣٬٠٠٠ خلال نحو ١٫٥٨ شهر. يعتمد ذلك على القيمة المحددة للوقت. أما الاسترداد النقدي فيتطلب أن يؤدي الوقت المستعاد إلى خفض إنفاق فعلي أو تحقيق عائد إضافي.'),
    mistakes: [
      text('Do not assume every automated run succeeds without human work. Include monitoring, retries, failed extractions and approval time.', 'لا تفترض نجاح كل عملية آلية دون تدخل. احتسب المتابعة وإعادة المحاولة وأخطاء استخراج البيانات ووقت الاعتماد.'),
      text('Do not describe saved salary cost as cash savings unless staffing expense actually falls. Re-run the estimate if monthly volume changes.', 'لا تصف قيمة وقت الموظفين بأنها توفير نقدي إلا إذا انخفضت المصروفات فعلًا. أعد التقدير عند تغير عدد العمليات الشهرية.'),
    ],
    questions: [
      {question:text('What hourly value should I use?', 'ما قيمة الساعة التي أدخلها؟'),answer:text('Use an hourly employment cost for a cost-based estimate, or a clearly justified value for recovered capacity. Keep that choice visible when sharing the result; the two approaches answer different questions.', 'استخدم تكلفة ساعة الموظف لتقدير يعتمد على التكاليف، أو قيمة مبررة للقدرة التشغيلية المستعادة. وضّح اختيارك عند مشاركة النتيجة؛ فالطريقتان تجيبان عن سؤالين مختلفين.')},
      {question:text('Why is payback unavailable?', 'لماذا لا تظهر فترة استرداد؟'),answer:text('Payback requires a positive monthly benefit. If ongoing cost exceeds the value of time saved, the model has no payback period. Review the workflow or its assumptions rather than treating the missing result as zero months.', 'يتطلب الاسترداد منفعة شهرية موجبة. إذا تجاوز التشغيل قيمة الوقت الموفّر، فلا توجد فترة استرداد في هذا النموذج. راجع الإجراء أو افتراضاته، ولا تعتبر غياب النتيجة استردادًا خلال صفر شهر.')},
    ],
  },
  'webhook-inspector': {
    steps: [
      text('Paste a sanitized sample JSON body from your integration. Remove credentials and personal data before using test payloads.', 'الصق نموذج JSON من التكامل بعد تنقيحه. احذف بيانات الدخول والبيانات الشخصية من نماذج الاختبار.'),
      text('Inspect the formatted JSON and the table of field paths, types and values. For the sample invoice, amount is a number and paid is a boolean.', 'راجع JSON المنسق وجدول مسارات الحقول وأنواعها وقيمها. في نموذج الفاتورة، amount رقم وpaid قيمة منطقية.'),
      text('Use the field structure to plan mapping in n8n or your API code. Adapt the descriptive paths to your integration platform’s expression syntax.', 'استخدم بنية الحقول لتخطيط الربط في n8n أو كود API. حوّل المسارات الوصفية إلى صيغة التعبيرات التي تدعمها منصة التكامل.'),
    ],
    interpretation: text('A valid result confirms that the pasted text can be parsed as JSON, not that the webhook is authentic or complete. A number, a quoted numeric string and null are different types and may require different handling downstream. The field paths describe locations in the sample; they are not ready-to-run n8n expressions.', 'تؤكد النتيجة الصحيحة قابلية تحليل النص بوصفه JSON، ولا تثبت صحة مصدر Webhook أو اكتمال بياناته. الرقم والرقم المحاط بعلامات اقتباس وnull أنواع مختلفة وقد تتطلب معالجة مختلفة. تصف المسارات مواقع الحقول في النموذج، وليست تعبيرات n8n جاهزة للتنفيذ.'),
    mistakes: [
      text('JSON requires double quotes around keys and strings. Remove trailing commas and comments. Copy the JSON body rather than the entire HTTP request.', 'يتطلب JSON علامات اقتباس مزدوجة للمفاتيح والنصوص. احذف الفواصل الأخيرة والتعليقات. انسخ جسم JSON بدل طلب HTTP كامل.'),
      text('Keep long numeric identifiers as strings to avoid precision loss. Validate required fields and webhook signatures separately in your application.', 'احتفظ بالمعرّفات الرقمية الطويلة كنصوص لتجنب فقدان الدقة. تحقق بشكل مستقل في تطبيقك من الحقول المطلوبة وتوقيع Webhook.'),
    ],
    questions: [
      {question:text('Can this tool receive a live webhook?', 'هل تستقبل الأداة Webhook مباشرًا؟'),answer:text('No. It inspects a JSON sample locally and provides no public receiving URL. Use a separate endpoint to inspect delivery, headers, status codes, signatures or retries.', 'لا. تفحص الأداة نموذج JSON محليًا ولا توفر رابط استقبال عامًا. تحتاج إلى نقطة استقبال منفصلة لفحص التسليم والترويسات ورموز الحالة والتوقيعات وإعادة المحاولة.')},
      {question:text('Does valid JSON mean my integration will work?', 'هل يعني JSON الصحيح أن التكامل سيعمل؟'),answer:text('No. A valid payload may still lack a required field or use an unexpected type. This tool checks JSON syntax and exposes structure; it does not enforce your API schema or business rules.', 'لا. قد تفتقد البيانات الصحيحة حقلًا مطلوبًا أو تستخدم نوعًا غير متوقع. تتحقق الأداة من صيغة JSON وتوضح بنيته، لكنها لا تطبق مخطط API أو قواعد عملك.')},
    ],
    sources:[{url:'https://www.rfc-editor.org/rfc/rfc8259',label:text('JSON format specification (RFC 8259)', 'مواصفة صيغة JSON ‏(RFC 8259)')}],
  },
  'saas-unit-economics': {
    steps: [
      text('Enter sales and marketing costs and new paying customers from the same acquisition period. Include the acquisition expenses relevant to your model.', 'أدخل تكاليف المبيعات والتسويق والعملاء الجدد الدافعين من فترة الاكتساب نفسها. ضمّن مصاريف الاكتساب المرتبطة بنموذجك.'),
      text('Enter monthly revenue per customer and gross margin after the direct costs of delivering the subscription.', 'أدخل الإيراد الشهري لكل عميل وهامش الربح الإجمالي بعد التكاليف المباشرة لتقديم الاشتراك.'),
      text('Enter monthly customer churn, not annual churn or revenue churn. Compare the estimates with actual retention cohorts and cash available to fund acquisition.', 'أدخل معدل فقد العملاء الشهري، وليس السنوي أو فقد الإيرادات. قارن التقديرات باحتفاظ مجموعات العملاء الفعلية والسيولة المتاحة لتمويل الاكتساب.'),
    ],
    interpretation: text('CAC is the cost to acquire one new paying customer. LTV estimates the gross profit generated over a customer lifetime under stable churn. The sample gives CAC of 200, LTV of 1,600 and an 8× LTV:CAC ratio. Payback of 2.5 months means recovering CAC through modeled monthly gross profit; it does not include all company expenses or guarantee cash collection on that schedule.', 'CAC هي تكلفة اكتساب عميل جديد دافع. وتقدّر LTV الربح الإجمالي طوال علاقة العميل بافتراض ثبات معدل الفقد. يعطي المثال CAC بقيمة ٢٠٠ وLTV بقيمة ١٬٦٠٠ ونسبة قدرها ٨ أضعاف. وتعني فترة الاسترداد البالغة ٢٫٥ شهر تغطية تكلفة الاكتساب من الربح الإجمالي الشهري المقدر؛ ولا تشمل كل مصاريف الشركة أو تضمن التحصيل النقدي في الموعد نفسه.'),
    mistakes: [
      text('Do not divide monthly gross profit by annual churn. A short observation period or a small customer base can make lifetime-value estimates unstable.', 'لا تقسم الربح الإجمالي الشهري على معدل الفقد السنوي. قد تجعل فترة الرصد القصيرة أو قاعدة العملاء الصغيرة تقدير قيمة العميل غير مستقر.'),
      text('Do not treat an attractive ratio as proof that scaling is safe. Check retention by cohort, acquisition mix, support costs and the time between paying for acquisition and collecting revenue.', 'لا تعتبر النسبة المرتفعة دليلًا كافيًا على جدوى التوسع. راجع احتفاظ مجموعات العملاء ومصادر الاكتساب وتكاليف الدعم والمدة بين دفع تكلفة الاكتساب وتحصيل الإيراد.'),
    ],
    questions: [
      {question:text('How do I calculate monthly customer churn?', 'كيف أحسب معدل فقد العملاء الشهري؟'),answer:text('Divide customers lost during the month by customers active at the start of that month, then multiply by 100. Keep definitions consistent and distinguish cancellations from failed payments and temporary pauses.', 'اقسم عدد العملاء المفقودين خلال الشهر على عدد العملاء النشطين في بدايته، ثم اضرب في ١٠٠. وحّد التعريفات وميّز الإلغاء من تعثر الدفع أو الإيقاف المؤقت.')},
      {question:text('Why is LTV unavailable when churn is zero?', 'لماذا لا تُحسب LTV عندما يكون معدل الفقد صفرًا؟'),answer:text('The formula divides by monthly churn. No observed churn does not establish an infinite customer lifetime; it may mean you have too little history. Use longer observation periods and actual cohort revenue to assess retention.', 'تقسم المعادلة على معدل الفقد الشهري. عدم رصد فقد لا يثبت استمرار العميل إلى الأبد؛ وقد يعني أن سجل البيانات قصير. استخدم فترات أطول وإيرادات مجموعات العملاء الفعلية لتقييم الاحتفاظ.')},
    ],
  },
};
