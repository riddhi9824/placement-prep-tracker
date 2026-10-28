import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
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

    const totalProblemsSolved = dsaTopics.reduce(
        (total, item) => total + (Number(item.solved) || 0),
        0
    );

    const totalProblemTarget = dsaTopics.reduce(
        (total, item) => total + (Number(item.target) || 50),
        0
    );

    const overallDsaProgress = totalProblemTarget > 0
        ? Math.min(
            100,
            Math.round((totalProblemsSolved / totalProblemTarget) * 100)
        )
        : 0;


    const applicationChartData = [
        { name: "Applied", value: stats.applied },
        { name: "Online Assessment", value: stats.oa },
        { name: "Interview", value: stats.interview },
        { name: "Selected", value: stats.selected },
        { name: "Rejected", value: stats.rejected }
    ].filter((item) => item.value > 0);

    const applicationFunnelData = [
        { stage: "Applied", count: stats.applied },
        { stage: "Online Assessment", count: stats.oa },
        { stage: "Interview", count: stats.interview },
        { stage: "Selected", count: stats.selected },
        { stage: "Rejected", count: stats.rejected }
    ];

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

                <div className="overall-dsa-progress">
                    <h2>Overall DSA Preparation Progress</h2>

                    <div className="overall-dsa-summary">
                        <span>
                            Problems Solved: <strong>{totalProblemsSolved}</strong>
                        </span>

                        <span>
                            Total Target: <strong>{totalProblemTarget}</strong>
                        </span>

                        <span>
                            <strong>{overallDsaProgress}%</strong> Completed
                        </span>
                    </div>

                    <div className="overall-dsa-track">
                        <div
                            className="overall-dsa-fill"
                            style={{ width: `${overallDsaProgress}%` }}
                        />
                    </div>
                </div>

                <div className="application-chart-section">
                    <h2>Placement Application Status</h2>

                    {applicationChartData.length === 0 ? (
                        <p  className="chart-empty-message">
                            No application data available yet. Add a placement application to see your chart.
                        </p>
                    ) : (
                        <div className="application-chart">
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie
                                        data={applicationChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percent }) => 
                                            `${name} ${(percent * 100).toFixed(0)}%`    
                                        }
                                    >
                                        {applicationChartData.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={[
                                                    "#2563eb",
                                                    "#0d9488",
                                                    "#f59e0b",
                                                    "#16a34a",
                                                    "#ef4444"
                                                ][index % 5]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="application-funnel-section">
                    <h2>Application Funnel</h2>
                    <p className="funnel-description">
                        Track your applications across different placement stages.
                    </p>

                    <div className="application-funnel-chart">
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={applicationFunnelData}
                                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="stage"
                                    angle={-15}
                                    textAnchor="end"
                                    interval={0}
                                    height={70}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar
                                    dataKey="count"
                                    name="Applications"
                                    fill="#2563eb"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
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