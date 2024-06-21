import React, { useEffect, useState } from 'react';
import styles from "./ConversationCard.module.scss";
import { Div } from '../../../Divs/Div_Param';
import Flex from '../../../Flex/flex';
import Connected from '../../../../assets/images/cncted.png'
import { useSelector } from 'react-redux';
import { getUser } from '../../../../store/tokenSlice';
import BubleImg from '../../../../drawables/bubleimg/bubleImg'
import { useNavigate } from 'react-router-dom';
import { getOnlineUsers } from '../../../../store/socketSlice';
import notifOn from '../../../../assets/images/Notifffffff.svg'

const ConversationCard = ({ seen: propSeen, partic, TimeMsg, LastMsg, NameContact, Imagee, refff, id, isActive, setActiveCard }) => {
  const { user } = useSelector(getUser);
  const navigate = useNavigate();
  const [seen, setSeen] = useState(propSeen); // Local state for seen
  const onlineUsers = useSelector(getOnlineUsers);

  const isConnected = onlineUsers?.some(u => u.userId === partic.participants[0]?._id);

  const HandleClick = () => {
    setActiveCard(id); // Set the active card
    navigate('/disc/' + id);
    setSeen(true); // Update the local state of seen
  };

  return (
    <Div
      width={"100%"}
      className={`${styles.Main} ${seen === false ? styles.seen : ''} ${isActive ? styles.Active : ''}`}
      onClick={HandleClick}
      reff={refff}
    >
      <Flex className={styles.leflexx} flex='center'>
        {Imagee ? (
          <img src={Imagee} alt='Contact' className={styles.ImgContact} />
        ) : (
          <div className={styles.divBuble}>
            <BubleImg className1={styles.span} className={styles.buble} user={partic.participants[0]} />
          </div>
        )}
        {isConnected ? (
          <img src={Connected} alt='' className={styles.Connected} />
        ) : (
          <img src={Connected} alt='' className={styles.disconected} />
        )}
        <Div reff={refff} className={styles.LastMsg}>
          <p className={styles.NameContact}>{NameContact} <span className={styles.TimeMsg}>{TimeMsg}</span></p>
          <p className={styles.LastMsgText}>{LastMsg}</p>
        </Div>
        <div className={styles.divNotif}>
          {!seen ? <img className={styles.notifOn} src={notifOn} alt='' /> : null}
        </div>
      </Flex>
    </Div>
  );
}

export default ConversationCard;
