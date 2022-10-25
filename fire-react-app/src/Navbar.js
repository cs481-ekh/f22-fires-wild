import React from "react";
import "./styles.css";
import logo from "./components/ffp_logo.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/">
        <img
          alt="[LOGO]"
          className="logo"
          data-cy="nav-home-button"
          src={logo}
        />
      </Link>
      <ul>
        <CustomLink to="/Data" data-cy="nav-data-page">
          Data
        </CustomLink>
        <CustomLink to="/About" data-cy="nav-about-page">
          About
        </CustomLink>
        <CustomLink to="/Admin" data-cy="nav-admin-page">
          Admin
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
