import { useNavigate } from "react-router-dom";
function Signup(){
    const navigate = useNavigate();
    return(
        <div className="auth-page">
            <div className="right">
                <div className="auth-container">
                    <h1 className="logo">Aamchi Mumbai</h1>
                    <div className="auth-card">
                        <h2>Sign Up</h2>
                        <label>Username</label>
                        <input type="text" placeholder="Choose a username"
                        />
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email"
                        />
                        <label>Password</label>
                        <input type="password" placeholder="Create a Password"
                        />
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password"
                        />
                        <button>Create Account</button>
                        <p className="swtich">Already have an account?{" "}
                            <button onClick={() => navigate("/login")} >Login</button>
                        </p>
                        <button onClick={() => navigate("/")} >Back to home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;