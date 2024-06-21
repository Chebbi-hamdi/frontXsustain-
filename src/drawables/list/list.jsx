import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const ListSidebar = ({ src, text, reff, nbr, navigateTo, ref1, activeItem, setActiveItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveItem(navigateTo); // Set the active item on click
    navigate(navigateTo);
  };

  return (
    <li
      className={`${styles.liii} ${activeItem === navigateTo ? styles.active : ''}`} // Apply active class conditionally
      ref={ref1}
      onClick={handleClick}
    >
      <div className={styles.box}>
      <img src={src} className={`${styles.img} ${activeItem === navigateTo ? styles.invert : ''}`} alt='' /> {/* Apply invert class conditionally */}
        <div className={styles.Txt_Notif} ref={reff}>
          <p className={styles.text}>{text}</p>
          {nbr > 0 && (
            <div className={styles.notif}>
              <p className={styles.notifTxt}>{nbr}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default ListSidebar;
