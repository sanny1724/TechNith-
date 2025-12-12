import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Assuming Client ID is needed globally or managed in Login page. 
          Wrapping here allows useGoogleLogin hook elsewhere if needed, 
          but User put it in Login page. I'll stick to Login page wrapping or global here.
          Let's wrap Global for flexibility.
      */}
      <GoogleOAuthProvider clientId="550508219567-fr5dcvkgcp5j9dpik3vf77m4fianhma1.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
