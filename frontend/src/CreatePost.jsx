import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function CreatePost(){
  const navigate = useNavigate();
  const [file,setFile] = useState(null);
  

  const uploadImage = async () => {
    console.log("Upload button clicked");
    if(!file){
      alert("Please select an image");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) =>{
      console.log("Location Received");

      const formData = new FormData();
      formData.append("image",file);
      formData.append("lat",position.coords.latitude);
      formData.append("long",position.coords.longitude);


      try {
        const res = await axios.post(
          "http://192.168.29.91:3000/create-post",
          formData
        );
        console.log(res.data);
        alert("Upload Successfull");
      } catch (error) {
        console.log(error);
        alert("Upload Failed");
      }
    },
    (error) => {
      console.log("Code:",error.code);
      console.log("Message:",error.message);
      alert(`Code: ${error.code}\n${error.message}`);
      console.log("location error:",error);
      alert("Location permission denied");
    }
  
  );
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadImage}>
        Upload
      </button>
      <button onClick={() => navigate("/")} >Back to home</button>
    </>
  );
}



export default CreatePost
