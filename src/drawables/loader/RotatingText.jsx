import React from 'react';
import './rotate.scss';

const RotatingText = ({ text }) => {
    // Split the text into letters and wrap each letter in a span
    const letters = text.split('').map((letter, index) => (
      <span key={index} className="rotate-letter">{letter}</span>
    
    ));
    console.log(letters)
  
    return <h1>{letters}</h1>;
}

export default RotatingText;