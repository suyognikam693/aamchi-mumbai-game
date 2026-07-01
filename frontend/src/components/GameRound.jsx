// frontend/components/GameRound.jsx
import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'mapillary-js';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'mapillary-js/dist/mapillary.css';
import 'leaflet/dist/leaflet.css';

function GuessMap({ onGuess }) {
  const [pos, setPos] = useState(null);
  useMapEvents({
    click(e) {
      setPos(e.latlng);
      onGuess(e.latlng);
    },
  });
  return pos ? <Marker position={pos} /> : null;
}

export default function GameRound() {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [round, setRound] = useState(null);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);

  // fetch next round from backend
  useEffect(() => {
    fetch('/api/round/next')
      .then(r => r.json())
      .then(data => setRound(data)); // { imageId }
  }, []);

  // init/update mapillary viewer when round changes
  useEffect(() => {
    if (!round) return;
    if (!viewerRef.current) {
      viewerRef.current = new Viewer({
        accessToken: process.env.REACT_APP_MAPILLARY_TOKEN, // public client token only
        container: containerRef.current,
        imageId: round.imageId,
      });
    } else {
      viewerRef.current.moveTo(round.imageId);
    }
  }, [round]);

  const submitGuess = async () => {
    if (!guess || !round) return;
    const res = await fetch('/api/round/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageId: round.imageId,
        guessLat: guess.lat,
        guessLng: guess.lng,
      }),
    });
    setResult(await res.json());
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={containerRef} style={{ flex: 2 }} />
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[19.07, 72.87]} zoom={11} style={{ height: '80%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GuessMap onGuess={setGuess} />
        </MapContainer>
        <button onClick={submitGuess}>Submit Guess</button>
        {result && (
          <p>Distance: {result.distanceKm.toFixed(2)} km — Score: {result.score}</p>
        )}
      </div>
    </div>
  );
}