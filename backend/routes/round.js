import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import getNextRound from "../services/mapillary.js";
import redis from "../services/redis.js";
import { haversine } from "../utils/haversine.js";

const router = express.Router();

router.get('/next',requireAuth,async(req,res) =>{
    const round = await getNextRound(req.user.id);
    if(!round) return res.status(404).json({error:"No location found"});
    await redis.hSet(`image:${round.imageId}`,'coords',JSON.stringify(round.coords));
    res.json({imageId:round.imageId});
});

router.post('/guess',requireAuth,async(req,res) =>{
    const {imageId,guessLat,guessLng} = req.body;
    const realCoords = await redis.hGet(`image:${imageId}`,'coords');
    const [realLng,realLat] = JSON.parse(realCoords);

    const distanceKm = haversine(guessLat,guessLng,realLat,realLng);
    const score = Math.max(0,Math.round(5000*Math.exp(-distanceKm/50)));

    res.json({distanceKm,score});
})

export default router;