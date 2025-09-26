import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import LeftSide from "../subComponents/LeftSide";
import RightSide from "../subComponents/RightSide";
import LoginModal from "../modal/LoginModal";
import { useDispatch } from "react-redux";
import { initializeAuth } from "../../store/authSlice";

const Layout = () => {
    const [showLogin, setShowLogin] = useState(false);
        const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(initializeAuth());
    }, [dispatch]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token from localStorage:", token);
        if (!token) setShowLogin(true);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) setShowLogin(true);
    }, []);

    return (
        <div className="w-screen h-screen relative">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            <Header />
            <div className="w-full h-[calc(100vh-48px)] flex">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
};

export default Layout;
