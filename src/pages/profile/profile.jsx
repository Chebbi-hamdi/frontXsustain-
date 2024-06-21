import React from 'react';
import SideBar from '../../layouts/side_bar/side_bar';
import NavvBar from '../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import Profile from '../../components/auth/profile/profile';

const Profile_Page = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavvBar />
        <Profile />
      </div>
    </div>
  );
}

export default Profile_Page;
