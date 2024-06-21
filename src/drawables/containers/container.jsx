import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Container = ({ width, className, children, reff, style }) => {
  const containerStyle = {
    width: width,
    border: '0px solid black',
    padding: '0',
    margin: '0',
    ...style // Spread the style prop to override default styles
  };

  return (
    <div className={className} style={containerStyle} ref={reff}>
      {children}
    </div>
  );
};

export default Container;

