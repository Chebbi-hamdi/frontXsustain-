import customAxios from '../axios/customAxios';

export const authG = () => {
  try {
    const response =  customAxios.post('/auth/google');
    console.log('**********************',response.data);
    return response.data;

  } catch (error) {
    throw error;
  }
};
