import React, { useState } from 'react';
import styles from './scroll.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Scroll = ({ label, elements = [], defaultItem, customStyles = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        className={`${styles.box_input} ${styles.customScroll}`}
        style={customStyles.container}
      >
        {label && ( // Affiche l'étiquette si label n'est pas vide
          <label className={styles.label} style={customStyles.label}>
            {label}
          </label>
        )}
        <div
          className={styles.input}
          style={{ ...customStyles.input, ...customStyles.inputText }} // Ajoutez les styles ici
          onClick={toggleList}
          onMouseEnter={() => { document.body.style.cursor = 'pointer'; }}
          onMouseLeave={() => { document.body.style.cursor = 'auto'; }}
        >
          <div className={styles.inside}>

          {selectedItem ? selectedItem : 'Edit'}
          </div>
        </div>
        {isOpen && (
          <div
            className={`${styles.dropdown} ${styles.dropdown1}`}
            style={customStyles.dropdown}
          >
            {elements.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`${styles.dropdownItem} ${styles.dropdownItem1}`}
                style={{
                  ...customStyles.dropdownItem,
                  cursor: 'pointer',
                }}
              >
                <div>{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Scroll;
