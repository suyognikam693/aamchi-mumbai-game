import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function CommunityMode(){
    const navigate = useNavigate();
    const [index,setIndex] = useState(0);
    const [post,setPost] = useState(null);

    const loadPost = async (i) => {
        const res = await axios.get(
            `http://192.168.29.91:3000/community-mode/${i}`
        );

        setPost(res.data);
    };

    useEffect(()=>{
        loadPost(index);
    },[index]);

    if(!post) return <h1>Loading ... </h1>;

    if(post.finished) return <h1>No more post</h1>;

    return (
        <div>
            <img src={`http://localhost:3000/uploads/${post.image}`}
            alt="" 
            height = "500" 
            />

            <h3>Latitude : {post.lat}</h3>
            <h3>Longitude : {post.long}</h3>

            <button
                onClick={() => setIndex(index+1)}
            >
                Next
            </button>
            <button onClick={() => navigate("/")} >Back to home</button>
        </div>
    );
}

export default CommunityMode;