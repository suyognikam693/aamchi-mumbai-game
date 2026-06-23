import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Aamchi</h1>
      <h1>Mumbai</h1>
      <button onClick={() => navigate("/play")} ><h2>Play</h2></button>
      <button onClick={() => navigate("/create-post")} >Upload Image</button>

    </>
  )
}

export default App
