import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Menu,X,Camera } from "lucide-react";
import { useState } from "react";

function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const {user,logout} = useAuth();
  const navigate = useNavigate();
  function handleLogout(){
    logout();
    navigate("/",{replace:true});
  }


  return (
    <>
      <nav className="navbar">
        <span><h2>{user?.name?.toUpperCase() || "GUEST"}</h2></span>
        <div className="desktop-nav">
          <button className="tabs" onClick={()=>navigate("/street-view")}>StreetView</button>
          <button className="tabs" onClick={()=>navigate("/community-mode")}>Community</button>
          <button className="tabs" onClick={()=>navigate("/friends")}>Friends</button>
          <button className="tabs" onClick={()=>navigate("/settings")}>Settings</button>
          {user?(
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ):(
            <button onClick={()=>navigate("/login")}>
              Login
              </button>
          )}
        </div>

        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
          {menuOpen?<X size={36}/> : <Menu size={36}/>}
        </button>
          
      </nav>
      
      {menuOpen && (
        <div className="mobile-menu">
          <span>{user.name}</span>
          <button className="tabs" onClick={()=>navigate("/street-view")}>StreetView</button>
          <button className="tabs" onClick={()=>navigate("/community-mode")}>Community</button>
          <button className="tabs" onClick={()=>navigate("/friends")}>Friends</button>
          <button className="tabs" onClick={()=>navigate("/settings")}>Settings</button>
          {user?(
            <>
              
              <button onClick={handleLogout}>Logout</button>
            </>
          ):(
            <button onClick={()=>navigate("/login")}>
              Login
              </button>
          )}
        </div>
      )}


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
            className="play-btn play-mobile"
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