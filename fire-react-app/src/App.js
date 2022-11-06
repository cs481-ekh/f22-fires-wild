import React, { Component } from "react";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
// import axios from 'axios';
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
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
              <Route
                path={process.env.REACT_APP_WEB_ROUTE + "/Admin"}
                element={<Admin />}
              />
            </Routes>
          </div>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
