// import 'Comin'
import logo from "../../assets/alva-logo-name.svg";
import "./ComingSoon.scss";

export const ComingSoon = (props: any) => {
  return (
    <div className="coming-soon-wrapper">
      <div className="body">
        <span className="upper-msg">La ropa sucia se lava en: </span>

        <img className="logo" src={logo} alt="alva logo" />
        <span className="lower-msg">PRÓXIMAMENTE...</span>
      </div>
    </div>
  );
};
