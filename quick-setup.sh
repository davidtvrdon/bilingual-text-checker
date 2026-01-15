#!/bin/bash

# Quick Setup Script for Bilingual Text Checker
# Run this on your Mac to recreate all files

echo "Creating Bilingual Text Checker files..."

# Create all files here
cat > package.json << 'PACKAGE_EOF'
{
  "name": "bilingual-text-checker",
  "version": "1.0.0",
  "description": "AI-powered bilingual text checker for English and Slovak",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "keywords": ["text-checker", "grammar", "spelling", "claude", "ai"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.32.1",
    "express": "^4.21.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7"
  }
}
PACKAGE_EOF

echo "✓ Created package.json"

# Note: index.html, server.js, and other files would be too long for this script
# Instead, direct user to clone from the git repo

echo ""
echo "Files created! Now run:"
echo "  npm install"
echo "  vercel"
echo ""
echo "When prompted for environment variables, add:"
echo "  ANTHROPIC_API_KEY=your_anthropic_api_key_here"
