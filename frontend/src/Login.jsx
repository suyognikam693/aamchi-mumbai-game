import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    return (
        <div className="auth-page"> Nothing for now
            <div className="right">
                <div className="auth-container">
                    <h1 className="logo">Aamchi Mumbai</h1>
                    <div className="auth-card">
                        <h2>Login</h2>
                        <label>Username</label>
                        <input type="text" placeholder="Enter your username"
                        />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your Password"
                        />
                        <button>Login</button>
                        <p className="swtich">Dont have an account?{" "}
                            <button onClick={() => navigate("/sign-up")} >Sign up</button>
                        </p>
                        <button onClick={() => navigate("/")} >Back to home</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;