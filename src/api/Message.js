import customAxios from '../axios/customAxios';


export const MarkAsRead = async (Id) => {
  if (!Id){
    return;
  }
    try {
      const response = await customAxios.patch(`message/${Id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
