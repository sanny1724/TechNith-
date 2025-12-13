# Deployment Guide for TECHNITH

## Prerequisites
1. **GitHub Account**: Ensure your code is pushed to a GitHub repository.
2. **MongoDB Atlas**: You need a cloud-hosted database. Local MongoDB won't work.
3. **Accounts**: Sign up for [Vercel](https://vercel.com) (Frontend) and [Render](https://render.com) (Backend).

---

## Part 1: Backend Deployment (Render)

1. **Create a New Web Service**:
   - Go to your Render Dashboard.
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.

2. **Configure Settings**:
   - **Name**: `technith-api` (or similar)
   - **Root Directory**: `server` (Important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**:
   Add the following variables in the "Environment" tab:
   - `MONGO_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://...`)
   - `JWT_SECRET`: A secure random string.
   - `CLIENT_URL`: The URL of your frontend (you will get this after deploying Part 2, e.g., `https://technith.vercel.app`). For now, you can leave it blank or update it later.
   - `EMAIL_USER` / `EMAIL_PASS`: Your email credentials for notifications.
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`: Your payment keys.
   - `GOOGLE_CLIENT_ID`: Google OAuth ID.

4. **Deploy**: Click **Create Web Service**. Wait for it to go live. Copy the **Service URL** (e.g., `https://technith-api.onrender.com`).

---

## Part 2: Frontend Deployment (Vercel)

1. **Create a New Project**:
   - Go to your Vercel Dashboard.
   - Click **Add New** -> **Project**.
   - Import your GitHub repository.

2. **Configure Project**:
   - **Root Directory**: Edit and select `client`.
   - **Framework Preset**: Vite (should detect automatically).

3. **Environment Variables**:
   Add the following variable:
   - `VITE_API_URL`: Paste your Render Backend URL here (e.g., `https://technith-api.onrender.com/api`).
     *Note: Ensure you add `/api` at the end if your axios base URL logic expects it, or just the base domain. Our code appends `/api` in axios config if not present, but safer to match what your local setup does. Our update made it `VITE_API_URL || ...`. If your env var is `.../api`, it works. If it is just domain, ensure code handles it. Based on our change, if you set VITE_API_URL to `https://technith-api.onrender.com/api`, it will work perfectly.*

   - `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID.
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.

4. **Deploy**: Click **Deploy**.

---

## Part 3: Final Wiring

1. **Update Backend CORS**:
   - Once your Frontend is live (e.g., `https://technith.vercel.app`), go back to **Render Dashboard**.
   - Update the `CLIENT_URL` environment variable to this new Frontend URL.
   - Render will auto-redeploy.

2. **Update Google/Razorpay Consoles**:
   - Add your new domains (`https://technith.vercel.app`) to "Allowed Origins" in Google Cloud Console and Razorpay Dashboard.

## Troubleshooting
- **White Screen on Frontend?** Check Console (F12) for network errors. If APIs fail, check `VITE_API_URL`.
- **Backend Error?** Check Render Logs. Ensure MongoDB Access List allows access from anywhere (`0.0.0.0/0`) or Render's extensive IP list.
