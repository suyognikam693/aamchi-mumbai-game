import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

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

    const correctPos = post
        ? [Number(post.lat), Number(post.lng)]
        : null;

    return (
        <>
            {guessPos && <Marker position={guessPos} />}

            {result && correctPos && (
                <>
                    <Marker
                        position={correctPos}
                        icon={greenIcon}
                    />

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

export default function CommunityMode() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [post, setPost] = useState(null);
    const [guess, setGuess] = useState(null);
    const [result, setResult] = useState(null);

    const loadPost = async (i) => {
        setPost(null);
        setGuess(null);
        setResult(null);

        const res = await axios.get(
            `http://192.168.29.91:3000/api/community/post/${i}`
        );

        setPost(res.data);
    };

    useEffect(() => {
        loadPost(index);
    }, [index]);

    const submitGuess = () => {
        if (!guess || !post) return;

        const dist = haversine(
            guess.lat,
            guess.lng,
            Number(post.lat),
            Number(post.lng)
        );

        const score = Math.max(
            0,
            Math.round(5000 * Math.exp(-dist / 50))
        );

        setResult({ dist, score });
    };

    if (!post)
        return (
            <h1 className="community-loading">
                Loading...
            </h1>
        );

    if (post.finished)
        return (
            <>
                <h1 className="community-loading">
                    No more posts
                </h1>
                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back
                </button>
            </>
            
        );

    return (
        <div className="community-wrapper">
            <img
                src={post.image_url}
                alt=""
                className="community-image"
            />

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                ← Back
            </button>

            <div
                className={`minimap-wrapper ${
                    result ? "fullscreen-map" : ""
                }`}
            >
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
                            {result.score} / 5000 <span> {result.dist.toFixed(2)} km away</span>
                        </h2>
                        <button
                            className="next-btn"
                            onClick={() =>
                                setIndex((i) => i + 1)
                            }
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}