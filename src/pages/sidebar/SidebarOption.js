import React from "react";
import "./sidebarOption.css";

const SidebarOption = ({ active, Icon, text }) => {
  return (
    <div className={`sidebarOptions ${active && "sidebarOption--active"}`}>
      <div className="MuiSvgIcon-root">
        <Icon />
      </div>
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
