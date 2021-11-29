import "./Navigation.css";
//import {Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footerContainer">
      <a
        href="https://github.com/valeriareynososf"
        target="_blank"
        className="linkedInLink"
      >
        <i className="fab fa-github"></i>
      </a>{" "}
      Valeria Reynoso{" "}
      <a
        href="https://www.linkedin.com/in/valeria-reynoso-castellanos-b89210149/"
        target="_blank"
        className="linkedInLink"
      >
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  );
}

export default Footer;
