import { useMutation } from "@tanstack/react-query";
import { UpdateProfilePic } from "../../api/user";
import { useDispatch } from "react-redux";
import { setProfilePic ,setProfileUpdate } from "../../store/profile";
import { notifySuccess } from "../../drawables/containers/errorCont";
import { UpdateProfile } from "../../api/user";

export const useUpdateProfilePic = () => {
    const dispatch = useDispatch();
  
    return useMutation({
      mutationFn: async (file) => {
        const response = await UpdateProfilePic(file,dispatch);
        return response.imagePath;
      },
      onSuccess: (response) => {
        console.log(response);
         dispatch(setProfilePic(response));
        notifySuccess('Profile Picture Updated Successfully')

    },
      onError: (error) => {
        console.error('message error:', error);
      }
    });
};
export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await UpdateProfile(data);
      return response;
    },
    onSuccess: (response) => {
      dispatch(setProfileUpdate(response));
      notifySuccess('Profile Updated Successfully')
      console.log('response.data',response)

  },
    onError: (error) => {
      console.error('message error:', error);
    }
  });
};


export {  UpdateProfilePic, UpdateProfile};


/***/
 

