# 🚀 Deployment Guide

This guide will help you deploy the Bilingual Text Checker to get a public URL that you can access from anywhere.

## Recommended: Deploy to Railway (Easiest & Free)

Railway is the easiest option with a generous free tier.

### Step-by-Step Instructions:

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account (easiest option)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account if not already connected
   - Select the `claude` repository (or whatever you named it)

3. **Add Environment Variable**
   - Once deployed, click on your service
   - Go to "Variables" tab
   - Click "Add Variable"
   - Add: `ANTHROPIC_API_KEY` = `your-api-key-here`
   - Click "Add"

4. **Deploy**
   - Railway will automatically build and deploy
   - Wait 2-3 minutes for deployment
   - Click "Generate Domain" to get your public URL
   - Your app will be available at: `https://your-app-name.up.railway.app`

5. **Done!**
   - Visit your URL and start using the text checker
   - Share the URL with anyone who needs it

---

## Alternative: Deploy to Render

Render is another excellent free option.

### Step-by-Step Instructions:

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the `claude` repository

3. **Configure Service**
   - Name: `bilingual-text-checker`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

4. **Add Environment Variable**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable"
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
   - Click "Add"

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - Your app will be available at: `https://your-app-name.onrender.com`

6. **Done!**
   - Visit your URL and start checking text

---

## Alternative: Deploy to Vercel

Vercel is great but requires a slight modification for the API routes.

### Step-by-Step Instructions:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add Environment Variable**
   - Go to [vercel.com](https://vercel.com)
   - Select your project
   - Go to Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your key
   - Redeploy: `vercel --prod`

5. **Done!**
   - Your app will be at: `https://your-app-name.vercel.app`

---

## Troubleshooting

### "Cannot find module '@anthropic-ai/sdk'"
- Make sure `package.json` includes all dependencies
- Railway/Render should install automatically

### "Server Error 500"
- Check that `ANTHROPIC_API_KEY` environment variable is set correctly
- Check deployment logs for errors

### "Application Error"
- Check that the start command is `npm start`
- Verify PORT environment variable is being used (Railway/Render set this automatically)

---

## Cost Information

### Railway Free Tier
- $5 worth of resources per month
- Usually enough for personal use (hundreds of checks per day)
- No credit card required initially

### Render Free Tier
- 750 hours/month (more than enough)
- App may sleep after inactivity (takes 30s to wake up)
- 100% free forever

### Vercel Free Tier
- 100GB bandwidth/month
- Perfect for personal use
- 100% free for hobby projects

---

## After Deployment

Once deployed, you'll have a public URL like:
- `https://your-app.up.railway.app`
- `https://your-app.onrender.com`
- `https://your-app.vercel.app`

You can:
- ✅ Access it from any device
- ✅ Share it with others
- ✅ Bookmark it in your browser
- ✅ Use it as an API endpoint
- ✅ Integrate it with other tools

---

## Using as API

You can also use your deployed app as an API:

```bash
curl -X POST https://your-app.up.railway.app/api/check-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here", "language": "english"}'
```

This allows you to integrate the text checker into other applications!
