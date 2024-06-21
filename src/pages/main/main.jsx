import React from 'react';
import styles from'./main.module.scss';
import LeftPart from '../../layouts/left_part/left_part';
import MainAuth from '../../components/auth/main-page-auth/auth';

const Main = () => {
  return (
    <div  className={styles.main_box}>
        <LeftPart/>
        <MainAuth />
    </div>
  );
}

export default Main;
