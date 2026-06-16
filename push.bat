@echo off
echo Adding new changes...
git add .

echo Committing...
git commit -m "Fix unused useState error"

echo Pulling latest changes from GitHub (merging any remote updates)...
git pull origin main --no-rebase

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
