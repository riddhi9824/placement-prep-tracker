import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddApplication() {
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/applications",
                {
                    company,
                    role,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Application Added Successfully!");

            navigate("/applications");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add application"
            );
        }
    };

    return (
        <div>
            <Navbar />
            
            <h1>Add Application</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Job Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <br /><br />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="OA">Online Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <br /><br />

                <button type="submit">
                    Add Application
                </button>

            </form>
        </div>
    );
}

export default AddApplication;