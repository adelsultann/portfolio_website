// Build-time registry. Browser code loads only the active tool via import.meta.glob.
import {tool as campaign} from './campaign-profitability/index.ts';
import {tool as utm} from './utm-builder/index.ts';
import {tool as ga4} from './ga4-event-builder/index.ts';
import {tool as automation} from './automation-savings/index.ts';
import {tool as webhook} from './webhook-inspector/index.ts';
import {tool as saas} from './saas-unit-economics/index.ts';
import {text, type Tool} from './types.ts';
export const tools: Tool[] = [campaign,utm,ga4,automation,webhook,saas];
if(new Set(tools.map(t=>t.slug)).size!==tools.length)throw new Error('Tool slugs must be unique');
export const categories = {
  marketing:text('Marketing & analytics', 'التسويق والتحليلات'),
  development:text('Development & integrations', 'التطوير والتكامل'),
  business:text('Product & operations', 'المنتجات والعمليات'),
};
export const copy = {
  title:text('Useful tools', 'أدوات مفيدة'),
  heading:text('Free marketing, analytics & developer tools', 'أدوات مجانية للتسويق والتحليلات والتطوير'),
  description:text('Calculate ROAS, build UTM links and GA4 events, inspect JSON, and estimate automation savings and SaaS unit economics. Free, with no signup.', 'احسب العائد الإعلاني، وأنشئ روابط UTM وأحداث GA4، وافحص JSON، وقدّر وفورات الأتمتة وتكلفة اكتساب العملاء. أدوات مجانية دون تسجيل.'),
  intro:text('Measure campaign performance, plan an automation or prepare an integration. Choose a task below: each tool includes a working example, clear assumptions and guidance for interpreting the result.', 'قِس أداء حملاتك، أو خطط لأتمتة مهمة، أو جهّز تكاملًا تقنيًا. اختر المهمة المناسبة أدناه؛ تتضمن كل أداة مثالًا عمليًا وافتراضات واضحة وشرحًا يساعدك على تفسير النتيجة.'),
  privacy:text('Free to use. No signup. Inputs stay in this page: no upload, storage or tracking of entered values.', 'مجانية ودون تسجيل. تبقى المدخلات في الصفحة دون رفع أو تخزين أو تتبع للقيم المدخلة.'),
};
