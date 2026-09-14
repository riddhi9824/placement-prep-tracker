import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Placement Preparation Tracker</h2>

            <div>
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