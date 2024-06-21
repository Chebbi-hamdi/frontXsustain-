import React from 'react';
import SideBar from '../../../layouts/side_bar/side_bar';
import NavvBar from '../../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import {Taskmanagerstatuss} from '../../../components/auth/TaskManager/status/Status';

const Status = () => {
  return (
    <div className={styles.container}>
    <SideBar className={styles.sidebar} />
    <div className={styles.content}>
      <NavvBar />
      <Taskmanagerstatuss/>
    </div>
  </div>
  )
}

export default Status
