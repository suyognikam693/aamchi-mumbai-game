import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import App from "./App"
import CreatePost from "./CreatePost";
import CommunityMode from './CommunityMode'
import './index.css'
import Play from './Play'
import Streetview from './Streetview'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<App/>}/>
      <Route path = "/create-post" element={<CreatePost/>}/>
      <Route path = "/community-mode" element={<CommunityMode/>}/>
      <Route path = "/street-view" element={<Streetview/>}/>
      <Route path = "/play" element={<Play/>}/>
    </Routes>
  </BrowserRouter>
)
