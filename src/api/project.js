import customAxios from "../axios/customAxios";
import { notifyError } from "../drawables/containers/errorCont";







export const GetProject = async (Id) => {
    try {
      const response = await customAxios.get(`project/getByOwner/${Id}`);
      const TasksData = response.data;
      return TasksData; // Return the entire team object
    } catch (error) {
      throw error;
    }
  };
  export const updateIndexTaskManagerTableProject = async (TaskID,Index) => {
    try {

      const response = await customAxios.put(`project/changeTaskManagerIndex/${TaskID}/${Index}`);
        return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
  export const CreateProject = async (data) => {
    try {
      const dataSend = {
        owner: data.owner,
        name: data.projectName,
        imagePath: data.imagePath
      };
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      console.log('Creating project...', dataSend);
      
      const response = await customAxios.post(`project/`,{dataSend},{
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      });
      console.log('Project created successfully:', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const uploadFile = async (file, dispatch) => {
      try {
        const formData = new FormData();
        formData.append('image', file); // Append the file to FormData
    console.log('formData',formData);
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    
        const response = await customAxios.post('/project/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}` // Add the token in the Authorization header
          }
        });
    
        return response.data;
      } catch (error) {
        if (error.message === 'File upload failed') {
          // If the file upload failed, display an error message to the user
          alert('File upload failed: only image files are allowed');
        } else {
          // If another error occurred, display a generic error message
          alert('Please check your image type ');
        }  
    }
  
  }
  export const assignTaskToProject = async (projectId,taskId) => {
    try {
      const response = await customAxios.put(`project/${projectId}/${taskId}`);
      const TasksData = response.data;
      return TasksData; // Return the entire team object
    } catch (error) {
      throw error;
    }
  };
