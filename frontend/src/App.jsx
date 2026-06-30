import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import CreatePost from "./CreatePost";
import CommunityMode from './CommunityMode'
import './index.css'
import Play from './Play'
import Streetview from './Streetview'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'



function App() {
  return (
    <>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/create-post" element={<CreatePost/>}/>
          <Route path = "/community-mode" element={<CommunityMode/>}/>
          <Route path = "/street-view" element={<Streetview/>}/>
          <Route path = "/play" element={<Play/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/sign-up" element={<Signup/>}/>
        </Routes>
        

    </>
  )
}

export default App
