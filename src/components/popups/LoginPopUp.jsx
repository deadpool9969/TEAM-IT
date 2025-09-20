import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithMobile } from "../../store/authSlice";

const LoginPopUp = ({ onClose }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [mobile, setMobile] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mobile) return;
        dispatch(loginWithMobile(mobile)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-80">
                <h2 className="text-lg font-bold mb-4">Login / Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded mb-4"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPopUp;
