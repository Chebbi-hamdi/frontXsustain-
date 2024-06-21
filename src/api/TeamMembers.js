import customAxios from '../axios/customAxios';

import { notifyError, notifySuccess } from '../drawables/containers/errorCont';


export const GetTeamMembers = async (leaderId) => {
  try {
    const response = await customAxios.get(`team/lead/${leaderId}`);
    return response.data; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const GetTeamImg = async (TaskId) => {
  try {
    const response = await customAxios.get(`tasks/GetMemImgs/${TaskId}`);

    return response.data; // Return the entire team object
  } catch (error) {
    throw error;
  }
};

export const DelTeammate = async (TeammateId,Name,TeamId) => {
  try {
    const response = await customAxios.delete(`team/DelTeammate/${TeammateId}/${TeamId}`);
    notifySuccess(`${Name} Deleted successful!`);

    return response.data; // Return the entire team object
  } catch (error) {
    notifyError(error)
    throw error;
  }
};
export const GetParticipantsInfos = async (taskId) => {
  try {
    const response = await customAxios.get(`tasks/getPartic/${taskId}`);
    return response.data; // Return the entire team object
  } catch (error) {
    notifyError(error)
    throw error;
  }
};


