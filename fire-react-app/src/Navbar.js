import React from "react";
import "./styles.css";

function Navbar() {
  return (
    <nav className="nav">
    <a href="/" className="site-title">[LOGO?]</a>
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
