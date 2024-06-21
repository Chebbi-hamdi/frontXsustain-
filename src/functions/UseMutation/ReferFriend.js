import { useMutation } from "@tanstack/react-query";
import { ReferFriendByEmail } from "../../api/ReferFriend";
import { notifyError, notifySuccess } from "../../drawables/containers/errorCont";

export const useSendNotifMutation = () => {
  
    return useMutation({
      mutationFn: async (email) => {
        const response = await ReferFriendByEmail(email);
        return response;
      },
      onSuccess:async  ( data) => {
        notifySuccess('Friend Refered Successfully')

      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        notifyError(errorMessage);
  }
    });
  }; 
