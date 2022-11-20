import React from 'react';
import logo from './logo.svg';
import alvaLogo from "./assets/alva-logo-name.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>Alva Cleaning</Toolbar>
      </AppBar>
      <Home></Home>
    </React.Fragment>
  );
  // return <Home></Home>;
}

export default App;
