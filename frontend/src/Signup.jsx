import {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';
import { GoogleLogin } from "@react-oauth/google";
import api from './services/api';

function Signup(){
    const {register} = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        if(password != confirmPassword){
            setError("Password do not match");
            return;
        }
        setLoading(true);
        try {
            await register(name,email,password);
            navigate("/");
        } catch (err) {
            setError(err?.response?.data?.error || 'Registration failed. Please try again.');
        } finally{
            setLoading(false);
        }
    }

    async function handleGoogleLogin(response) {
        try {
            const res = await axios.post(
                "/auth/google",
                {
                    credential: response.credential,
                }
            );
            localStorage.setItem("aamchi_mumbai_token",res.data.token);
            navigate(redirectTo);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="auth-page">
            <div className="right">
                <div className="auth-container">
                    <h1 className="logo">Aamchi Mumbai</h1>
                    <form className="auth-card" onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        <label>Username</label>
                        <input type="text" placeholder="Choose a username" value={name} onChange={(e) => setName(e.target.value)} required
                        />
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                        <label>Password</label>
                        <input type="password" placeholder="Create a Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                        />
                        <button type='submit' disabled={loading}>{loading?"Creating account...":"Create Account"}</button>
                        <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={()=>console.log("Login Failed")}/>
                    </form>
                    <p className="swtich">Already have an account?{" "}
                            <button onClick={() => navigate("/login")} >Login</button>
                        </p>
                    <button onClick={() => navigate("/")} >Back to home</button>

                </div>
            </div>
        </div>
    )
}

export default Signup;