import React from 'react';
import SmallBear from "../../assets/images/smallbear.svg";
import { P14 } from '../../drawables/txt/Txt';
import styles from './style.module.scss';

const Footer = () => {
  return (
    <div className={styles.last0}>
      <div className={styles.last1}>
        <p className={styles.txt} >@ 2024, Made by <span className={styles.Span}> XSUSTAIN.</span> <img className={styles.imgSmall} src={SmallBear} alt="" />  for New Future
</p>
        
      </div>
    </div>
  );
}

export default Footer;
