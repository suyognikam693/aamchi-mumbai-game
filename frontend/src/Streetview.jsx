import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';
import { Camera,ArrowLeft } from 'lucide-react';


function Streetview() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Street View</h1>
      <ArrowLeft onClick={() => navigate("/")} className="back-btn" size={24}/>

    </>
  )
}

export default Streetview
