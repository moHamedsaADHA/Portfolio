# Portfolio

Development
-----------

- Start dev server: `npm run dev`

Pushing changes to GitHub (helper)
---------------------------------

There is a small helper PowerShell script to stage, commit and push changes to a new branch.

Usage (PowerShell, from repo root):

```powershell
.\scripts\push_changes.ps1
```

The script will:
- Add `.env` to `.gitignore` (if missing) and remove it from the index if tracked
- Create a branch `feature/contact-email` (or use the `-BranchName` parameter)
- Commit staged changes and push to `origin`

Note: you will be prompted for Git credentials by `git` when pushing. Do not commit secrets.

Local contact server
--------------------

If you want to test form delivery locally, there is a small Express server in `server/` that can send email using SMTP or Nodemailer's Ethereal test account (preview URL).

Start it from the `server` folder:

```powershell
cd server
npm install
node index.js
```

If you want the frontend to use this server as fallback, set in the frontend `.env`:

```
VITE_CONTACT_SERVER_URL=http://localhost:5055
```

Then restart the dev server and test the contact form.

