import React from "react";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  ChatBubbleOutline,
  Repeat,
  FavoriteBorder,
  Publish,
} from "@mui/icons-material";

const Posts = ({ p }) => {
  const { name, username, profilePhoto, photo, post } = p;
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={profilePhoto} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" />@{username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post}</p>
          </div>
        </div>
        {photo !== "" && <img src={photo} alt="post_image" width="500" />}

        <div className="post__footer">
          <ChatBubbleOutline className="post__footer__icon" fontSize="small" />
          <Repeat className="post__footer__icon" fontSize="small" />
          <FavoriteBorder className="post__footer__icon" fontSize="small" />
          <Publish className="post__footer__icon" fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
