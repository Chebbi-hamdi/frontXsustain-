import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Button = ({ children, color, background, className, textStyle, customClassName, navigateTo, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    if (onClick) {
      onClick();
    }
  };

  const buttonStyle = {
    background: background || "#000",
    color: color || "#FFF",
    ...textStyle,
    width: '95%'
  };

  return (
    <button
      className={`buttonStyle ${className} ${customClassName}`}
      style={buttonStyle}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
