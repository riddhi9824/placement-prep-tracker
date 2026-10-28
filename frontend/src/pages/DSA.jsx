import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/DSA.css";

function DSA() {
    const [topic, setTopic] = useState("");
    const [solved, setSolved] = useState(0);
    const [target, setTarget] = useState(50);
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

    const updateTarget = async (id, currentTarget) => {
        const newTarget = prompt(
            "Enter the new target:",
            currentTarget ?? 50
        );

        if (newTarget === null) {
            return;
        }

        const targetCount = Number(newTarget);

        if (!Number.isInteger(targetCount) || targetCount < 1) {
            alert("Target must be a positive whole number.");
            return;
        }

        const selectedTopic = topics.find((item) => item._id === id);

        if (selectedTopic && targetCount < selectedTopic.solved) {
            alert("Target cannot be less than problems already solved.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/dsa/${id}`,
                {
                    target: targetCount
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Target updated successfully!");
            fetchTopics();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update target"
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

        if(!topic.trim()) {
            alert("Please enter a DSA topic name.");
            return;
        }

        const solvedCount = Number(solved);

        if(!Number.isInteger(solvedCount) || solvedCount < 0) {
            alert("Problems solved must be a non-negative whole number.");
            return;
        }

        const targetCount = Number(target);

        if (!Number.isInteger(targetCount) || targetCount < 1) {
            alert("Target must be a positive whole number.");
            return;
        }

        if (solvedCount > targetCount) {
            alert("Problems solved cannot exceed the target.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/dsa/add",
                {
                    topic,
                    solved: solvedCount,
                    target: targetCount
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
            setTarget(50);
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

                <label>Target Problems</label>
                <input 
                    type="number"
                    min="1"
                    step="1"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    required
                />
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
                                    Problems Solved: {item.solved} / {item.target ?? 50}
                                </p>

                                <div className="dsa-progress-container">
                                    <div className="dsa-progress-track">
                                        <div
                                            className="dsa-progress-fill"
                                            style={{
                                                width: `${Math.min(
                                                    100,
                                                    Math.round(
                                                        (item.solved / (item.target ?? 50)) * 100
                                                    )
                                                )}%`
                                            }}
                                        />
                                    </div>

                                    <p className="dsa-progress-text">
                                        {Math.min(
                                            100,
                                            Math.round(
                                                (item.solved / (item.target ?? 50)) * 100
                                            )
                                        )}% completed
                                    </p>
                                </div>

                                <button 
                                    className="dsa-update-button"
                                    onClick={() => updateSolved(item._id, item.solved)}
                                >
                                    Update
                                </button>

                                <button
                                    className="dsa-target-button"
                                    onClick={() => updateTarget(item._id, item.target ?? 50)}
                                >
                                    Update Target
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