import React from "react"
import "./styles.css"
import logo from "./components/ffp_logo.png"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
    <Link to="/">
      <img alt="[LOGO]" className="logo" src={logo} />
    </Link>
    <ul>
        <CustomLink to="/Data">Data</CustomLink>
        <CustomLink to="/About">About</CustomLink>
        <CustomLink to="/Admin">Admin</CustomLink>
    </ul>
  </nav>
  )
}

function CustomLink({ to, children, ...props }) {
 const resolvedPath = useResolvedPath(to)
 const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={ isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}