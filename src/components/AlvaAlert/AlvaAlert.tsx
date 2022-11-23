import { dividerClasses } from "@mui/material";
import * as React from "react";
import "./AlvaAlert.scss";

interface AlvaAlertProps {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
}

interface AlvaAlertState {
  alertOpen: boolean;
}

class AlvaAlert extends React.Component<AlvaAlertProps, AlvaAlertState> {
  state = {
    alertOpen: false,
  };

  closeAlert = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({ alertOpen: false });
  };

  componentDidMount() {
    this.setState({ alertOpen: this.props.open });
  }

  componentDidUpdate(prevProps: AlvaAlertProps) {
    const open: boolean = this.props.open as boolean;
    if (open != prevProps.open) {
      this.setState({ alertOpen: open });
    }
  }

  render() {
    const { alertOpen } = this.state;
    return (
      // alert-wrapper
      <div className={`alert-wrapper ${alertOpen ? "active" : ""}`}>
        <div className="content">
          <div className="cross-icon" onClick={this.closeAlert}>
            ×
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default AlvaAlert;
