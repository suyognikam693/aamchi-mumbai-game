import axios from "axios";
import redis from "./redis.js";
const TOKEN = process.env.MAPILLARY_TOKEN;
const MUMBAI_BBOX = { minLat: 18.89, maxLat: 19.27, minLng: 72.77, maxLng: 72.99};

function randomPoint(){
    const lat = MUMBAI_BBOX.minLat + Math.random() * (MUMBAI_BBOX.maxLat - MUMBAI_BBOX.minLat);
    const lng = MUMBAI_BBOX.minLng + Math.random() * (MUMBAI_BBOX.maxLng - MUMBAI_BBOX.minLng);
    return {lat,lng};
}

async function findUnseenPano(userId) {
    for(let i = 0;i<10;i++){
        const {lat,lng} = randomPoint();
        console.log(`Attempt ${i+1}: trying lat=${lat}, lng = ${lng}`);
        let res;
        try {
            res = await axios.get('https://graph.mapillary.com/images',{
            params:{
                access_token:TOKEN,
                fields: 'id,computed_geometry,is_pano',
                bbox:`${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}`,
                limit:50,
                is_pano:true,
            },
        });
        } catch (err) {
            console.log("Mapillary error status",err.response?.status);
            console.log("Mapillary error data",err.response?.data);
            continue;
        }
        console.log("Mapillary response",JSON.stringify(res.data));

        const img = res.data?.data?.[0];
        if(!img) continue;

        const seen = await redis.sIsMember(`user:${userId}:seen`,img.id);
        if(seen) continue;

        return{
            imageId: img.id,
            coords:img.computed_geometry.coordinates,
        };
    }
    return null;
}

async function fillRoundQueue(userId){
    const queueKey = `user:${userId}:queue`;

    while((await redis.lLen(queueKey)) < 5){
        const loc = await findUnseenPano(userId);
        if(!loc) break;
        await redis.rPush(queueKey,JSON.stringify(loc));
        await redis.sAdd(`user:${userId}:seen`,loc.imageId);
    }
}

async function getNextRound(userId){
    await fillRoundQueue(userId);
    const item = await redis.lPop(`user:${userId}:queue`);
    return item ? JSON.parse(item) : null;
}

export default getNextRound;