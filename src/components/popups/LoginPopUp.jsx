import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithMobile } from "../../store/authSlice";

const LoginPopUp = ({ onClose }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [mobile, setMobile] = useState("");
     const [name, setName] = useState("");
    const [showNameField, setShowNameField] = useState(false);
    const [hasTriedLogin, setHasTriedLogin] = useState(false);


    const checkIfNewUserFromError = (errorPayload) => {
    // Check if error indicates name is required for new users (not existing user issues)
    if (errorPayload?.error && Array.isArray(errorPayload.error)) {
        return errorPayload.error.some(err => 
            err.message === "Name is required for new users" || 
            err.message === "Name is required for new user registration" || 
            (err.path && err.path.includes("name") && err.message.includes("required"))
        );
    }
    // Handle case where error is a string
    return typeof errorPayload === 'string' && 
           errorPayload.includes("Name is required for new user registration");
};
    const checkIfExistingUserError = (errorPayload) => {
        // Check for various existing user error patterns
        if (errorPayload?.error && Array.isArray(errorPayload.error)) {
            return errorPayload.error.some(err => 
                err.message?.includes("User not found") ||
                err.message?.includes("Invalid credentials") ||
                err.message?.includes("User does not exist") ||
                err.code === "user_not_found"
            );
        }
        
        // Also check direct message patterns
        const message = errorPayload?.message || '';
        return message.includes("User not found") || 
               message.includes("Invalid credentials") ||
               message.includes("User does not exist");
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!mobile) return;
    //     dispatch(loginWithMobile(mobile)).then((res) => {
    //         if (res.meta.requestStatus === "fulfilled") {
    //             onClose();
    //         }
    //     });
    // };


    //     const formatMobileNumber = (value) => {
    //     // Remove all non-digits
    //     const digits = value.replace(/\D/g, '');
        
    //     // If starts with 91, keep as is
    //     if (digits.startsWith('91')) {
    //         return digits.slice(0, 12); // 91 + 10 digits = 12 total
    //     }
        
    //     // If it's 10 digits or less, add 91 prefix
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
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mobile) return;
        
        // If name field is shown but not filled
        if (showNameField && !name) {
            return;
        }

        dispatch(loginWithMobile({ mobile, name: name || undefined })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                onClose();
            } else if (res.meta.requestStatus === "rejected") {
                // Check if this is a new user error
                if (checkIfNewUserFromError(res.payload) && !hasTriedLogin) {
                    setShowNameField(true);
                    setHasTriedLogin(true);
                }
            }
        });
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-80">
                {/* <h2 className="text-lg font-bold mb-4">Login / Register</h2> */}
                <h2 className="text-lg font-bold mb-4">
                    {showNameField ? "Complete Registration" : "Login"}
                </h2>
                <form onSubmit={handleSubmit}>
                     {showNameField && (
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded mb-4"
                            autoFocus
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded mb-4"
                        maxLength="12"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                        disabled={loading || !mobile}
                    >
                        {loading ? "Logging in..." : showNameField ? "Complete Registration" : "Submit"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPopUp;
