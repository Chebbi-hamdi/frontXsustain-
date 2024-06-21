import React, { useState } from 'react';
import styles from './style.module.scss';
import { Div } from '../../../../../Divs/Div_Param';
import Flex from '../../../../../Flex/flex';
import Connected from '../../../../../../assets/images/cncted.png';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../../../store/tokenSlice';
import BubleImg from '../../../../../../drawables/bubleimg/bubleImg'

const MsgSent = ({ TimeMsg, LastMsg, NameContact, Imagee, classNamee, messageImage ,id}) => {
  const [fullscreen, setFullscreen] = useState(true);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  const { user } = useSelector(getUser);
  return (
    <div id={id} width={'99%'} className={styles.Main || classNamee}>
      <Flex className={styles.leflexx} flex="space-between">
        <Div className={styles.LastMsg}>
          <div className={styles.txtCont}>
            <div className={styles.Name_Time}>
              <p className={styles.TimeMsg}>{TimeMsg}</p>
              <p className={styles.NameContact}>{NameContact}</p>
            </div>
             <div className={styles.lastflex}>
                <div>
                  <p className={styles.LastMsgText}>{LastMsg}</p>
                </div>
                  
                {messageImage && (
                  <div className={styles.MessageImageDiv}>
                    <img
                      src={messageImage}
                      alt="MessageImage"
                      className={styles.MessageImage + (fullscreen ? ' ' + styles.FullscreenImage : '')}
                      onClick={toggleFullscreen}
                    />
                  </div>
                )}
              </div>
          </div>
       
        </Div>
        {Imagee ? (
                  <img src={Imagee} alt='Contact' className={styles.ImgContact} />
                ) : (
                  <div className={styles.divBuble}>
                    <BubleImg className1={styles.span} className={styles.buble} user={user} />
                  </div>
                )}      
      </Flex>
    </div>
  );
};

export default MsgSent;
