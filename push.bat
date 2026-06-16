@echo off
echo Adding new changes...
git add .

echo Committing...
git commit -m "Fix unused useState error"

echo Force pushing to GitHub to overwrite conflicts...
git push -f -u origin main

echo Done!
pause
