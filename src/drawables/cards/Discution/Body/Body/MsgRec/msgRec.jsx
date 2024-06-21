import React, { useState } from 'react';
import styles from './style.module.scss';
import { Div } from '../../../../../Divs/Div_Param';
import Flex from '../../../../../Flex/flex';
import Connected from '../../../../../../assets/images/cncted.png';
import BubleImg from '../../../../../../drawables/bubleimg/bubleImg'

const MsgSent = ({ TimeMsg, LastMsg, NameContact, Imagee, classNamee, messageImage,contact,id }) => {
  const [fullscreen, setFullscreen] = useState(true);
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  return (
    <div id={id} width={"95%"} className={styles.Main || classNamee}>
      <Flex className={styles.leflexx} flex='center'>
        {Imagee ? (
                  <img src={Imagee} alt='Contact' className={styles.ImgContact} />
                ) : (
                  <div className={styles.divBuble}>

                    <BubleImg className1={styles.span} className={styles.buble} user={contact} />
                  </div>
                )}
        <Div className={styles.LastMsg}>
          <div className={styles.Name_Time}>
            <p className={styles.NameContact}>{NameContact} </p>
            <p className={styles.TimeMsg}>{TimeMsg}</p>
          </div>
         
          <div className={styles.MessageDiv}>
          
            <p className={styles.LastMsgText}>{LastMsg}</p>
          </div>
          {messageImage && (
              <img
                src={messageImage}
                alt="MessageImage"
                className={styles.MessageImage + (fullscreen ? ' ' + styles.FullscreenImage : '')}
                onClick={toggleFullscreen}
              />
          )}
        </Div>
      </Flex>
    </div>
  );
};

export default MsgSent;
