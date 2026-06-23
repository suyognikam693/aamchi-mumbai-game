import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';

function Streetview() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Street View</h1>
      <button onClick={() => navigate("/")} >Back to home</button>

    </>
  )
}

export default Streetview
