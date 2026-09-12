import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        oa: 0,
        interview: 0,
        selected: 0,
        rejected: 0
    });

    useEffect(() =>{
        const fetchStats = async () => {
            try{
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/applications/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setStats(response.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1>Placement Preparation Dashboard</h1>

            <div>
                <h3>Total Applications</h3>
                <p>{stats.total}</p>
            </div>

            <div>
                <h3>Applied</h3>
                <p>{stats.applied}</p>
            </div>

            <div>
                <h3>Online Assessment</h3>
                <p>{stats.oa}</p>
            </div>

            <div>
                <h3>Interview</h3>
                <p>{stats.interview}</p>
            </div>

            <div>
                <h3>Selected</h3>
                <p>{stats.selected}</p>
            </div>

            <div>
                <h3>Rejected</h3>
                <p>{stats.rejected}</p>
            </div>
        </div>
    );
}

export default Dashboard;