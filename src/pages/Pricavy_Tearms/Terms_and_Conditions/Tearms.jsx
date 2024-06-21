import React from 'react';
import Tearms from '../../../layouts/Tearm_Privacy/Privacy/Privacy';
import styles from './style.module.scss';
import NavBar from '../../../layouts/Tearm_Privacy/navbar/navbar';

const Privacy_Policy = () => {
  return (
    <div className={styles.MainT}>
      <div className={styles.navbarWrapper}>
        <NavBar />
      </div>
      <div className={styles.tearmsWrapper}>
        <Tearms />
      </div>
    </div>
  );
};

export default Privacy_Policy;
