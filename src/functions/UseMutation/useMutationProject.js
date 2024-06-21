import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { notifySuccess } from "../../drawables/containers/errorCont";
import { CreateProject, uploadFile } from "../../api/project";
import { setProject, setProjectPic } from "../../store/project";


export const useUploadFileMutation = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (file) => {
          const response = await uploadFile(file);
          console.log('response', response.imagePath);
          return response.imagePath;
        },
        onSuccess: (response) => {
          console.log(response);
           dispatch(setProjectPic(response));
          notifySuccess('Profile Picture Updated Successfully')
          console.log('response.data',response)
  
      },
        onError: (error) => {
          console.error('message error:', error);
        }
      });
};

export const useCreateProjectMutation = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (data) => {
          console.log('data', data);
          const response = await CreateProject(data);
          return response;
        },
        onSuccess: (response) => {
          console.log(response);
          dispatch(setProject(response));
          notifySuccess('Project Created Successfully')
          console.log('response.data',response)
        },
        onError: (error) => {
          console.error('message error:', error);
        }
      });


};