import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import App from "./App"
import CreatePost from "./CreatePost";
import CommunityMode from './CommunityMode'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<App/>}/>
      <Route path = "/create-post" element={<CreatePost/>}/>
      <Route path = "/community-mode" element={<CommunityMode/>}/>
    </Routes>
  </BrowserRouter>
)
