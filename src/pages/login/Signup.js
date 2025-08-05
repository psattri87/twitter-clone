import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import twitterImage from "../../image/twitterLoginImage.jpg";
import { FaTwitter } from "react-icons/fa";
import GoogleButton from "react-google-button";

import "./Login.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = {
        userName: userName,
        name: name,
        email: email,
        password: password,
      };
      // Simulate a signup process
      console.log("User signed up with:", { userName, email, password });
      // Here you would typically call your backend API to create a new user
      // After successful signup, navigate to the login page
      setLoading(false);
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Simulate Google sign-in process
      navigate("/");
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex bg-white relative">
        <div className="hidden lg:flex w-[60%] h-full flex-col sticky top-0">
          <img src={twitterImage} alt="twitter-image" className="w-full" />
        </div>
        <div className="h-full w-full lg:w-[40%] flex flex-col">
          <div className="flex flex-col mx-10 my-10">
            <FaTwitter className="text-sky-500 text-5xl" />
            <h1 className="text-4xl font-bold text-gray-700 mt-4">
              Happening now
            </h1>
            <h3 className="text-2xl font-bold text-gray-700 mt-6">
              Join Twitter today
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 lg:w-[250px] mt-3"
            >
              <input
                type="text"
                placeholder="Name"
                className="border-2 rounded-full p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                className="border-2 rounded-full p-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border-2 rounded-full p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-full p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-sky-500 text-white rounded-full p-2"
              >
                Sign Up
              </button>
            </form>
            <p className="text-red-500">{error}</p>
            <div className="mt-6">
            <GoogleButton type="light" onClick={handleGoogleSignIn} />
              {/* <GoogleOAuthProvider clientId="46184417202-a7unfsef6n1eavh6ho173ikkdh7p46r0.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
