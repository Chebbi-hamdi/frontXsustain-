
import customAxios from '../axios/customAxios';
import { notifyError, notifySuccess } from '../drawables/containers/errorCont';


export const createDiscution = async (Id1, Id2) => {
    try {
      const response = await customAxios.post(`discussion/${Id1}`, { participant: Id2 });
      notifySuccess('Discussion created successfully');
      return response.data;
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };

  export const GetDiscutions = async (Id) => {
    try {
      const response = await customAxios.get(`discussion/get/${Id}`);
      return response.data;
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
  export const GetConversationById = async (Id) => {
    try {
      const response = await customAxios.get(`discussion/getConversationById/${Id}`);
      return [response.data];
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };

export const GetConversation = async (id) => {

    try {
        const response = await customAxios.get(`discussion/Conversation/${id}`);
        return response.data;
    } catch (error) {
        notifyError(error);
        throw error;
    }
};
export const GetConversationLoad = async (id,LoadNumber) => {
  try {
      const response = await customAxios.get(`discussion/Conversation/${id}/${LoadNumber}`);
      return response.data;
  } catch (error) {
      notifyError(error);
      throw error;
  }
};
  export const SendMsg = async (discussion,sender,contentMsg,recieverId) => {
    
    try {
      const response = await customAxios.post(`message/${discussion}/${sender}`, { content: contentMsg ,recieverId});
      return response.data;
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
