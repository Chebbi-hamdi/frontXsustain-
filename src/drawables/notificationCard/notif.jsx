import React, { useState } from 'react';
import styles from './style.module.scss';
import Task from '../../assets/images/task-square.svg';
import Msg from '../../assets/images/message-square.svg';
import notifOn from '../../assets/images/notifOn.svg';
import { markNotifAsSeen } from '../../api/notif';

const NotifCard = ({ notification, seen }) => {
  const createdAt = new Date(notification.createdAt);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = createdAt.toLocaleString('en-US', options);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = async () => {
    if (!seen && !isHovered) {
      try {
        await markNotifAsSeen(notification._id);
        setIsHovered(true);
      } catch (error) {
        console.error('Error marking notification as seen:', error);
      }
    }
  };

  return (
    <div className={styles.notifDiv} key={notification._id} onMouseEnter={handleMouseEnter}>
      {notification.type === "NewMessage" ? (
        <img src={Msg} alt='message' className={styles.img} />
      ) : (
        <img src={Task} alt='task' className={styles.img} />
      )}
      <div className={styles.divTxt}>

      <p className={styles.txt}>
        <span className={styles.blue}>{notification.content.split(' ')[0]}</span>{" "}
        {notification.content.substring(notification.content.indexOf(' ') + 1)}!
      </p>
      <p className={styles.time}>{formattedDate}</p>
      </div>
      {!seen && !isHovered && <img src={notifOn} alt="notification seen" />}
    </div>  
  );
};

export default NotifCard;
