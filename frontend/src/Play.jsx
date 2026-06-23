import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';

function Play() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/")} >Back to home</button>
      <h1>Play</h1>
      <button onClick={() => navigate("/street-view")} >Streetview</button>
      <button onClick={() => navigate("/community-mode")} >Community Mode</button>

    </>
  )
}

export default Play
