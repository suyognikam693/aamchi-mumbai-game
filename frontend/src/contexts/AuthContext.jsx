import { createContext,useContext,useEffect,useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem("aamchi_mumbai_token"));
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadProfile(){
            const stored = localStorage.getItem("aamchi_mumbai_token");
            if(!stored){
                setLoading(false);
                return;
            }
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
                setToken(stored);
            } catch {
                localStorage.removeItem("aamchi_mumbai_token");
                setToken(null);
                setUser(null);
            }finally{
                setLoading(false);
            }
        }
        loadProfile();
    },[]);

    async function login(email,password){
        const res = await api.post("/auth/login",{
            email,
            password,
        });

        localStorage.setItem("aamchi_mumbai_token",res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    }

    async function googleLogin(credential) {
        const res = await api.post("/auth/google",{
            credential,
        });

        localStorage.setItem("aamchi_mumbai_token",res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    }

    async function register(name, email, password){
        const res = await api.post("/auth/register",{
            name,
            email,
            password,
        });
        localStorage.setItem("aamchi_mumbai_token",res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    }

    function logout(){
        localStorage.removeItem("aamchi_mumbai_token");
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider
            value={{user,token,loading,login,googleLogin,register,logout}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const ctx = useContext(AuthContext);

    if(!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}