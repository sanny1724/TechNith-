# TECHNITH - Tech YouTube Channel Website

## Project Structure
- **client/**: Frontend built with Vite + React + Tailwind CSS.
- **server/**: Backend built with Node.js + Express + MongoDB.

## Prerequisites
- Node.js installed.
- MongoDB installed and running locally (or use a cloud URI).

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies (should be done already):
   ```bash
   npm install
   ```
3. Configure `.env` file:
   - Rename `.env.example` to `.env` (or create one).
   - Update `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER` (for OTP), `GOOGLE_CLIENT_ID`.
4. Start the server:
   ```bash
   npm run dev
   # or
   node index.js
   ```

### 2. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- **User Authentication**: Login/Signup with Email & Password.
- **Google OAuth**: Login with Google (configure Client ID in code/env).
- **OTP Verification**: Passwordless login and Forgot Password.
- **Responsive Design**: Dark modern theme using Tailwind CSS.
- **Dashboard**: User profile management.

## API Endpoints (`/api/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Login with password.
- `POST /login-otp`: Send OTP for passwordless login.
- `POST /verify-otp`: Verify OTP and login.
- `POST /google`: Login with Google Token.
- `POST /forgot-password`: Send OTP for password reset.
- `POST /reset-password`: Reset password using OTP.

## Notes
- Ensure MongoDB is running.
- For Email OTP to work, configure a valid email/password in `.env` (use App Password for Gmail).
- For Google Login, create a project in Google Cloud Console and get a Client ID. Update it in `client/src/main.jsx` and `server/.env`.
