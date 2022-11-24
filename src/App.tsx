import React from 'react';
import logo from './logo.svg';
import alvaLogo from "./assets/alva-logo-name.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "new-service",
      element: <Home />,
    },
  ]);
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>Alva Cleaning</Toolbar>
      </AppBar>

      <RouterProvider router={router} />
    </React.Fragment>
  );
  // return <Home></Home>;
}

export default App;
