import { useEffect, useState } from 'react'; // Fixed typo
import { useNavigate } from 'react-router-dom';
import { Viewer } from "mapillary-js";
import api from './services/api'; // Matches your axios instance config
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMapEvents,
} from "react-leaflet";
import "mapillary-js/dist/mapillary.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet assets asset setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function GuessMap({ onGuess, guessPos, result, post }) {
    const map = useMapEvents({
        click(e) {
            if (!result) {
                onGuess(e.latlng);
            }
        },
    });

    useEffect(() => {
        if (!result || !guessPos || !post) return;

        setTimeout(() => {
            map.invalidateSize();
            map.fitBounds(
                [
                    [guessPos.lat, guessPos.lng],
                    [Number(post.lat), Number(post.lng)],
                ],
                {
                    padding: [150, 150],
                    animate: true,
                }
            );
        }, 450);
    }, [result, guessPos, post, map]);

    const correctPos = post ? [Number(post.lat), Number(post.lng)] : null;

    return (
        <>
            {guessPos && <Marker position={guessPos} />}
            {result && correctPos && (
                <>
                    <Marker position={correctPos} icon={greenIcon} />
                    <Polyline
                        positions={[
                            [guessPos.lat, guessPos.lng],
                            correctPos,
                        ]}
                    />
                </>
            )}
        </>
    );
}

export default function Streetview() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [post, setPost] = useState(null);
    const [guess, setGuess] = useState(null);
    const [result, setResult] = useState(null);

    // 1. Fetch current live location details from your updated backend route
    const loadPost = async () => {
        setPost(null);
        setGuess(null);
        setResult(null);
        try {
            // Adjust endpoint if your router mounts differently (e.g., "/streetview/next")
            const res = await api.get("/streetview/next"); 
            setPost(res.data);
        } catch (err) {
            console.error("Error pulling streetview details:", err);
            // Fallback object to catch empty sessions gracefully
            setPost({ finished: true });
        }
    };

    useEffect(() => {
        loadPost();
    }, [index]);

    // 2. Control Mapillary life-cycle hooks dynamically using backend data
    useEffect(() => {
        if (!post || !post.image_id || post.finished) return;

        const viewer = new Viewer({
            accessToken: import.meta.env.VITE_MAPILLARY_TOKEN,
            container: "mapillary-viewer", // Changed to avoid CSS collisions with leafet ".map"
            imageId: post.image_id,
        });

        return () => viewer.remove();
    }, [post]);

    // 3. Dispatch guess coordinates to backend evaluation route
    const submitGuess = async () => {
        if (!guess || !post) return;

        try {
            const res = await api.post("/streetview/guess", {
                imageId: post.imageId,
                guessLat: guess.lat,
                guessLng: guess.lng
            });
            
            setResult({
                dist: res.data.distanceKm,
                score: res.data.score
            });
        } catch (err) {
            console.error("Failed to post guess details:", err);
        }
    };

    if (!post) {
        return <h1 className="community-loading">Loading...</h1>;
    }

    if (post.finished) {
        return (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
                <h1 className="community-loading">No more locations</h1>
                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className="community-wrapper">
            {/* Main Interactive Panaroma */}
            <div id="mapillary-viewer" style={{ width: "100%", height: "100vh" }}></div>

            <button className="back-btn" onClick={() => navigate("/")}>
                ← Back
            </button>

            {/* Minimap UI Panel Overlays */}
            <div className={`minimap-wrapper ${result ? "fullscreen-map" : ""}`}>
                <MapContainer
                    center={[19.07, 72.87]}
                    zoom={11}
                    className="minimap"
                    zoomControl={false}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <GuessMap
                        onGuess={setGuess}
                        guessPos={guess}
                        result={result}
                        post={post}
                    />
                </MapContainer>

                {!result && (
                    <button
                        className="guess-btn"
                        disabled={!guess}
                        onClick={submitGuess}
                    >
                        Submit Guess
                    </button>
                )}

                {result && (
                    <div className="result-overlay">
                        <h2>
                            {result.score} / 5000{" "}
                            <span> {result.dist.toFixed(2)} km away</span>
                        </h2>
                        <button
                            className="next-btn"
                            onClick={() => setIndex((i) => i + 1)}
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}