import React, { Component } from "react";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
// import axios from 'axios';
import "./styles.css";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // heatMapData: []
    };
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="page_container">
          <Routes>
            <Route
              path={process.env.REACT_APP_WEB_ROUTE + "/"}
              element={<Home />}
            />
            <Route
              path={process.env.REACT_APP_WEB_ROUTE + "/Data"}
              element={<Data />}
            />
            <Route
              path={process.env.REACT_APP_WEB_ROUTE + "/About"}
              element={<About />}
            />
            {/* <Route
              path={process.env.REACT_APP_WEB_ROUTE + "/Admin"}
              element={<Admin />}
            /> */}
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
