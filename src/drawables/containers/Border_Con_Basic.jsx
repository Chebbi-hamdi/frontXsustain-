import React from 'react';

const BorderContainer = ({ fnt1, width,height, className, children,reff }) => {
  const containerStyle = {
    width: width,
    height: height,
    border: '1px solid black', // Set border to 1px solid black
    padding: '0',
    margin: '0',
    borderRadius: '7px',
    background: '#ffffff',
    position: 'relative', // Assurez-vous que les enfants positionnés sont positionnés par rapport à ce parent
    justifyContent: 'center',
    paddingLeft: '20px !important',
    
  };



  return (
    <div onClick={fnt1} className={className} style={containerStyle} ref={reff}>
      {children}
    </div>
  );
};

export default BorderContainer;
