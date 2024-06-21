import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route components
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks

const CardButton = ({ imageStyle, image, width, className, children, borderr,onClick=()=>{}}) => {
  const containerStyle = {
    width: "auto",
    display: 'flex',
    gap:"5px",
    height: '28px',
    alignItems: 'center',
    fontSize: '1em',
    padding:"0 1rem",
    overflow:'hidden',
    cursor: 'pointer', // Add cursor pointer to indicate clickable
  };

  const imageStyles = {
    ...imageStyle,
    maxWidth: '100%',
    width: '20px', // Apply width directly to the image
  };

  return (
    <div className={className} style={containerStyle} onClick={onClick} >
      <img src={image} alt='' style={imageStyles} />
      {children}
    </div>
  );
};



export default CardButton;
