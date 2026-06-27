import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';
import { Camera } from 'lucide-react';
import Particles from './Particles';



function App() {
  const navigate = useNavigate();

  return (
    <>
      <Particles/>
      <img src="./newlogo.png" alt="Aamchi Mumbai" className="logo" />
      <h1>Aamchi</h1>
      <h1>Mumbai</h1>
      <button onClick={() => navigate("/login")} >Login</button>
      <button onClick={() => navigate("/play")} ><h2>Play</h2></button>
      <div className="camera-btn" onClick={() => navigate("/create-post")}>
        <Camera size={28}/>
      </div>

    </>
  )
}

export default App
