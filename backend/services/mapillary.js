import axios from "axios";
import redis from "./redis.js";
const TOKEN = process.env.MAPILLARY_TOKEN;
const MUMBAI_BBOX = { minLat: 18.89, maxLat: 19.27, minLng: 72.77, maxLng: 72.99};

const FALLBACK_PANOS = [
    { id: "1348323234060398", coords: [72.976990354164, 19.208719861546] },
    { id: "1727359531593431", coords: [72.98457913081, 19.21094197174] },
    { id: "1201577685393646", coords: [72.97698305168, 19.20801987271] },
    { id: "2076889589877683", coords: [72.985061769028, 19.210862950121] },
    { id: "1319568779704155", coords: [72.976983071473, 19.208019974573] },
    { id: "1484462083362467", coords: [72.976967204202, 19.208292506293] },
    { id: "1826571304986988", coords: [72.976974001456, 19.20852484364] },
    { id: "1580380203710702", coords: [72.984963985235, 19.210878501006] },
    { id: "1360070472670494", coords: [72.976973771198, 19.208156106595] },
    { id: "2356276878194576", coords: [72.984674291686, 19.210925017273] },
    { id: "1015711984533424", coords: [72.976972485991, 19.208486641621] },
    { id: "2301714527026028", coords: [72.984866602992, 19.210894259025] },
    { id: "1043242878653444", coords: [72.976974259874, 19.208539353781] },
    { id: "1733896410952138", coords: [72.976979444227, 19.208603775063] },
    { id: "1361089105945734", coords: [72.976973062072, 19.208155845706] },
    { id: "2112185679702911", coords: [72.976986514454, 19.208676089743] },
    { id: "1673223447270980", coords: [72.976967168561, 19.208311864691] },
    { id: "1705802057025766", coords: [72.976967157116, 19.208292519531] },
    { id: "994754916588192", coords: [72.97697403526, 19.208524817831] },
    { id: "1533730131464118", coords: [72.976986422543, 19.208676103194] }
];

function randomPoint(){
    const lat = MUMBAI_BBOX.minLat + Math.random() * (MUMBAI_BBOX.maxLat - MUMBAI_BBOX.minLat);
    const lng = MUMBAI_BBOX.minLng + Math.random() * (MUMBAI_BBOX.maxLng - MUMBAI_BBOX.minLng);
    return {lat,lng};
}
function getRandomFallbackPano() {
    const randomIndex = Math.floor(Math.random() * FALLBACK_PANOS.length);
    const item = FALLBACK_PANOS[randomIndex];
    return {
        imageId: item.id,
        coords: item.coords, // [lng, lat]
    };
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
    console.log("API search failed to find items. Using static array fallback...");
    return getRandomFallbackPano();
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