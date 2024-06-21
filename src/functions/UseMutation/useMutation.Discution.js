import { useMutation } from '@tanstack/react-query';
import { SendMsg, createDiscution } from '../../api/Discution';
import { useSelector } from 'react-redux';
import { getSocket } from '../../store/socketSlice';
import { AddNotif } from '../../api/notif';



export const useAddDscMutation = () => {
    return useMutation({
      mutationFn: async ({id, email }) => { 
        return await createDiscution(id,email);
      },
    });
  };

 export const useSendNotifMutation = () => {
    const socket = useSelector(getSocket);
    return useMutation({
      mutationFn: async (dataNotif) => {
        const response = await AddNotif(dataNotif);
        return response;
      },
      onSuccess:async  ( data) => {

        if(data){
          socket.emit("messageNotification", data);
        }
      },
      onError: (error) => {
        console.error('message error:', error);
      }
    });
  }; 
  export const useSendMessageMutation = () => {
    const socket = useSelector(getSocket);
  
    return useMutation({
      mutationFn: async ({ idDsc, senderId, message, recieverId }) => {
        const response = await SendMsg(idDsc, senderId, message, recieverId);
        return response;
      },
      onSuccess: async (res, { idDsc, senderId, message, recieverId, recieverName }) => {
        const sender = senderId;
        const receiver = recieverId;
        if ({ message, idDsc, sender, receiver }) {
          // Ensure socket is defined before using it
          if (socket) {
            socket.emit("sendMessage", { message, idDsc, sender, receiver });
          } else {
            console.error("Socket is not initialized.");
          }
        }
      },
      onError: (error) => {
        console.error('message error:', error);
      }
    });
  };
    