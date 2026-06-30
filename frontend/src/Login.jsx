import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext'
function Login(){
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const redirectTo = location.state?.from?.pathname || "/";

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email,password);
            navigate(redirectTo);
        } catch (err) {
            setError(err?.response?.data?.error || 'Login failed. Please try again.');
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="auth-page"> Nothing for now
            <div className="right">
                <div className="auth-container">
                    <h1 className="logo">Aamchi Mumbai</h1>
                    <form className="auth-card" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input type="email" placeholder="Enter Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>{loading?"logging in ..." : "Login"}</button>
                        <p className="swtich">Dont have an account?{" "}
                            <button onClick={() => navigate("/sign-up")} >Sign up</button>
                        </p>
                    </form>
                    <button onClick={() => navigate("/")} >Back to home</button>

                </div>
            </div>
        </div>

    );
}

export default Login;