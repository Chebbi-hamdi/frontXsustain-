import React from 'react';
import { Link } from 'react-router-dom';
import './button.Dash.scss'; // Importez votre fichier SCSS

const Button = ({ text, className, to, type }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`Hint ${className}`} // Utilisez simplement le nom de classe
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type || 'button'}
      className={`Hint ${className}`} // Utilisez simplement le nom de classe
    >
      {text}
    </button>
  );
};

export default Button;
