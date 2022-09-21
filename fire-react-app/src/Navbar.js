import React from "react";
import "./styles.css";
import logo from "./components/ffp_logo.png";

function Navbar() {
  return (
    <nav className="nav">
    <a href="/">
      <img alt="[LOGO]" className="logo" src={logo} />
    </a>
    <ul>
      <li>
        <a href="/Data">Data</a>
      </li>
      <li>
        <a href="/About">About</a>
      </li>
      <li>
        <a href="/Admin">Admin</a>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar;
