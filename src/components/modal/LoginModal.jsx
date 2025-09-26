import React, { useState } from "react";
import axios from "axios";
import { authService } from "../../services/APIService";


const LoginModal = ({ onClose }) => {
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
        const [showNameField, setShowNameField] = useState(false);
        const [hasTriedLogin, setHasTriedLogin] = useState(false);
    

           const checkIfNewUserFromError = (errorResponse) => {
    // Check if error indicates name is required for new users
    if (errorResponse?.data?.error) {
        // Handle case where error is a string
        if (typeof errorResponse.data.error === 'string') {
            return errorResponse.data.error === "Name is required for new user registration";
        }
        // Handle case where error is an array (for future compatibility)
        if (Array.isArray(errorResponse.data.error)) {
            return errorResponse.data.error.some(err => 
                err.message === "Name is required for new user registration" ||
                (err.path && err.path.includes("name") && err.message.includes("required"))
            );
        }
    }
    // Fallback for direct message (if any)
    const message = errorResponse?.message || '';
    return message.includes("Name is required for new user registration");
};

    const checkIfExistingUserError = (errorResponse) => {
        // Check for various existing user error patterns
        if (errorResponse?.error && Array.isArray(errorResponse.error)) {
            return errorResponse.error.some(err => 
                err.message?.includes("User not found") ||
                err.message?.includes("Invalid credentials") ||
                err.message?.includes("User does not exist") ||
                err.code === "user_not_found"
            );
        }
        
        // Also check direct message patterns
        const message = errorResponse?.message || '';
        return message.includes("User not found") || 
               message.includes("Invalid credentials") ||
               message.includes("User does not exist");
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!mobile) return;

    //     setLoading(true);
    //     setError(null);

    //     try {
    //         // Send POST request to dummy API
    //         const response = await axios.post("http://192.168.0.106:3000/api/v1/auth/login", {
    //             mobile: mobile, // { "mobile": "1234567890" }
    //         });

    //         console.log("Response from API:", response.data);

    //         // Save dummy token to localStorage
    //         localStorage.setItem("token", response.data.token);

    //         // Close modal
    //         onClose();
    //     } catch (err) {
    //         console.error("Error submitting mobile:", err);
    //         setError("Failed to submit mobile number");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mobile) return;
    
        if (showNameField && !name) {
            setError("Please enter your name");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await authService.login(mobile, name || undefined);
    
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                onClose();
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            console.error("Error submitting login:", err);
            const errorResponse = err.response?.data;
    
            if (checkIfNewUserFromError(err.response) && !hasTriedLogin) {
                setShowNameField(true);
                setHasTriedLogin(true);
                setError("Please enter your name to complete registration");
            } else if (checkIfExistingUserError(errorResponse)) {
                setError("Login failed. Please check your mobile number.");
                setShowNameField(false);
                setIsNewUser(false);
            } else {
                const errorMsg = errorResponse?.error || 
                               err.message || 
                               "Failed to submit login";
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };
    
    
        // const formatMobileNumber = (value) => {
        //     // Remove all non-digits
        //     const digits = value.replace(/\D/g, '');
            
        //     // If starts with 91, keep as is
        //     if (digits.startsWith('91')) {
        //         return digits.slice(0, 12); // 91 + 10 digits = 12 total
        //     }
            
        //     // If it's 10 digits, add 91 prefix
        //     if (digits.length <= 10) {
        //         return '91' + digits;
        //     }
            
        //     // If more than 10 digits but doesn't start with 91
        //     return '91' + digits.slice(0, 10);
        // };
    
        const handleMobileChange = (e) => {
            const inputValue = e.target.value;
            // const formattedValue = formatMobileNumber(inputValue);
            // setMobile(formattedValue);
            
            // Reset states when mobile number changes
            if (hasTriedLogin) {
                setHasTriedLogin(false);
                setShowNameField(false);
                setIsNewUser(false);
                setError(null);
            }
        };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                {/* <h2 className="text-xl font-semibold mb-4 text-center">Login / Register</h2> */}

                <h2 className="text-xl font-semibold mb-4 text-center">
                    {showNameField ? "Complete Registration" : "Login"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     {showNameField && (
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            autoFocus
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength="12"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." :showNameField ? "Complete Registration" : "Submit"}
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
