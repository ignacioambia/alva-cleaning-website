import React from 'react';
import logo from './logo.svg';
import alvaLogo from "./assets/alva-logo-name.svg";
import "./App.css";
import NewService from "./pages/NewService/NewService";
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
      element: <NewService />,
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
