import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, className, to, type, disabled }) => {
  const buttonStyle = {
    // Ajoutez vos styles CSS en tant qu'objets JavaScript
    width: "100%",
    height: "65px",
    borderRadius: "5px",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: disabled ? "#999999" : "black", // Change background color if disabled
    color: disabled ? "#666666" : "white", // Change text color if disabled
    cursor: disabled ? "not-allowed" : "pointer", // Change cursor if disabled
    textDecoration: "none" // Remove underline for Link
  };

  if (to) {
    return (
      <Link to={to} className={className} style={buttonStyle} disabled={disabled}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type || "button"} className={className} style={buttonStyle} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
