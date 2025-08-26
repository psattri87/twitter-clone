import React, { useState, useEffect } from "react";
import "./Feed.css";
import Posts from "./posts/Posts";
import TweetBox from "./tweetBox/TweetBox";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [refreshPosts, setRefreshPosts] = useState(0);
  
  // Simulating fetching data from an API
  useEffect(() => {
    axios.get("http://localhost:5000/post").then((res) => {
      setPosts(res.data);
    });
  }, [refreshPosts]);

  return (
    <div>
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>
        <TweetBox setRefreshPosts={setRefreshPosts}/>
        {posts.map((item) => (
          <Posts key={item._id} p={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
