import React from "react";
import "./style.css";

const Card = ({ children, height, width, color, customStyles ,position }) => {
  const cardStyle = {
    height: height || "auto",
    width: width ,
    backgroundColor: color || "transparent",
    ...customStyles ,
    position:position
  };

  return (
    <div className="card" style={cardStyle}>
      {children}
    </div>
  );
};

export default Card;
