import { useSelector } from "react-redux";
import { getSocket } from "../../store/socketSlice";
import { useMutation } from "@tanstack/react-query";
import { AddNotif } from "../../api/notif";
import { notifyError, notifySuccess } from "../../drawables/containers/errorCont";
import { ChangeTaskPosition, GetTask } from "../../api/Tasks";
import { useTeammateInfo } from "../UseQuery/TeamData";
import { selectSelectedDroppableId, selectSelectedTaskId } from "../../store/selectedTaskSlice";
import { getUser } from "../../store/tokenSlice";

export const useSendNotifMutationTask = () => {
  const socket = useSelector(getSocket);
  const { user } = useSelector(getUser);

  return useMutation({
    mutationFn: async (dataNotif) => {
      const promises = dataNotif.receivers.map(async (receiverId) => {
        const data1 = {       
          sender: dataNotif.sender,
          receiver: receiverId.id._id,
          content: `${dataNotif.content} `,
          type: 'NewTask',
          idTask:dataNotif.taskId
        };
        try {
          const response = await AddNotif(data1);
          return response;
        } catch (error) {
          notifyError('Error sending notification'); // Notify error if there's an error
          return error;
        }
      });

      return Promise.all(promises);
    },
    onSuccess:async  (dataNotif ) => {
        dataNotif.forEach((receiverId) => {
            const data1 = {       
              sender: user._id,
              receiver: receiverId.receiver,
              content: receiverId.content,
              type: 'NewTask'
            };
            const content = data1.content;
            const sender = data1.sender;
            const receiver = data1.receiver;
            if(receiver.notifTask){

              socket.emit("messageNotification", { content, sender, receiver });
            }
          });
          },
      onError: (error) => {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  });
};

export const useSendNotifMutationSocket = () => {
  const socket = useSelector(getSocket);
  const selectedTaskId = useSelector(selectSelectedTaskId);
  const selectedDroppableId = useSelector(selectSelectedDroppableId);
  const userData = useSelector(state => state.token.user);
return useMutation({
  mutationFn: async (dataNotif) => {
        const task =await GetTask(selectedTaskId)

        const promises = dataNotif.receivers.map(async (receiverId) => {
        const data1 = {       
          sender: dataNotif.sender,
          receiver: receiverId.id._id,
          content: `${userData.name} moved ${task[0].title} to ${selectedDroppableId}  `,
          type: 'NewTask',idTask:`${dataNotif.taskId}`
        };
        try {
          const response = await AddNotif(data1);
          return response;
        } catch (error) {
          notifyError('Error sending notification'); // Notify error if there's an error
          return error;
        }
      });

      return Promise.all(promises);

    },
    onSuccess:async (dataNotif) => {        
      const task =await GetTask(selectedTaskId)

    dataNotif.forEach((receiverId) => {
      const data1 = {       
        sender: userData._id,
        receiver: receiverId.receiver,
        content: `${userData.name} moved ${task[0].title} to ${selectedDroppableId} `,
        type: 'NewTask'
      };
      const content = data1.content;
      const sender = data1.sender;
      const receiver = data1.receiver;
      socket.emit("messageNotification", { content, sender, receiver });
    });
    },

    onError: (error) => {
      console.error('Error sending notification:', error);
    }
  });
};

export const useMutationTaskCollection = () => {

  return useMutation({
    mutationFn: async (data) => {
      const TaskId=data.taskId
      const Collection=data.newCollection
      const position=data.position

        try {
          const response = await ChangeTaskPosition(TaskId,Collection,position);
          return response;
        } catch (error) {
          notifyError('Error sending notification'); // Notify error if there's an error
          return error;
        }

    },
  });
};