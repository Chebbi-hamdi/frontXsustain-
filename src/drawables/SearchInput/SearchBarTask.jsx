import React from 'react';
import styles from './style.module.scss';
import searchIcon from '../../assets/images/Serachh.svg';
import { useState } from 'react';

const SearchBarTask = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    props.onSearchChange(e.target.value);
  }
  return (
    <div className={styles.InputContainer} >
      <img src={searchIcon} alt="Search Icon" className={styles.SearchIcon} />
      <input className={`${styles.Input} ${props.className}`} placeholder="Find something"
        value={searchTerm} onChange={handleSearchChange}
      
      />
    </div>
  );
};

export default SearchBarTask;
