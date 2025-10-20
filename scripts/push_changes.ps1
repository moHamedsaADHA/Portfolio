<#
PowerShell helper to prepare and push local changes to GitHub.
Usage: Open PowerShell at the repo root and run: `.	ools\push_changes.ps1` (or dot-source it)
This script will:
 - Check for a git repo
 - Add `.env` to .gitignore and remove it from the index (safe)
 - Create a branch named `feature/contact-email` (or a name you provide)
 - Stage all changes, commit with a default message (you can edit), and push to origin

Note: You will be prompted for credentials by git if needed. Do NOT put secrets in commits. The script will not add any remote or change remotes.
#>

param(
    [string]$BranchName = 'feature/contact-email',
    [string]$CommitMessage = 'Add EmailJS integration and local email server; wire contact form with fallback',
    [switch]$DryRun
)

function Run-Command {
    param($cmd)
    Write-Host "=> $cmd" -ForegroundColor Cyan
    if (-not $DryRun) {
        $proc = Start-Process -FilePath pwsh -ArgumentList "-NoProfile","-Command",$cmd -Wait -NoNewWindow -PassThru -ErrorAction Stop
n        if ($proc.ExitCode -ne 0) { throw "Command failed: $cmd (exit $($proc.ExitCode))" }
    }
}

# Ensure we're inside a git repo
if (-not (Test-Path .git)) {
    Write-Error "No .git directory found. Run this from the repository root."; exit 1
}

Write-Host "Preparing repo to push changes..." -ForegroundColor Green

# Ensure .env is ignored and not committed
if (-not (Select-String -Path .gitignore -Pattern '^\.env$' -SimpleMatch -Quiet -ErrorAction SilentlyContinue)) {
    Add-Content -Path .gitignore -Value "`n.env"
    Write-Host "Added .env to .gitignore"
} else {
    Write-Host ".env already in .gitignore"
}

# Remove .env from index if tracked
$envTracked = git ls-files --error-unmatch .env 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Removing .env from git index (it remains on disk)"
    git rm --cached .env
} else {
    Write-Host ".env not tracked"
}

# Create branch (if exists, checkout)
$branches = git branch --list $BranchName
if ($branches) {
    Write-Host "Branch $BranchName exists — checking out"
    git checkout $BranchName
} else {
    Write-Host "Creating branch $BranchName"
    git checkout -b $BranchName
}

# Stage all changes
git add -A

# Commit
if (git diff --staged --quiet) {
    Write-Host "No staged changes to commit"
} else {
    git commit -m "$CommitMessage"
}

# Push
Write-Host "Now pushing to origin/$BranchName. You may be prompted for credentials."

# If origin remote doesn't exist, show info
$remoteExists = git remote | Select-String -Pattern '^origin$' -Quiet
if (-not $remoteExists) {
    Write-Host "No 'origin' remote found." -ForegroundColor Yellow
    Write-Host "Set your origin remote (example):`n git remote add origin https://github.com/<user>/<repo>.git" -ForegroundColor Yellow
}

git push -u origin $BranchName

Write-Host "Done. If push succeeded, create a PR on GitHub from branch $BranchName." -ForegroundColor Green
