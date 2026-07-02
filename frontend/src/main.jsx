import React from 'react'
import ReactDOM from "react-dom/client"
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import App from './App'
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
      
    </BrowserRouter>
  </GoogleOAuthProvider>
  
)
