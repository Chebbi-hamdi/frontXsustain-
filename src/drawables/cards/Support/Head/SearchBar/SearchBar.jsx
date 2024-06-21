import React from 'react';
import styles from './style.module.scss';
import searchIcon from '../../../../../assets/images/Serachh.svg'; // Assurez-vous d'importer correctement votre icône de recherche

const SearchBar = () => {
  return (
    <div className={styles.InputContainer}>
      <img src={searchIcon} alt="Search Icon" className={styles.SearchIcon} />
      <input className={styles.Input} placeholder="Search" />
    </div>
  );
};

export default SearchBar;
