import React, { useState } from "react";
import "./Feed.css";
import Posts from "./posts/Posts";
import TweetBox from "./tweetBox/TweetBox";

const Feed = () => {
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
  // Simulating fetching data from an API

  // setPost(data);
  return (
    <div>
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>
        <TweetBox />
        {data.map((item) => (
          <Posts key={item._id} p={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
