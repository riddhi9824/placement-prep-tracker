import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/DSA.css";

function DSA() {
    const [topic, setTopic] = useState("");
    const [solved, setSolved] = useState(0);
    const [topics, setTopics] = useState([]);

    const fetchTopics = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/dsa",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTopics(response.data);

        } catch (error) {
            console.error("Error fetching DSA topics:", error);
        }
    };

    const updateSolved = async (id, currentSolved) => {
        const newSolved = prompt(
            "Enter new number of problems solved:",
            currentSolved
        );

        if(newSolved === null) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/dsa/${id}`,
                {
                    solved: Number(newSolved)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Problems Solved Updated Successfully!");

            fetchTopics();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update problems solved"
            );
        }
    };

    const deleteTopic = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this DSA topic?"
        );

        if(!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/dsa/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("DSA Topic Deleted Successfully!");

            fetchTopics();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete DSA topic"
            );
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/dsa/add",
                {
                    topic,
                    solved: Number(solved)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("DSA Topic Added Successfully!");

            setTopic("");
            setSolved(0);
            fetchTopics();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add DSA topic"
            );
        }
    };

    return (
        <div className="dsa-container">
            <Navbar />
            
            <h1>DSA Tracker</h1>

            <p className="dsa-description">
                Track your DSA preparation progress.
            </p>

            <form onSubmit={handleSubmit} className="dsa-form">

                <input
                    type="text"
                    placeholder="Enter DSA Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <br />
                <br />

                <input 
                    type="number"
                    placeholder="Problems Solved"
                    value={solved}
                    onChange={(e) => setSolved(e.target.value)}
                    min="0"
                />

                <br />
                <br />

                <button 
                    type="submit"
                    className="dsa-submit-button"
                >
                    Add Topic
                </button>

            </form>

            <div className="dsa-topics-section">
                <h2>My DSA Topics</h2>

                {topics.length === 0 ? (
                    <p>No DSA topics found.</p>
                ) :(
                    <div className="dsa-topic-list">
                        {topics.map((item) => (
                            <div key={item._id} className="dsa-topic-card">
                                <h3>{item.topic}</h3>

                                <p>
                                    Problems Solved: {item.solved}
                                </p>

                                <button 
                                    className="dsa-update-button"
                                    onClick={() => updateSolved(item._id, item.solved)}
                                >
                                    Update
                                </button>

                                <button 
                                    className="dsa-delete-button"
                                    onClick={() => deleteTopic(item._id)}
                                >
                                    Delete
                                </button>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DSA;