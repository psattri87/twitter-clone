import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import twitterImage from "../../image/twitterLoginImage.jpg";
import { FaTwitter } from "react-icons/fa";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Login.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password);
      const user = {
        userName: userName,
        name: name,
        email: email
      };
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            console.log("User created successfully"+data);
            navigate("/");
          }
        });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false)
      window.alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
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
              {loading && <p>Loading...</p>}
            </form>
            <p className="text-red-500">{error}</p>
            <div className="mt-6">
              <GoogleButton type="light" onClick={handleGoogleSignIn} />
            </div>
            <div className="mt-5 text-gray-700">Have an account already? <span className="text-sky-600 hover:underline cursor-pointer " onClick={()=>{navigate("/login")}}>Log in</span> </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
