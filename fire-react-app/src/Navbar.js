import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from "./components/ffp_logo.png";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import "./styles.css";
import { Link, useMatch, useResolvedPath, StyleSheet } from "react-router-dom";

const pages = ['Data', 'About', 'Admin'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  return (
    <AppBar style={{ background: '#1976d2' }} position="static">
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <Link to={`${process.env.REACT_APP_WEB_ROUTE}`}>
              <img
                alt="[LOGO]"
                className="logo"
                data-cy="nav-home-button"
                src={logo}
              />
          </Link>
   {/*     <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          */}  
          <Box textAlign='center' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
{/*            {pages.map((page) => (
              <Button
                key={page}
                onClick={changePage}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
*/}
              <Button
                key="Data"
                component={Link} to={`${process.env.REACT_APP_WEB_ROUTE}/Data`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  Data
              </Button>

              <Button
                key="About"
                component={Link} to={`${process.env.REACT_APP_WEB_ROUTE}/About`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  About
              </Button>

              <Button
                key="Admin"
                href={process.env.REACT_APP_DJANGO_API_URL + "admin"}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  Admin
              </Button>
          </Box>



        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;