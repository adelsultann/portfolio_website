# Editing your portfolio

Open **https://adelalsultan.com/admin/** after one-time setup and sign in with your authorized account. Routine updates do not require code, Git, or a terminal.

## Add a project

Choose Projects → New project. Fill the clearly marked English and Arabic fields. Set a permanent URL name such as `invoice-automation`; do not rename it after sharing links. Select the category and engagement type, state your contribution, and describe only supported outcomes. Select a cover. All published projects appear on the homepage. Keep an entry in Draft visibility to hide it.

Lower Display order numbers appear first. The number field has increment/decrement controls. For drag ordering across projects, open Site Settings → Project ordering, add the projects, then drag them. Unlisted projects follow their Display order number.

## Upload screenshots or video

In Images and videos choose Add. Select the media type and upload the reviewed file. Add a description in both languages, optional captions, and the original pixel dimensions. A video also needs a poster image. Drag gallery entries by the small center handle to reorder. Alternatively, use Media display order for keyboard-accessible ordering: lower numbers appear first; equal numbers preserve drag order. On phones, the content preview follows the form. Maximum repository upload: 20 MiB. For a larger video use the configured Cloudinary media library. Do not upload unredacted records, invoices, phone numbers, credentials, or customer messages. Uploads become public assets when merged, even if no page currently links them.

## Edit experience

Open Experience → choose the role. Edit role, company, dates, responsibilities and skills. In Role summary — bullet points, expand English or Arabic, then add one highlight per item. Drag to reorder; the homepage adds the bullet markers automatically. Use “I currently work here” for a current role. Related projects link to case studies. Experience describes your role; Projects describes a particular delivered system.

## Add a certification

Choose Certifications → New. Enter the name in both language fields and the issuer. Dates, credential IDs, badge and verification link are optional. Leave unknown values blank. Do not imply a credential is currently valid without checking.

## Replace the CV

Open Profile & About → Public CV → choose or upload your public PDF. Save and publish the change. The private master evidence resume must never be uploaded. Update social links/contact details in the same section. A removed CV link does not automatically delete an old uploaded public file; use the media library to remove obsolete files if required, then publish and confirm the deployment.

## Preview and publish

1. Save your work as an editorial draft. It persists to a draft branch, not the production branch.
2. Use the preview panel to review English and Arabic text and media. This is a content preview; Cloudflare's branch deployment provides the full layout preview.
3. Public visibility = Draft hides a project, experience entry, or certification from the generated site. Set Published when you want it included. Visibility and editorial workflow are separate: a Published entry saved as an editorial draft is still unmerged.
4. Review and use Publish. This merges the change to the production branch and starts Cloudflare's build.
5. Wait until Cloudflare reports a successful deployment, then check the public URL. A CMS save/publish message alone does not mean the new page is live.

Deletion uses the CMS's confirmation dialog. Delete gallery items carefully; removing a gallery reference does not necessarily remove the underlying uploaded file. Repository history can restore previous content, but it is not a reason to publish private data.

Local editing at `localhost` writes local files directly and has no production publishing workflow. It is labeled separately. Use the deployed editor for normal maintenance from any device.
