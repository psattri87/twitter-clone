import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import useLoggedinUser from "../../../hooks/useLoggedinUser";

const TweetBox = ({setRefreshPosts}) => {
  const [post, setpost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useUserAuth();
  const [loggedinUser] = useLoggedinUser();
  const email = user?.email;
  const userProfilePhoto = loggedinUser[0]?.profileImage
    ? loggedinUser[0].profileImage
    : user && user.photoURL;

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=ba1e4b1eb6d58c95105558cf0aac4b51",
        formData
      )
      .then((res) => {
        setImageUrl(res.data.data.display_url);
        console.log(res.data.data.display_url);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const handleTweet = (e) => {
    e.preventDefault();
    if (user?.providerData[0].providerId === "password") {
      console.log("conditional fetching");
      fetch(`http://localhost:5000/user?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]);
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      console.log("unconditional fetching");
      setName(user?.displayName);
      setUsername(user?.email.split("@")[0]);
    }
    if (name) {
      const userPost = {
        profilePhoto: userProfilePhoto,
        post: post,
        photo: imageUrl,
        username: username,
        name: name,
        email: email,
      };
      console.log(userPost);
      setpost("");
      setImageUrl("");
      axios
        .post("http://localhost:5000/post", userPost)
        .then((res) => console.log(res.data));
      
      //Refresh the Posts
      setRefreshPosts((value)=>value+1);
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src="" />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isloading ? (
              <p>uploading image</p>
            ) : (
              <p>{imageUrl ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            className="imageInput"
            id="image"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweets
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
