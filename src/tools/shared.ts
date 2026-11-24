import {text, ToolError, type Lang} from './types.ts';
export function number(values: Record<string, string>, name: string, max = Infinity): number {
  const raw = values[name];
  const value = Number(raw);
  if (raw === undefined || raw.trim() === '' || !Number.isFinite(value) || value < 0 || value > max) {
    throw new ToolError(text('Enter valid non-negative numbers within the stated limits.', 'أدخل أرقامًا صحيحة غير سالبة ضمن الحدود الموضحة.'));
  }
  return value;
}
export function positive(value: number): number {
  if (value <= 0) throw new ToolError(text('The divisor must be greater than zero.', 'يجب أن تكون قيمة المقسوم عليه أكبر من صفر.'));
  return value;
}
export function format(value: number, lang: Lang, suffix = ''): string {
  if (!Number.isFinite(value)) throw new ToolError(text('These inputs exceed the supported range. Use smaller values.', 'القيم تتجاوز النطاق المدعوم. استخدم قيمًا أصغر.'));
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en', {maximumFractionDigits: 2}).format(value) + suffix;
}
export const unavailable = (lang: Lang) => lang === 'ar' ? 'غير متاح' : 'Not available';
