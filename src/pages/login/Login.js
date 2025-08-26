import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import twitterImage from "../../image/twitterLoginImage.jpg";
import { FaTwitter } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { googleSignIn ,login} = useUserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
      setLoading(false);
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
    <div className="w-full h-[100vh] flex bg-white relative">
      <div className="hidden lg:flex w-[60%] h-full flex-col sticky top-0">
        <img src={twitterImage} alt="twitter-image" className="w-full" />
      </div>
      <div className="h-full w-full lg:w-[40%] flex flex-col">
        <div className="flex flex-col mx-10 my-10">
          <FaTwitter className="text-sky-500 text-5xl" />
          <h1 className="text-4xl font-bold text-gray-700 mt-4">
            Sign in to Twitter
          </h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 lg:w-[250px] mt-6"
          >
            <input
              type="text"
              placeholder="Phone, email or username"
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
              Log in
            </button>
          </form>
          <p className="text-red-500">{error}</p>
          <div className="mt-6">
            <GoogleButton type="light" onClick={handleGoogleSignIn} />
          </div>
          <div className="mt-5 text-gray-700">Don't have an account? <span className="text-sky-600 hover:underline cursor-pointer " onClick={()=>{navigate("/signup")}}>Sign up</span></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
