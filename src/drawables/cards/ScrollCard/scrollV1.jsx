import React, { useState } from 'react';
import styles from './scrollv1.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Scroll = ({ elements = [], defaultItem, customStyles = {} ,className}) => {
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
        <div
          className={`${styles.input} ${className}`}
          style={{ ...customStyles.input, ...customStyles.inputText }}
          onClick={toggleList}
          onMouseEnter={() => { document.body.style.cursor = 'pointer'; }}
          onMouseLeave={() => { document.body.style.cursor = 'auto'; }}
        >
          {selectedItem ? selectedItem : 'Edit'}
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
