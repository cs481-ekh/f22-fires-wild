import React from "react"
import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Admin from "./pages/Admin"
import Data from "./pages/Data"
import "./styles.css"

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/Data":
      component = <Data />
      break
    case "/About":
      component = <About />
      break
    case "/Admin":
      component = <Admin />
      break
  }

  return (
    <>
      <Navbar />
      <div className="page_container">{component}</div>
      </>
  )

}

export default App;
