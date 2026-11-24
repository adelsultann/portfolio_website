# Local development and admin panel

Run these commands in PowerShell from the project directory.

## First-time setup

Install Node.js 22.19.0 or a newer supported Node.js version. The project requires Node.js 22.12.0 or later.

```powershell
cd E:\codex_projects\portfolio_website
npm install
```

Run npm install again after pulling changes that update package.json or package-lock.json.

## Start the development website

In the first PowerShell terminal, run the following commands.

```powershell
cd E:\codex_projects\portfolio_website
npm run dev
```

Keep this terminal running. Open the website in your browser.

- English — http://127.0.0.1:4321/en/
- Arabic — http://127.0.0.1:4321/ar/

Astro prints the actual address in the terminal. If port 4321 is busy, use the port Astro prints.

## Start the admin panel

Keep the development server running and open a second PowerShell terminal.

```powershell
cd E:\codex_projects\portfolio_website
npm run cms
```

Keep both terminals running, then open http://127.0.0.1:4321/admin/.

If Astro selected a different port, use that port for the admin URL too. The CMS proxy normally runs on port 8081. Open the admin through the Astro URL above.

The development command prepares the local editor configuration. The CMS command starts the proxy that lets the editor read and save project files.

## Edit content

1. Open the admin panel.
2. Select the collection you want to edit, such as Projects, Experience, Certifications, or Profile.
3. Update the Arabic and English fields as needed.
4. Save or publish the entry using the editor action.
5. Open the relevant website page to review the result.

Local editor changes write to files in this project. Published entries appear in the website. Draft entries are excluded from the public pages.

To put local changes on the live website, commit and push them to the production branch connected to Cloudflare Pages. Cloudflare then builds and deploys the update.

## Stop the servers

Press Ctrl+C in each terminal when finished. Start both commands again whenever you need the local admin editor.

## Check a production build

```powershell
npm run check
npm run build
```

The build command generates the production admin configuration. To return to local editing after a build, stop the development server, run npm run dev again, and reload the admin page.

To preview the generated production website, run the following command and open the address it prints.

```powershell
npm run preview
```

## Troubleshooting

| Symptom | Action |
| --- | --- |
| The website does not open | Check that npm run dev is running and use the exact address printed by Astro. |
| The admin cannot connect to the local backend | Check that npm run cms is running in the second terminal. |
| The admin shows a production setup or login screen | Restart npm run dev to regenerate the local configuration, then reload the admin page. |
| A port is already in use | Check existing terminals for another running server. Use Astro's printed port or stop the duplicate server with Ctrl+C. |
| A project is missing from the website | Check that the entry is published and its required fields are complete. |

## Live admin panel

The deployed admin address is https://adelalsultan.com/admin/.

Production editing requires the DecapBridge authentication configuration in config/cms-backend.yml. When that configuration is missing, production editing is disabled. Starting npm run cms enables the local file editor on your computer.
