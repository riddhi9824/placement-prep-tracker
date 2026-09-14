import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
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
            </div>
        </nav>
    );
}

export default Navbar;