import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Auth.css";

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

    try{
        const response = await login({
            email,
            password
        });

        localStorage.setItem("token", response.data.token);

        alert("Login Successful!");

        navigate("/dashboard");
    }catch(error){
        alert(error.response?.data?.message || "Login Failed");
    }
};

return(
    <div className="auth-page">
        <h1>Login</h1>

        <form onSubmit={handleLogin} className="auth-form">
            <input 
               type = "email"
               placeholder="Enter Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input 
               type = "password"
               placeholder="Enter Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button type="submit" className="auth-button">
                Login
            </button>
        </form>

        <p className="auth-link">
            Don't have an account? <a href="/register">Register</a>
        </p>
    </div>
);
}

export default Login;