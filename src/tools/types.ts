export type Lang = 'en' | 'ar';
export type Text = Record<Lang, string>;
export const text = (en: string, ar: string): Text => ({en, ar});
export interface Field {
  name: string;
  label: Text;
  type: 'number' | 'text' | 'url' | 'textarea' | 'select';
  value: string;
  hint?: Text;
  min?: number;
  max?: number;
  step?: string;
  maxLength?: number;
  required?: boolean;
  options?: {value: string; label: Text}[];
}
export interface Result {
  metrics?: {label: Text; value: string}[];
  code?: string;
  note?: Text;
  rows?: {path: string; type: string; value: string}[];
}
export interface Tool {
  slug: string;
  category: 'marketing' | 'development' | 'business';
  title: Text;
  description: Text;
  intro: Text;
  fields: Field[];
  method: Text;
  example: Text;
  limitations: Text;
  relatedProject?: string;
  evaluate: (values: Record<string, string>, lang: Lang) => Result;
}
export class ToolError extends Error {
  readonly copy: Text;
  constructor(copy: Text) { super(copy.en); this.copy=copy; }
}
