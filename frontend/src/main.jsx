import React from 'react'
import ReactDOM from "react-dom/client"
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
    
  </BrowserRouter>
)
