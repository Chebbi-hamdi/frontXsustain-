import React from 'react';
import styles from './style.module.scss';
import { Div } from '../../../drawables/Divs/Div_Param';
import ClickAwayListener from '@mui/material/ClickAwayListener'; // Import ClickAwayListener from Material-UI
import { useNotifData } from '../../../functions/UseQuery/notifQuery';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/tokenSlice';
import NotifCard from '../../../drawables/notificationCard/notif';
import WELCOMEBEAR from '../../../assets/images/welcomBear.svg';
import LoaderSpin from '../../../drawables/loader/LoaderSpin';

const ModalNoitf = ({ setOpenModal }) => {
    const { user } = useSelector(getUser);

    const { data, error, isLoading } = useNotifData(user._id); // Fetch notifications using the custom hook

    if (isLoading)   return <LoaderSpin />;// Show loading message while fetching data
    if (error) return <p>Error: {error.message}</p>; // Show error message if there's an error

    // Sort the data array by createdAt property
    const sortedData = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className={styles.ModalNotifMain}>
            <div className={styles.center}>
                <div className={styles.Content}>
                    <div className={styles.flexstart}>
                        <p className={styles.helloTxt}>Hey {user.name}!</p>
                    </div>
                    {!data.length ? (
                        <img src={WELCOMEBEAR} alt='welcome' className={styles.WELCOMEBEAR} />
                    ) : (
                        sortedData.map(notification => (
                            <NotifCard seen={notification.seen} key={notification._id} notification={notification}></NotifCard>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalNoitf;
