import { useMutation } from "@tanstack/react-query";
import { ReferFriendByEmail } from "../../api/ReferFriend";
import { notifyError, notifySuccess } from "../../drawables/containers/errorCont";
import { SendVerifEmail } from "../../api/user";
import { useNavigate } from "react-router-dom";

export const useSendEmailVerif = () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: async (user) => {
        const response = await SendVerifEmail(user);
        return response;
      },
      onSuccess:async  ( data) => {
        notifySuccess('Email Sended Succ , Please check your email')
        localStorage.removeItem('token') 
        navigate('/sign_in');

      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        notifyError(errorMessage);
        console.log(error)
  }
    });
  }; 

  export const useReferFriendByEmail = () => {
    return useMutation({
      mutationFn: async (email) => {
        const response = await ReferFriendByEmail(email);
        return response;
      },
      onSuccess: (response) => {
        notifySuccess('Email Sended Succ')
        console.log(response)
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        notifyError(errorMessage);
        console.log(error)
    }
    });
  };

export {  SendVerifEmail, ReferFriendByEmail};