import React from 'react';

const Popup = ({ comment, position }) => {
  console.log('position', position);
  console.log('comment', comment);
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position?.y}px`,
        left: `${position?.x-150}px`,
        padding: '10px',
        border: '3px solid blue',
        height: `${position?.height+100}px`,
        width: `${position?.width+50}px`,
        zIndex: 1000,
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.5em',
          color: 'blue',
        }}
      >
        {comment}
      </p>
    </div>
  );
};

export default Popup;
