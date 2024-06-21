import React from "react";
import "./style.css";
import logo from "../../../assets/logo.svg";
import Button from "../buttons"; // Import Button component
import { useMediaQuery } from "react-responsive";
import Card from "../card";
import { ReactComponent as Settings } from "../../../assets/settings.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  // const handleNavLogin = () => {
  //   navigate("/sign_in");
  //   console.log("Login");
  // };

  // const handleNavRegister = () => {
  //   navigate("/sign_up");
  //   console.log("Register");
  // };
  const isBigScreen = useMediaQuery({ query: "(min-width: 750px)" });

  if (isBigScreen) {
    return (
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div>
          
        <div className="login">
            <Button navigateTo={'/sign_in'} className="login" color="#000" background="#FFFFFF">LOGIN</Button> 
            <Button navigateTo={'/sign_up'}className="register" color="#FFF" background="#000">REGISTER</Button> 

        </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="phoneNavBar">
          <Card
            customStyles={{
              borderRadius: "9px",
              background: "#FFF",
            }}
            height="59px"
            width="343px"
          >
            <div className="childOfphoneNavBar">
              <h4 className="pl-5">XSUSTAIN.</h4>
              <Settings className="iconNavBar" />
            </div>
          </Card>
        </div>
      </>
    );
  }
};

export default NavBar;
