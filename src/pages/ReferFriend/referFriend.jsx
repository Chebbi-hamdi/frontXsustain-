import React from 'react';
import SideBar from '../../layouts/side_bar/side_bar';
import NavvBar from '../../layouts/nav-Bar/navBar';
import styles from './style.module.scss';
import Profile from '../../components/auth/profile/profile';
import ReferFriendBody from '../../layouts/ReferFriend/ReferFriendBody';

const ReferFriend = () => {
  return (
    <div className={styles.container}>
      <SideBar className={styles.sidebar} />
      <div className={styles.content}>
        <NavvBar />
        <ReferFriendBody/>
      </div>
    </div>
  );
}

export default ReferFriend;
