import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Applications.css";
import StatusBadge from "../components/StatusBadge";

function Applications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setApplications(response.data);

            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/api/applications/${id}`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(
                applications.map((application) =>
                    application._id === id
                        ? response.data
                        : application
                )
            );

            alert("Status Updated Successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update status"
            );
        }
    };

    const deleteApplication = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if(!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(
                applications.filter(
                    (application) => application._id !== id
                )
            );

            alert("Application Deleted Successfully!");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete application"
            );
        }
    };

    return (
        <div  className="applications-container">
            <Navbar />

            <h1>My Applications</h1>

            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div className="application-list">
                    {applications.map((application) => (
                        <div key={application._id} className="application-card">

                            <h3>{application.company}</h3>

                            <p>Role: {application.role}</p>

                            <p>
                                Current Status: <StatusBadge status={application.status} />
                            </p>

                            <select
                                defaultValue={application.status}
                                onChange={(e) =>
                                    updateStatus(
                                        application._id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="Applied">
                                    Applied
                                </option>

                                <option value="OA">
                                    Online Assessment
                                </option>

                                <option value="Interview">
                                    Interview
                                </option>

                                <option value="Selected">
                                    Selected
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>
                            </select>

                            <br />
                            <br />

                            <button 
                                className="delete-button"
                                onClick={() =>
                                    deleteApplication(application._id)
                                }
                            >
                                Delete
                            </button>

                            <hr />

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Applications;