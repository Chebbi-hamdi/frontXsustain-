import React from 'react';

const BorderContainer = ({ width,height, flex,className, children,reff }) => {
  const containerStyle = {
    width: width,
    height: height,
    border: '1px solid black', // Set border to 1px solid black
    borderRadius: '7px',
    background: '#ffffff',
    paddingLeft: '20px !important',
    display:'flex'
  };



  return (
    <div className={className} style={containerStyle} ref={reff}>
      {children}
    </div>
  );
};

export default BorderContainer;
