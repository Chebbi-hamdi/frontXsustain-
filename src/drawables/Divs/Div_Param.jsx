import React from 'react';

export const Div = ({ className, children, width, height, reff,style,onClick=() =>{} }) => {
  const containerStyle = {
    width: width,
    height: height,
    ...style // Merge custom styles with inline styles

  };

  return (
    <div className={className} style={containerStyle} ref={reff} onClick={onClick}>
      {children}
    </div>
  );
};