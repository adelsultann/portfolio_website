# Content and media decisions

## Source priority

The verified Product Engineer CV and private Master Evidence Resume override older CV dates and figures. All CV DOCX files were extracted for comparison. Verified hyperlinks were read from DOCX relationship XML.

- LaHant: March 2025–Present. Platform 10,000+ customers, approximately 100 daily orders; automated reporting estimated five or more hours weekly. Do not describe these as individually acquired customers or exact measured time savings.
- Al-Tamimi: April 2023–February 2025; approximately 10,500 customer/candidate records.
- Cavalry: March 2018–February 2023; more than SAR 800,000 revenue, not profit.
- Sofra: https://www.so-fra.com/ is verified. Its source supports features and AI import/translation, but not a product-specific Next.js/Supabase architecture, acquisition metrics or dates. Those were not inferred from the global skills list.
- Verified contact: adelalsultan647@gmail.com, https://github.com/adelsultann, https://www.linkedin.com/in/adel-alsultan-69b57119a/.
- Certification dates, IDs, expiry and verification URLs were not supplied. No current-validity badges are shown.

The four project text files were decoded as UTF-8. Their Arabic source text is preserved. `adding_GTA_with_custome_event` is a GA4/GTM analytics engagement, not a GTA game project.

## Case-study scope

All four supplied folders are represented. The supplied freelance CRM and its PDF are one case study. It is not merged with Al-Tamimi because the source does not identify the company. Its conflicting two-day/three-day claim and claimed 2.5% rate lack a clear denominator; no conversion-rate improvement is published. The report's 172 records are not called qualified leads or sales. WhatsApp tracking's 240 events remain clicks.

Social publishing is labeled Independent project because its source does not establish freelance/employment status. Invoice automation, tracking and CRM are explicitly labeled Freelance. No client names or timeframes were invented.

## Media review and derivatives

Images were visually inspected, all three CRM PDF pages rendered and inspected, and both videos reviewed using time-distributed frame contact sheets. This is not a frame-by-frame forensic review; the audio was not transcribed. Public video derivatives therefore remove audio entirely and include text workflow summaries. Originals remain untouched.

| Original asset | Public treatment |
| --- | --- |
| GA4 JPEG | WebP + responsive variants; event count retained |
| Airtable PNG | WebP + responsive variants; content planning fields retained |
| n8n PNG | WebP + responsive variants; workflow editor retained |
| Bookkeeping MP4 | Opaque left-side mask for invoice/chat/sheet data, top/browser mask, bottom/taskbar mask; audio removed; fast-start MP4 and poster |
| Social publishing MP4 | Opaque left-side/editor-history mask and full top strip; audio removed; fast-start MP4 and poster |
| CRM PDF page 1 | Public form explanation, no entered customer record |
| CRM PDF page 2 | Entire customer-table area covered by opaque pixels |
| CRM PDF page 3 | Terminal/infrastructure area covered by opaque pixels |
| CRM downloadable PDF | Reconstructed only from redacted raster pages; no original hidden text |
| Product Engineer CV PDF | Intentionally copied public tailored CV; contains supplied professional contact information |
| Master evidence resume | Never copied into public assets |

Before launch, review `public/media/invoice-workflow.mp4`, `social-workflow.mp4`, and `crm-overview-redacted.pdf` at full size. Conservative masks remove some demonstration detail. If you want more detail visible, provide sanitized demo recordings with synthetic data rather than revealing the original customer records.

Sofra and LaHant have no supplied product screenshots. Their cover images are clearly labeled product-overview graphics, not invented UI screenshots. Replace them through the editor when suitable screenshots are available.

The helper `scripts/prepare-source-media.py` reproduces initial derivatives using Pillow and FFmpeg; it is not required for normal builds or routine editing. `npm run build` creates responsive images from the selected public assets using Sharp. Original private material is not required in CI.
