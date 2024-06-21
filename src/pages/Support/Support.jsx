import React from 'react';
import SideBar from '../../layouts/side_bar/side_bar';
import NavvBar from '../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import Support from '../../components/auth/Support/Support';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavvBar />
        <Support/>

      </div>
    </div>
  )
}

export default Dashboard
