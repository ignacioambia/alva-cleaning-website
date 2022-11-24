import React from 'react';
import logo from './logo.svg';
import alvaLogo from "./assets/alva-logo-name.svg";
import "./App.css";
import NewService from "./pages/NewService/NewService";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Header from "./components/Header/Header";

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
      <Header
        showCreateServiceBtn={window.location.pathname != "/new-service"}
      ></Header>

      <RouterProvider router={router} />
    </React.Fragment>
  );
  // return <Home></Home>;
}

export default App;
