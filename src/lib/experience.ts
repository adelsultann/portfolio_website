/** Accept legacy paragraphs and CMS bullet lists without rendering Markdown as HTML. */
export function rolePoints(value: string | string[]): string[] {
  const lines = Array.isArray(value) ? value : value.split(/\r?\n/);
  return lines.map(line => line.replace(/^\s*(?:[-*•–—]\s*|\d+[.)]\s+)/u, '').trim()).filter(Boolean);
}
