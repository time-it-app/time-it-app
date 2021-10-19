import React, { useState } from "react";
import AppLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu.jsx";

export default function Sidebar() {
  const [active, setActive] = useState(true);

  const isSideBarActive = () => {
    setActive(!active);
  };

  return (
    <div className={active ? "Navigation active" : "Navigation"}>
      <div className="Sidebar">
        <div className="App-logo">
          <img src={AppLogo} alt="app logo" />
        </div>
        <div className="Menu">
          <Link to="/">
            <div className="Menu-item"> Tasks</div>
          </Link>
          <Link to="/settings">
            <div className="Menu-item"> Settings</div>
          </Link>
          <Link to="/about">
            <div className="Menu-item"> About</div>
          </Link>
        </div>
      </div>
      <BurgerMenu active={active} toggleSidebar={isSideBarActive} />
    </div>
  );
}
