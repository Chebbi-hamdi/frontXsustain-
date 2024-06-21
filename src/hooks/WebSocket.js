import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import audio from '../assets/audio.mp3';
import { getNotifGlob } from '../store/settingsSlice';
import { setOnlineUsers, setSocket } from '../store/socketSlice';
import { setLast20Seen, setNotification, setSeen } from '../store/notificationSlice';

const useWebSocket = (user, dataNotif, refetchNotif) => {
  const dispatch = useDispatch();
  const notifGlob = useSelector(getNotifGlob);

  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    // const newSocket = io(`http://192.168.11.113:3000`); // Change the URL to your server URL
    dispatch(setSocket(newSocket));

    if (user?._id) {
      newSocket.emit('newUser', user?._id);
      newSocket.on('onlineUsers', (users) => {
        dispatch(setOnlineUsers(users));
      });

      const handleNotification = (data) => {
        dispatch(setNotification(dataNotif));
        refetchNotif();
        alert(`Message notification received: ${data.content}`);
        dispatch(setSeen(false));
        dispatch(setLast20Seen(false));
        playAudio();
      };

      if (user?.notifGlobal || notifGlob) {
        newSocket.on("sendNotification", handleNotification);
      }
    }

    return () => newSocket.close();
  }, []);

  const playAudio = () => {
    if (!document.hidden) {
      const audioToPlay = new Audio(audio);
      audioToPlay.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

export default useWebSocket;
