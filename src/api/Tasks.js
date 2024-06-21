import { useDispatch } from 'react-redux';
import customAxios from '../axios/customAxios';
import { notifyError, notifySuccess } from '../drawables/containers/errorCont';
import { setUploadProgress } from '../store/uploadSlice';



export const GetTasks = async (OwnerId) => {
  try {
    const response = await customAxios.get(`tasks/GetByOwner/${OwnerId}`);
    const TasksData = response.data;
    console.log('response.data',response.data)
    return TasksData; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const GetTask = async (TaskId) => {
  try {
    if (!TaskId) {
      console.error('error');
    }
    const response = await customAxios.get(`tasks/getTask/${TaskId}`);
    const TasksData = response.data;
    return TasksData; // Return the entire team object
  } catch (error) {
    console.error(error);
    // Handle the error without returning
  }
};
export const ChangeTaskPosition = async (TaskId,Collection,position) => {
  try {



    const response = await customAxios.put(`tasks/updatePos/${TaskId}/${Collection}/${position}`);
    const TasksData = response.data;

    return TasksData; // Return the entire team object
  } catch (error) {
    throw error;
  }
};
export const ChangeTaskIndes = async (taskId,UserId, collectionSource, collectionDestination, sourceIndex, destinationIndex) => {
    try {
  

      const response = await customAxios.put(`tasks/updateInd/${taskId}/${UserId}/${collectionSource}/${collectionDestination}/${sourceIndex}/${destinationIndex}`);
      const updatedTask = response.data;
  
      return updatedTask; // Return the updated task object
    } catch (error) {
      throw error;
    }
  };
  
  export const DisplayComments = async (idTask) => {
    try {

      const response = await customAxios.get(`tasks/GetCommentByIdTask/${idTask}`);
      const Comments = response.data;
      return Comments; // Return the updat  ed task object
    } catch (error) {
      throw error;
    }
  };
  export const addComment = async (taskId,sender,commentText) => {
    try {

      const response = await customAxios.post(`tasks/addCommentToTask/${taskId}/${sender}/${commentText}`);
      const newComment = response.data;
  
      return newComment; // Return the updated task object
    } catch (error) {
      throw error;
    }
  };
  export const addTeammmate = async (TaskId,teammateIds,role) => {
    try {

      const response = await customAxios.put(`tasks/AddTeammate/${TaskId}/${teammateIds}`,{role});
      const newTeam = response.data;
  
      return newTeam; // Return the updated task object
    } catch (error) {
      throw error;
    }
  };



  export const uploadFile = async (TaskId, userId, file, dispatch) => {
    try {
      const formData = new FormData();
      formData.append('files', file); // Append the file to FormData
      
      const response = await customAxios.put(`tasks/addFileToComment/${TaskId}/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUploadProgress(percentCompleted));
        },
      });
  
      const newComment = response.data;
      return newComment; // Return the updated task object
    } catch (error) {
      throw error;
    }
  };
      
  export const editComment = async (commentId, file, editedCommentText) => {
    try {
      const formData = new FormData();
      formData.append('files', file); // Append the file to FormData
      formData.append('message', editedCommentText); // Append the edited comment text
    
      const response = await customAxios.put(`tasks/UpdateComment/${commentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      const newComment = response.data;
      return newComment; // Return the updated task object
    } catch (error) {
      throw error;
    }
  };  
  
  


  export const DelTeammateFromTask = async (TeammateId,Name,TaskId) => {
    try {
      const response = await customAxios.delete(`tasks/deleteTeammate/${TaskId}/${TeammateId}`);
      notifySuccess(`${Name} Deleted successful!`);
  
      return response.data; // Return the entire team object
    } catch (error) {
      notifyError(error)
      throw error;
    }
  };

  export const deleteComment = async (commentId) => {
    try {
      const response = await customAxios.delete(`tasks/deleteComment/${commentId}`);
      notifySuccess(`Comment Deleted successful!`);
  
      return response.data; // Return the entire team object
    } catch (error) {
      notifyError(error)
      throw error;
    }
  };  
  export const updateDesc = async (taskId,description) => {
    try {
      const response = await customAxios.put(`tasks/updateDesc/${taskId}`,{description});
      notifySuccess(`Description Updated Successfully!`);
      
      return response.data; // Return the entire team object
    } catch (error) {
      notifyError(error)
      throw error;
    }
  };  
  export const getFiles = async (taskId) => {
    try {
      const response = await customAxios.get(`tasks/getFiles/${taskId}`);
      return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  }
  ;
  export const addFile = async (taskId,file,dispatch) => {
    try {
      const formData = new FormData();
      formData.append('files', file); // Append the file to FormData

      const response = await customAxios.put(`tasks/AddFile/${taskId}`,formData,{
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUploadProgress(percentCompleted));
        },

      });
      notifySuccess('secess addin ile')
      return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  }  ;
  export const ChaneCover = async (TaskID,ImgId) => {
    try {

      const response = await customAxios.put(`tasks/changeCoverPhoto/${TaskID}/${ImgId}`);
      return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
  export const DelFile = async (TaskID,ImgId) => {
    try {

      const response = await customAxios.delete(`tasks/deletefile/${TaskID}/${ImgId}`);
      return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
  export const updateIndexTaskManagerTable = async (TaskID,Index) => {
    try {

      const response = await customAxios.put(`tasks/changeTaskManagerIndex/${TaskID}/${Index}`);
        return response.data; // Return the entire files object
    } catch (error) {
      notifyError(error);
      throw error;
    }
  };
  