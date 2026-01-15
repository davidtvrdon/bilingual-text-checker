#!/bin/bash

# Bilingual Text Checker - GitHub Push Script
# This script will push your code to GitHub

echo "🚀 Pushing Bilingual Text Checker to GitHub..."
echo ""

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the project directory"
    exit 1
fi

# Add GitHub remote if it doesn't exist
if ! git remote | grep -q "^github$"; then
    echo "📝 Adding GitHub remote..."
    git remote add github https://github.com/davidtvrdon/bilingual-text-checker.git
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push github claude/bilingual-text-checker-8Ao0N:main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Code pushed to GitHub"
    echo "🔗 View at: https://github.com/davidtvrdon/bilingual-text-checker"
    echo ""
    echo "Next step: Deploy to Vercel"
    echo "Go to: https://vercel.com/new"
    echo "Select your repository and deploy!"
else
    echo ""
    echo "❌ Push failed. You may need to authenticate."
    echo "Try running: git push github claude/bilingual-text-checker-8Ao0N:main"
fi
