import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';
import { Camera,ArrowLeft } from 'lucide-react';
import Particles from './Particles';



function App() {
  const navigate = useNavigate();

  return (
    <>
      <Particles/>
      
      <h1 className="aamchi font-bold text-9xl drop-shadow-[4px_4px_8px_rgba(0,0,0,0.4)] center">आमची</h1>
      <h1 className="mumbai font-bold text-9xl drop-shadow-[4px_4px_8px_rgba(0,0,0,0.5)] center">Mumbai</h1>
      <br/>
      <div className="playing" >   
        <button onClick={() => navigate("/play")} className="center font-bold text-7xl" ><h2>Play</h2></button>
        <button onClick={() => navigate("/login")} className="center font-bold text-2xl">Login</button>
      </div>
      
      <div className="camera-btn" onClick={() => navigate("/create-post")}>
        <Camera size={28}/>
      </div>

    </>
  )
}

export default App
