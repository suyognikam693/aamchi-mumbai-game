import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityMode from './CommunityMode';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Aamchi MUMBAI</h1>
      <button onClick={() => navigate("/community-mode")} >Community Mode</button>
      <button onClick={() => navigate("/create-post")} >Upload Image</button>

    </>
  )
}

export default App
