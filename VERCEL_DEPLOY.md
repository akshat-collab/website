# Vercel Deployment Guide

## Quick Deploy

1. **Connect your repo** to Vercel (GitHub, GitLab, or Bitbucket)
2. Vercel will auto-detect the Vite project
3. Deploy — no extra config needed

## Environment Variables

Add these in **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable      | Description                    | Required |
|---------------|--------------------------------|----------|
| `GROQ_API_KEY`| Groq API key for Nova chatbot  | Optional (chat uses knowledge base fallback without it) |

## Project Structure

- **Build output**: `dist/` (Vite default)
- **API route**: `api/chat.js` — Nova chatbot backend
- **SPA routing**: All non-API routes serve `index.html` for client-side routing

## Chat API

The ChatBot uses `/api/chat`. On Vercel this is served by `api/chat.js`. The same `/api/chat` path works on Netlify via redirect to the Netlify function.

## Deploy via CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to link and deploy.
