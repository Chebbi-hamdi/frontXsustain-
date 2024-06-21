import React from 'react';
import SideBar from '../../../layouts/side_bar/side_bar';
import NavvBar from '../../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import TaskManager from '../../../components/auth/TaskManager/manager/Taskmanager';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavvBar />
        <TaskManager />
      </div>
    </div>
  )
}

export default Dashboard
