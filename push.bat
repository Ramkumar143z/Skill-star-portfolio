@echo off
echo Initializing git...
git init

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit"

echo Setting branch to main...
git branch -M main

echo Configuring remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Ramkumar143z/Skill-star-portfolio.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause
