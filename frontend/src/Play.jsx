import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';
import { Camera,ArrowLeft } from 'lucide-react';


function Play() {
  const navigate = useNavigate();

  return (
    <>    
      <ArrowLeft onClick={() => navigate("/")} className="back-btn" size={24}/>
      <div className="mode-container">
        <div className="gamecard">
          <h2>StreetView</h2>
          <img src="sealink.jpg" alt="streetview" />
          <button onClick={() => navigate("/street-view")} >Streetview</button>
        </div>
        <div className="gamecard">
          <h2>Community Mode</h2>
          <img src="new.jpg" alt="streetview" />
          <button onClick={() => navigate("/community-mode")} >Community Mode</button>
        </div>
      </div>

    </>
  )
}

export default Play
