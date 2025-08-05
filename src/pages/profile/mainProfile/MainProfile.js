import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack,
  CenterFocusWeak,
  LockReset,
  MyLocation,
  AddLink,
} from "@mui/icons-material";
import Post from "../posts/Posts";
import EditProfile from "../editProfile/EditProfile";
import "./MainProfile.css";

const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedinuser] = useState([
    {
      profileImage: "",
      coverImage: "",
    },
  ]);
  const [name, setName] = useState(user?.name || "User Name");
  const username = user?.email?.split("@")[0];
  const [post, setPost] = useState([]);

  const data = [
    {
      _id: "1",
      name: "Jane Doe",
      username: "jane_doe",
      profilePhoto: "https://example.com/profiles/jane.jpg",
      post: "Exploring the new features in JavaScript! 🚀 #coding #JavaScript",
      photo: "https://example.com/posts/javascript.png",
    },
    {
      _id: "2",
      name: "John Smith",
      username: "johnsmith",
      profilePhoto: "https://example.com/profiles/john.jpg",
      post: "Just finished a great workout session! 💪 #fitness #health",
      photo: "https://example.com/posts/workout.png",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      username: "alicejohnson",
      profilePhoto: "https://example.com/profiles/alice.jpg",
      post: "Loving the new features in CSS! #webdevelopment #design",
      photo: "https://example.com/posts/css.png",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 m-4">
        <ArrowBack className="" onclick={() => navigate("/")} />
        <h4 className="text-xl font-bold text-[#444]">{username}</h4>
      </div>
      <div className="">
        <div className="">
          <div className="profileContainer">
            <div className="h-[200px] w-full overflow-hidden relative">
              <img
                src={
                  loggedinuser[0]?.profileImage
                    ? loggedinuser[0].profileImage
                    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                className=" w-full h-full object-fit"
                alt="cover_image"
              />
              <div className="absolute top-0 left-0 h-full w-full bg-gray-600 flex justify-center items-center opacity-0 hover:opacity-80">
                <div className="ml-10">
                  <label htmlFor="image" className="">
                    {isLoading ? (
                      <LockReset className="photoIcon" />
                    ) : (
                      <CenterFocusWeak className="photoIcon" />
                    )}
                  </label>
                  <input type="file" id="image" className="imageInput" />
                </div>
              </div>
            </div>
            <div className="relative mt-[-80px] left-[20px] h-[150px] w-[150px] border-4 border-solid border-white rounded-full overflow-hidden">
              <img
                src={
                  loggedinuser[0]?.profileImage
                    ? loggedinuser[0].profileImage
                    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                alt="profile_image"
              />
              <div className="hoverAvatarImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="image" className="imageIcon">
                    {isLoading ? (
                      <LockReset className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeak className="photoIcon" />
                    )}
                  </label>
                  <input type="file" id="image" className="imageInput" />
                </div>
              </div>
            </div>
            <div className="editProfileContainer">
                {/* className="text-[var(--twitter-color)] font-bold border-2 border-[var(--twitter-color)] px-4 py-2 rounded-3xl hover:bg-[var(--twitter-color)] hover:text-white cursor-pointer transition-all duration-300" */}
              <div >
                <EditProfile user={user} loggedinuser={loggedinuser} />
              </div>
            </div>

            <div className="userInfo">
              <div>
                <h3 className="heading-3 capitalize font-bold">
                  {username ? username : "User Name"}
                </h3>
              </div>
            </div>
            <div className="userInfo">
              <div>
                <h3 className="heading-3">
                  {loggedinuser[0]?.name
                    ? loggedinuser[0].name
                    : user && user.displayName}
                </h3>
                <p className="usernameSection">@{username}</p>
              </div>
            </div>
            <div className="infoContainer">
              {loggedinuser[0]?.bio ? <p>{loggedinuser[0].bio}</p> : ""}
              <div className="locationAndLink">
                {loggedinuser[0]?.location ? (
                  <p className="suvInfo">
                    <MyLocation /> {loggedinuser[0].location}
                  </p>
                ) : (
                  ""
                )}
                {loggedinuser[0]?.website ? (
                  <p className="subInfo link">
                    <AddLink /> {loggedinuser[0].website}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h4 className="tweetsText">Tweets</h4>
            <hr />
          </div>
          {data.map((item) => (
            <Post key={item._id} p={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
