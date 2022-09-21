import React from "react"
import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Admin from "./pages/Admin"
import Data from "./pages/Data"

function App() {
  let PageComponent
  switch (window.location.pathname) {
    case "/":
      PageComponent = Home
      break
    case "/Data":
      PageComponent = Data
      break
    case "/About":
      PageComponent = About
      break
    case "/Admin":
      PageComponent = Admin
      break
  }

  return (
    <>
      <Navbar />
      <PageComponent />
    </>
  )

}

export default App;
