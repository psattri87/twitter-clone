import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import twitterImage from "../../image/twitterLoginImage.jpg";
import { FaTwitter } from "react-icons/fa";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = {
        userName: userName,
        password: password,
      };
      // Simulate a Log in process
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
              <GoogleButton type="light" onClick={handleGoogleSignIn}/>
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

export default Login;
