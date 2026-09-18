import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import "../styles/Dashboard.css";

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        oa: 0,
        interview: 0,
        selected: 0,
        rejected: 0
    });

    const [dsaTopics, setDsaTopics] = useState([]);

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
        fetchDsaTopics();
    }, []);

    const fetchDsaTopics = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/dsa",
                {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDsaTopics(response.data);

        } catch (error) {
            console.error("Error fetching DSA topics:", error);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="dashboard-container">
            
                <h1>Placement Preparation Dashboard</h1>

                <div className="stats-grid">
            
                    <StatCard
                        title="Total Applications"
                        value={stats.total}
                    />

                    <StatCard
                        title="Applied"
                        value={stats.applied}
                    />

                    <StatCard
                        title="Online Assessment"
                        value={stats.oa}
                    />

                    <StatCard
                        title="Interview"
                        value={stats.interview}
                    />

                    <StatCard
                        title="Selected"
                        value={stats.selected}
                    />

                    <StatCard
                        title="Rejected"
                        value={stats.rejected}
                    />

                    <StatCard
                        title="DSA Topics"
                        value={dsaTopics.length}
                    />

                    <StatCard
                        title="Problems Solved"
                        value={dsaTopics.reduce(
                            (total, item) => total + item.solved,
                            0
                        )}
                    />
                </div>

                <div className="recent-activity">
                    <h2>Recent Activity</h2>

                    <div className="activity-item">
                        <span>📋</span>
                        <p>Track your latest placement applications</p>
                    </div>

                    <div className="activity-item">
                        <span>🧠</span>
                        <p>Keep updating your DSA preparation progress.</p>
                    </div>

                    <div className="activity-item">
                        <span>🎯</span>
                        <p>Stay consistent with your placement preparation</p>
                    </div>
                </div>

                <div className="quick-actions">

                    <h2>Quick Actions</h2>

                    <div className="quick-action-buttons">

                        <Link 
                            to="/add" 
                            className="quick-action-button"
                        >
                            Add Application
                        </Link>

                        <Link 
                            to="/applications" 
                            className="quick-action-button"
                        >
                            View Applications
                        </Link>

                        <Link 
                            to="/dsa" 
                            className="quick-action-button"
                        >
                            DSA Tracker
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;