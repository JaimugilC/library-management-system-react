import React from "react";
import "./sidebar.css";
import { FaBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function SideBar() {
  const menuItem = [
    {
      path: "/",
      name: "Shelf",
    },
    {
      path: "/favourites",
      name: "Favourites",
    },
  ];

  return (
    <div className="sidebar">
      <div className="header">
        <FaBook className="icon" />
      </div>
      <div className="body">
        <div className="bodyTitle">Browse</div>
        {menuItem.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="link_text">{item.name}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
