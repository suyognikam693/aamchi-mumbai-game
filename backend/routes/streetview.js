import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import getNextRound from "../services/mapillary.js";
import redis from "../services/redis.js";
import { haversine } from "../utils/haversine.js";

const router = express.Router();

router.get('/next', requireAuth, async (req, res) => {
    const round = await getNextRound(req.user.id);
    if (!round) return res.status(404).json({ error: "No location found" });

    // Save coordinates array directly to Redis
    await redis.hSet(`image:${round.imageId}`, 'coords', JSON.stringify(round.coords));

    // Mapillary stores coordinates as [lng, lat]
    const [lng, lat] = round.coords;

    // Return properties explicitly so the UI's `Number(post.lat)` checks don't crash
    res.json({
        imageId: round.imageId,
        image_id: round.imageId, // Matches front-end dynamic canvas hook
        lat: lat,
        lng: lng
    });
});

router.post('/guess', requireAuth, async (req, res) => {
    const { imageId, guessLat, guessLng } = req.body;
    
    const realCoords = await redis.hGet(`image:${imageId}`, 'coords');
    if (!realCoords) return res.status(404).json({ error: "Location metadata missing" });

    const [realLng, realLat] = JSON.parse(realCoords);

    const distanceKm = haversine(guessLat, guessLng, realLat, realLng);
    const score = Math.max(0, Math.round(5000 * Math.exp(-distanceKm / 50)));

    res.json({ distanceKm, score });
});

export default router;