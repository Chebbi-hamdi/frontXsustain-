import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";

const Dropdown = ({ cards, task, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (card) => {
    onOptionSelect(card);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className={`${styles.Dropdown} ${isOpen ? styles.Border : ""}`}
      
    >
      <div className={styles.LabelAndIcon} onClick={handleIconClick}>
        <span className={styles.TaskTitle}>{task}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M21.25 15.5833L17 19.8333L12.75 15.5833"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {selectedOption && (
        <div className={styles.SelectedOption}>
          {task === "Size" ? selectedOption.description : selectedOption.title}
        </div>
      )}
      <div
        className={`${styles.ListContainer} ${
          isOpen
            ? `${styles.OpenListContainer} ${
                task === "Delivery Time" ? styles.DeliveryTimeCard : ""
              }`
            : ""
        }`}
      >
        {isOpen && (
          <div className={styles.CardTitle}>
            <h2 className={styles.TaskTitleCard}>{task}</h2>
            <span className={styles.TaskSelect}>Select {task} </span>
            <div className={styles.Cards}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={styles.Card}
                  onClick={() => handleOptionClick(card)}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className={styles.Image}
                  />
                  <h2 className={styles.TaskTitle}>{card.title}</h2>
                  <span className={styles.DescriptionTask}>
                    {card.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;