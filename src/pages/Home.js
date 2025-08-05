import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Widgets from "./widgets/Widgets";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const user = {
    name: "psattri",
    email: "pushpendra@gmail.com",
  };
  const handleLogout = () => {
    try {
      window.alert("Logout successful");
      navigate("/login");
    } catch (error) {
      window.alert("Logout failed. Please try again.");
    }
  };
  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user} />
      <Outlet />
      <Widgets />
    </div>
  );
};

export default Home;
