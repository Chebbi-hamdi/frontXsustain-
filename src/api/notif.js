import customAxios from '../axios/customAxios';



export const GetNotifs = async (userId) => {
  try {
    const response = await customAxios.get(`notif/getNotifs/${userId}`);
    const Notifs = response.data;
    return Notifs; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const AddNotif = async (data) => {
  try {
    const response = await customAxios.post(`notif/createNotif`,data);
    const Notifs = response.data;
    return Notifs; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const deleteNotif = async (notificationId) => {
  try {
    const response = await customAxios.get(`notif/deleteNotif/${notificationId}`);
    const Notifs = response.data;
    return Notifs; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const markNotifAsSeen = async (notificationId) => {
  try {
    const response = await customAxios.put(`notif/markSeen/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const markNotifAsSeenTask = async (TaskId,userId,object) => {
  try {
    const response = await customAxios.put(`notif/mark-notification-task-seen/${TaskId}/${userId}`,{object});
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DisableNotif = async (nature) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storageù

    const response = await customAxios.put(`notif/DesactiveNotif/${nature}`, {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AbleNotif = async (nature) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storageù

    const response = await customAxios.put(`notif/activeNotif/${nature}`, {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      }
    });
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
export const getUserInfo = async (userId) => {
  try {
    const response =  await customAxios.get(`/users/getusebyId/${userId}`);
    const dataNotification={
      NotifGlobale:response.data.notifGlobal,
      NotifTask:response.data.notifTask,
      NotifMessages:response.data.notifMessages
    }
    return dataNotification;
  } catch (error) {
    throw error;
  }
};
