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
          <h3>I am thinking to put something here give me some time</h3>
          <br />
          <button className='play-btn playing-btn' onClick={() => navigate("/street-view")} >Play Streetview</button>
        </div>
        <div className="gamecard">
          <h2>Community Mode</h2>
            <h3>Same lame reason here</h3>
            <br />
          <button className='play-btn playing-btn' onClick={() => navigate("/community-mode")} >Play Community Mode</button>
        </div>
      </div>

    </>
  )
}

export default Play
