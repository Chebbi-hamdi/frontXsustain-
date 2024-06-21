import React from 'react';
import styles from './style.module.scss';

const HoverTip = ({ text, className,nbr }) => {
  const truncatedText = text.substring(0, nbr); // Take the first 7 characters of the text

  return (
    <div className={styles.tooltip}>
      {text !== truncatedText ? (
        <>{truncatedText}...</>
      ) : (
        <>{truncatedText}</>
      )}
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  );
};

export default HoverTip;
