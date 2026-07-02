import { useNavigate } from 'react-router-dom'
import { Viewer } from "mapillary-js";
import { useEffect } from 'react';
import "mapillary-js/dist/mapillary.css";
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



function Streetview() {
  const navigate = useNavigate();
  useEffect(()=>{
    const viewer = new Viewer({
    accessToken: import.meta.env.VITE_MAPILLARY_TOKEN,
    container:"map",
    imageId: "1036101742280980",
  });
  return () => viewer.remove();
  },[]);

  

  return (
    <>
    
      <div id="map" style={{width:"100%",height:"100vh"}}>
        <button
          className="back-btn"
          onClick={() => navigate("/")}
          >
          ← Back
          </button>
          
      </div>
    </>
  )
}

export default Streetview
