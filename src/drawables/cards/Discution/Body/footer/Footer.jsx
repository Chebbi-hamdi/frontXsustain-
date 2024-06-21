import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import styles from './style.module.scss';
import Send from "../../../../../assets/images/send.svg";
import Mic from "../../../../../assets/images/mic.svg";
import Attach from "../../../../../assets/images/attach.svg";
import Emoji from "../../../../../assets/images/emoji.svg";
import { Div } from '../../../../Divs/Div_Param';
import Flexx from '../../../../Flex/center/FlexCenter';
import { getSocket } from '../../../../../store/socketSlice';
import { useSendMessageMutation, useSendNotifMutation } from '../../../../../functions/UseMutation/useMutation.Discution';
import { getUser } from '../../../../../store/tokenSlice';

const Footer = ({ idDsc,recieverId }) => {
  const { user } = useSelector(getUser);
  const [pickerDisplayed, setPickerDisplayed] = useState(false);
  const [message, setMessage] = useState('');
  const sendMessageMutation = useSendMessageMutation(); 
  const sendNotifMutation = useSendNotifMutation(); 
  const userId=user._id
  const recieverName=user.name

  const handleSendMessage = () => {
    console.log('message',message)

    if (message.trim() !== '') {
      const senderId = user && user._id;
      sendMessageMutation.mutate(
        { idDsc, senderId, message, recieverId, recieverName },
        {
          onSuccess: () => {
            const data = {       
              sender: userId,
              receiver: recieverId,
              content: `${recieverName} Sent You A Message`,
              type: 'NewMessage',
              idDiscution: `${idDsc}`
            };
            sendNotifMutation.mutate(data, {
              onSuccess: () => {
              },
              onError: (error) => {
                console.error("Error sending notification:", error);
              }
            });
          },
          onError: (error) => {
            console.error("Error sending message:", error);
          }
        }
      );
  
      setMessage('');
    }
  };
  
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <div className={styles.MainCardF}>
      <Div width={"100%"}>
        <Flexx flex='center' className={styles.SecondCarfF}>
          <Div width={"90%"}>
            <div className={styles.blhy}>
              <input
                type='text'
                className={styles.ipnutbox}
                placeholder={'Type something...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              {pickerDisplayed &&
                <div className={styles.Picker}>
                  <Picker theme={"light"} data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              }
              <div className={styles.EmojiBox}>
                <img onClick={e => setPickerDisplayed(!pickerDisplayed)} src={Emoji} alt='' className={styles.Emoji}></img>
                {/*      
                <img src={Mic} alt='' className={styles.Emoji}></img>
                <img src={Attach} alt='' className={styles.Emoji}></img>
                */}
                <img onClick={handleSendMessage} src={Send} alt='' className={styles.Emoji}></img>
              </div>
            </div>
          </Div>
        </Flexx>
      </Div>
    </div>
  );
};

export default Footer;
