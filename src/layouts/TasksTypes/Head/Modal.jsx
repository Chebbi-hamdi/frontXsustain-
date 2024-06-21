import React from "react";
import styles from "./modal.module.scss";

const Modal = ({ task, cards, onOptionSelect }) => {
  return (
    <div className={styles.Modal}>
        <div className={styles.CardTitle} >
          
            <span className={styles.TaskTitle}> {task} </span>
            <span className={styles.TaskSelect}>Select {task} </span>
          
        </div>
      <div className={styles.Cards}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={styles.Card}
            onClick={() => onOptionSelect(card)}
          >
            <img src={card.image} alt={card.title} />
            <h2>{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
