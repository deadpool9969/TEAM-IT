import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ onClose }) => {
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mobile) return;

        setLoading(true);
        setError(null);

        try {
            // Send POST request to dummy API
            const response = await axios.post("https://dummyapi.io/submit-mobile", {
                mobile: mobile, // { "mobile": "1234567890" }
            });

            console.log("Response from API:", response.data);

            // Save dummy token to localStorage
            localStorage.setItem("token", "dummy-token");

            // Close modal
            onClose();
        } catch (err) {
            console.error("Error submitting mobile:", err);
            setError("Failed to submit mobile number");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <h2 className="text-xl font-semibold mb-4 text-center">Login / Register</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
