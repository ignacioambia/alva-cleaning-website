import * as React from "react";
import "./Header.scss";
import AlvaLogo from "../../assets/alva-logo-name.svg";
import { Button } from "@mui/material";
import { Router, Link, BrowserRouter } from "react-router-dom";

interface HeaderProps {
  showCreateServiceBtn?: boolean;
}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};

  newService = () => {
    window.location.replace("./new-service");
  };

  render() {
    const { showCreateServiceBtn } = this.props;
    return (
      <div className="header-wrapper">
        <img src={AlvaLogo} alt="alva cleaning logo" />
        <BrowserRouter>
          {showCreateServiceBtn && (
            <Button variant="outlined" onClick={this.newService}>
              Pedir servicio
            </Button>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

export default Header;
