import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h2 className="navbar-title">Placement Preparation Tracker</h2>

            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>

                {" | "}

                <Link to="/applications">Applications</Link>

                {" | "}

                <Link to="/add">Add Application</Link>

                {" | "}

                <Link to="/dsa">DSA Tracker</Link>

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;