import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/Auth.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register({
                name,
                email,
                password
            });

            alert("Registration Successful!");

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="auth-page">
            <h1>Register</h1>

            <form onSubmit={handleRegister} className="auth-form">

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit" className="auth-button">
                    Register
                </button>

            </form>

            <p className="auth-link">
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
}

export default Register;