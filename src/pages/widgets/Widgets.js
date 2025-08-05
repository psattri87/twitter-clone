import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { XEmbed } from "react-social-media-embed"
import "./Widgets.css";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <XEmbed
          url="https://twitter.com/dograjournalist/status/1949940218364330027"
          options={{ height: 400 }}
        />
        <XEmbed
          url="https://twitter.com/elonmusk/status/1949995479179436331"
          options={{ height: 400 }}
        />
        <XEmbed
          url="https://twitter.com/pushpendraattri/status/1238470348615479296"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Widgets;
