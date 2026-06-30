import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Camera } from "lucide-react";

function Home() {
  const {user,logout} = useAuth();
  const navigate = useNavigate();
  function handleLogout(){
    logout();
    navigate("/",{replace:true});
  }


  return (
    <>
      <nav className="navbar">
        <h2>Home</h2>
        <h2>StreetView</h2>
        <h2>Community</h2>
        <h2>Friends</h2>
        <h2>Settings</h2>
          {user?(
            <>
              <span>{user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ):(
            <button onClick={()=>navigate("/login")}>
              Login
              </button>
          )}
      </nav>

      <hr />

      <section className="hero">

        {/* Left Side */}
        <div className="hero-left">
          <h1>
            Aamchi
            <br />
            Mumbai
          </h1>

          <p>Every street has a story</p>

          <button
            className="play-btn"
            onClick={() => navigate("/play")}
          >
            Play Now
          </button>
        </div>

        {/* Right Side */}
        <div className="hero-right">

          <div className="circle"></div>

          <img
            src="./badal.png"
            className="cloud cloud1"
            alt=""
          />

          <img
            src="./badal.png"
            className="cloud cloud2"
            alt=""
          />

          <img
            src="./gate.png"
            className="monument"
            alt=""
          />

        </div>

      </section>

      

      <div
        className="camera-btn"
        onClick={() => navigate("/create-post")}
      >
        <Camera size={28} />
      </div>
    </>
  );
}

export default Home;