import React from 'react';
import SideBar from '../../layouts/side_bar/side_bar';
import NavvBar from '../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import Dashboardd from '../../components/auth/Dashboard/Dashboard';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavvBar />
        <Dashboardd />
      </div>
    </div>
  )
}

export default Dashboard
