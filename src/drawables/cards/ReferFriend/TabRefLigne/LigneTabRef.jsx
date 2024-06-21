import React, { useState } from 'react'
import styles from './style.module.scss'
import { useSelector } from 'react-redux';
const LigneTabRef = ({status,InvitedF,timestamp}) => {
    let backgroundColor;
    let textColor;
    let m;
    const userData = useSelector(state => state.token.user);
    if (status === 'Successful') {
        m ='40'

        backgroundColor=' #3FE8BE';        textColor = 'black'; // White text color for Successful status
    } else if (status === 'In Progress') {
        backgroundColor = '#2468FF'; // Yellow color for In Progress status
        textColor = '#ffff'; // Black text color for In Progress status
        m ='0'

    } else {
        backgroundColor = '#dc3545'; // Red color for other statuses
        textColor = '#fff'; // White text color for other statuses
        m="0"
    }

  return (
    <div className={styles.MainTabLigneRef}>
        <div className={styles.leflexEnddd}>
            <div className={styles.invitedDiv}>
                <p className={styles.invited}>{InvitedF}</p>
            </div>
            <div className={styles.inviterDiv}>
                <p className={styles.inviter}>{userData.email.primary}</p>
                
            </div>
            
            <div className={styles.StatusDiv} >
                <div className={styles.statusButt}style={{ backgroundColor }}>
                    <p style={{ color: textColor }}className={styles.Status}>{status}</p>

                </div>
            
            </div>
                <div className={styles.PositionDiv}> 
                    <p className={styles.Position}>{timestamp}</p>
                
                </div>
                <div className={styles.EarningDiv}>
                    <p className={styles.Earning}>{m} credit</p>
            
                </div>
        </div>
    </div>
)
}

export default LigneTabRef
