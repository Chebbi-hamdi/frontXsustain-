import { useSelector } from "react-redux";
import { getSocket } from "../../store/socketSlice";
import { useMutation } from "@tanstack/react-query";
import { AddNotif } from "../../api/notif";
import { addTeammmate } from "../../api/Tasks";
import { notifySuccess } from "../../drawables/containers/errorCont";

export const useSendNotifMutation = () => {
    const socket = useSelector(getSocket);
  
    return useMutation({
      mutationFn: async (dataNotif) => {
        const response = await AddNotif(dataNotif);
        return response;
      },
      onSuccess:async  ( data) => {
        socket.emit("messageNotification", data);


      },
      onError: (error) => {
        console.error('message error:', error);
      }
    });
  }; 
export const useAddTeammateMutation = () => {

  return useMutation({
    mutationFn: async ({ taskId, selectedEmailId, selectedRole }) => {
      const response = await addTeammmate(taskId, selectedEmailId, selectedRole);
      return response;
    },
    onSuccess:async  () => {
        notifySuccess('Teammate added successfully')
        
    },
    onError: (error) => {
      console.error('message error:', error);
    }
  });
};
  