// Child.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import { selectChild } from '../../../../store/childSlice';
import { useNavigate } from 'react-router-dom';

const Child = ({ src, text, nbr, navigateTo, refChild, refChildDisplay }) => {
  const dispatch = useDispatch();
  const selectedChild = useSelector((state) => state.child.selectedChild);
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(selectChild(navigateTo)); // Dispatch action to select the child item
    navigate(navigateTo)
  };

  return (
    <li
      className={`${styles.liii} ${selectedChild === navigateTo ? styles.selected : ''}`}
      onClick={handleClick}
      ref={refChild}
    >
      <div className={styles.box}>
        <img src={src} className={`${styles.img} ${selectedChild === navigateTo ? styles.selectedImg : ''}`} alt='' />
        <div className={`${styles.Txt_Notiff} ${selectedChild === navigateTo ? styles.selectedTxt_Notif : ''}`} ref={refChildDisplay}>
          <p className={`${styles.textt} ${selectedChild === navigateTo ? styles.selectedText : ''}`}>{text}</p>
          {nbr > 0 && (
            <div className={`${styles.notiff} ${selectedChild === navigateTo ? styles.selectedNotif : ''}`}>
              <p className={`${styles.notifTxt} ${selectedChild === navigateTo ? styles.selectedNotifTxt : ''}`}>{nbr}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Child;
