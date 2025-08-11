import React, { use } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./sidebar.css";
import CustomLink from "./CustomLink";
import SidebarOption from "./SidebarOption";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import useLoggedinUser from "../../hooks/useLoggedinUser";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedinUser] = useLoggedinUser();
  const {user, logOut} = useUserAuth();
  const navigate = useNavigate();
  console.log("sidebar rendered");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      await logOut();
      window.alert("Logout successful");
      navigate("/login");
    } catch (error) {
      window.alert("Logout failed. Please try again.");
    }
  };
  const result = user?.email?.split("@")[0];
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <CustomLink to="/home/feed" className="sidebar__link">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </CustomLink>
      <CustomLink to="/home/explore">
        <SidebarOption active Icon={SearchIcon} text="Explore" />
      </CustomLink>
      <CustomLink to="/home/notification">
        <SidebarOption
          active
          Icon={NotificationsNoneIcon}
          text="Notifications"
        />
      </CustomLink>
      <CustomLink to="/home/messages">
        <SidebarOption active Icon={MailOutlineIcon} text="Messages" />
      </CustomLink>
      <CustomLink to="/home/bookmarks">
        <SidebarOption active Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomLink>
      <CustomLink to="/home/lists">
        <SidebarOption active Icon={ListAltIcon} text="Lists" />
      </CustomLink>
      <CustomLink to="/home/profile">
        <SidebarOption active Icon={PermIdentityIcon} text="Profile" />
      </CustomLink>
      <CustomLink to="/home/more">
        <SidebarOption active Icon={MoreIcon} text="More" />
      </CustomLink>
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      <div className="profile__info mt-10">
        <Avatar
          src={
            loggedinUser[0]?.profileImage
              ? loggedinUser[0]?.profileImage
              : user && user.photoURL
          }
          alt="profile_image"
        />
      </div>
      <div className="user__info subUser__info">
        <div>
          {/* <h4>
            {loggedinUser[0]?.name
              ? loggedinUser[0].name
              : user && user.displayName}
          </h4> */}
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          onClick={handleClick}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-valuetext={openMenu ? "true" : undefined}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => navigate("/home/profile")}
            className="profile__info"
          >
            <Avatar
              src={
                loggedinUser[0]?.profileImage
                  ? loggedinUser[0].profileImage
                  : user && user.photoURL
              }
              alt={user?.name}
            />

            <div className="user__info subUser__info">
              <div>
                {/* <h4>
                  {logedinUser[0]?.name
                    ? logedinUser[0].name
                    : user && user.displayName}
                </h4> */}
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done__icon" color="blue">
                <DoneIcon fontSize="small" />
              </ListItemIcon>
            </div>
          </MenuItem>

          <Divider />
          <MenuItem
            onClick={handleClose}
          >
            Add an existing account
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
          >
            Log out @ {result}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
