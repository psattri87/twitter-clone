import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Widgets from "./widgets/Widgets";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const {logOut, user} = useUserAuth()
  const navigate = useNavigate();
  // const user = {
  //   name: "psattri",
  //   email: "pushpendra@gmail.com",
  // };
  const handleLogout = async () => {
    try {
      await logOut()
      window.alert("Logout successful");
      navigate("/login");
    } catch (error) {
      window.alert("Logout failed. Please try again.");
    }
  };
  return (
    <div className="app">
      <Sidebar user={user} handleLogout={handleLogout}/>
      <Outlet />
      <Widgets />
    </div>
  );
};

export default Home;
