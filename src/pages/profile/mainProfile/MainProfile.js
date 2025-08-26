import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import {
  ArrowBack,
  CenterFocusWeak,
  LockReset,
  MyLocation,
  AddLink,
} from "@mui/icons-material";
import Post from "../posts/Posts";
import Editprofile from "../editProfile/EditProfile";
import "./MainProfile.css";
import axios from "axios";
import useLoggedinUser from "../../../hooks/useLoggedinUser";

const MainProfile = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedinUser, setLoggedinUser] = useLoggedinUser();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [postData, setPostData] = useState([]);
  const email = loggedinUser?.email || user?.email;
  const username = user?.email?.split("@")[0];

  async function createImageUrl(image) {
    if (!image) return;
    const formData = new FormData();
    formData.set("image", image);
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=ba1e4b1eb6d58c95105558cf0aac4b51",
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json().then((data) => data);
    console.log("Image upload response data:", data.data);
    if(data.success){
      console.log("Image URL:", data.data.display_url);
      return data.data.display_url;
    }
  }

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const url = await createImageUrl(e.target.files[0]);
    if (!url) {
      console.log("Image upload failed");
      setIsLoading(false);
      return;
    }
    if (e.target.id === "coverImage") {
      const result = handleUpdateUserProfile({ email: email, coverImage: url });
      if (result) {
        setIsLoading(false);
        setCoverImageUrl(url);
      }
    } else if (e.target.id === "profileImage") {
      const result = handleUpdateUserProfile({
        email: email,
        profileImage: url,
      });
      if (result) {
        setIsLoading(false);
        setProfileImageUrl(url);
      }
    }
  };

  async function handleUpdateUserProfile(updatedUser) {
    if (!updatedUser?.email) return;
    console.log("Updating user profile with data:", updatedUser);
    try {
      const response = await axios.patch(
        `http://localhost:5000/user?email=${updatedUser.email}`,

        updatedUser
      );
      const data = await response.data;
      if (data.acknowledged) {
        console.log("Profile updated successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  function fetchAllPosts() {
    fetch("http://localhost:5000/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
      });
  }

  useEffect(() => {
    fetchAllPosts();
    // update profile when userProfile state changes
    if (!email) return;
    axios
      .get(`http://localhost:5000/user?email=${email}`)
      .then((response) => {
        setLoggedinUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email, setLoggedinUser]);

  return (
    <div>
      <div className="flex items-center gap-4 m-4">
        <ArrowBack className="" onClick={() => navigate("/")} />
        <h4 className="text-xl font-bold text-[#444]">{username}</h4>
      </div>
      <div className="">
        <div className="">
          <div className="profileContainer">
            <div className="h-[200px] w-full overflow-hidden relative bg-slate-300">
              <img
                src={
                  coverImageUrl !== ""
                    ? coverImageUrl
                    : loggedinUser?.coverImage
                    ? loggedinUser.coverImage
                    : user && user.photo
                }
                className="h-full object-fit "
                alt="cover_image"
                width={"600"}
              />
              <div className="absolute top-0 left-0 h-full w-full bg-gray-600 flex justify-center items-center opacity-0 hover:opacity-80">
                <div className="ml-10">
                  <label htmlFor="coverImage" className="">
                    {isLoading ? (
                      <LockReset className="photoIcon" />
                    ) : (
                      <CenterFocusWeak className="photoIcon" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    className="imageInput"
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
            </div>
            <div className="relative mt-[-80px] left-[20px] h-[150px] w-[150px] border-4 border-solid border-white rounded-full overflow-hidden">
              <img
                src={
                  profileImageUrl !== ""
                    ? profileImageUrl
                    : loggedinUser?.profileImage
                    ? loggedinUser?.profileImage
                    : user && user.photoURL
                }
                alt="profile_image"
                className="w-full h-full object-fit"
              />
              <div className="hoverAvatarImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="profileImage" className="imageIcon">
                    {isLoading ? (
                      <LockReset className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeak className="photoIcon" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    className="imageInput"
                    onChange={handleUploadImage}
                  />
                </div>
              </div>
            </div>
            <div className="editProfileContainer">
              <div>
                <Editprofile
                  user={user}
                  handleUpdateUserProfile={handleUpdateUserProfile}
                />
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
                  {loggedinUser?.name
                    ? loggedinUser.name
                    : user && user.displayName}
                </h3>
                <p className="usernameSection">@{username}</p>
              </div>
            </div>
            <div className="infoContainer">
              {loggedinUser?.bio ? <p>{loggedinUser.bio}</p> : ""}
              <div className="locationAndLink">
                {loggedinUser?.location ? (
                  <p className="suvInfo">
                    <MyLocation /> {loggedinUser.location}
                  </p>
                ) : (
                  ""
                )}
                {loggedinUser?.website ? (
                  <p className="subInfo link">
                    <AddLink /> {loggedinUser.website}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h4 className="tweetsText">Tweets</h4>
            <hr />
          </div>
          {postData.map((item) => (
            <Post key={item._id} p={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
