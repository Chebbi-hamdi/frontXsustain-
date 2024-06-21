import React from "react";
import styles from "./style.module.scss";

const CardTask = ({ title, description, onClick }) => {
  return (
    <div className={styles.Card} onClick={onClick}>
      <p className={styles.CardTitle}>{title}</p>
      <div className={styles.center}>
      <p className={styles.CardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default CardTask;
  