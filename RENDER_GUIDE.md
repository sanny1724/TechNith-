# Render Backend Deployment Guide

Since you have already deployed the frontend to Netlify, here is how to deploy your backend to Render.

## Step 1: Create a Render Account
1. Go to [https://render.com](https://render.com) and sign up (you can use your GitHub account).

## Step 2: Create a New Web Service
1. On the Render Dashboard, click the **"New +"** button and select **"Web Service"**.
2. Connect your GitHub repository (`TechNith-`).
3. You will be asked to configure the service. Use the exact settings below:

## Step 3: Service Configuration
fill in these fields:

- **Name**: `technith-backend` (or any name you like)
- **Region**: Choose the one closest to you (e.g., Singapore or Frankfurt).
- **Branch**: `main`
- **Root Directory**: `server`  <-- **CRITICAL STEP**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

## Step 4: Environment Variables
Scroll down to the **Environment Variables** section. You need to verify and add these secrets.
*Click "Add Environment Variable" for each one.*

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB connection string (from Atlas) |
| `JWT_SECRET` | A secret password (e.g., `my-super-secret-key-123`) |
| `CLIENT_URL` | Your Netlify URL (e.g., `https://your-site.netlify.app`) |
| `EMAIL_USER` | Your email address (for sending mails) |
| `EMAIL_PASS` | Your email app password |
| `RAZORPAY_KEY_ID` | Your Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Secret |
| `GOOGLE_CLIENT_ID` | Your Google Client ID |
| `PORT` | `10000` (Render sets this automatically, but good to know) |

## Step 5: Deploy
1. Click **"Create Web Service"**.
2. Wait for the logs to finish. It should say "Build successful" and "Server running on port...".
3. Copy the URL Render gives you (e.g., `https://technith-backend.onrender.com`).

## Step 6: Connect Frontend to Backend
1. Go to your **Netlify Dashboard**.
2. Go to **Site Configuration** > **Environment Variables**.
3. Add/Update the variable `VITE_API_URL`.
4. Set the value to your **Render Backend URL** (e.g., `https://technith-backend.onrender.com`).
   *Note: If your code expects `/api` at the end, add it: `https://technith-backend.onrender.com/api`*
5. Trigger a **new deployment** on Netlify (or just push a small change to GitHub to trigger it).

## Step 7: Update Backend Allow List
1. Go back to **Render Dashboard** -> **Environment Variables**.
2. Update `CLIENT_URL` to be your **exact** Netlify URL (no trailing slash).
3. Render will auto-redeploy.

Done!
