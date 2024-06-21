import { useMutation } from '@tanstack/react-query';
import { LoginFn, Register,getUserInfo,RegisterToTeam, RegisterRefered, ForgotPassword, PasswordReset } from '../../api/user';
import { setUser } from '../../store/tokenSlice';
import { useDispatch } from 'react-redux';
import { notifyError, notifySuccess } from '../../drawables/containers/errorCont';

// Define a function to handle error, display notification, and reload the page after a delay
const handleErrorAndReloadWithDelay = (errorMessage, delayInMilliseconds) => {
  notifyError(errorMessage); // Display error notification
  setTimeout(() => {
    window.location.reload(); // Reload the page after the specified delay
  }, delayInMilliseconds);
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ email, password }) => { 
      return await LoginFn(email, password);
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      dispatch(setUser(res.user));
      // Display success notification
      notifySuccess('Login successful!');
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Display error notification and reload the page after a delay of 2000 milliseconds (2 seconds)
      handleErrorAndReloadWithDelay('Login failed. Please try again.', 2000);
    }
  });
};

export const useRegisterMutation = (handleAlertDismiss, navigateToSignIn) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData) => { 
      return await Register(formData);
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      notifySuccess('Registration successful!');
      dispatch(setUser(res.user));
      navigateToSignIn(); // Navigate to sign-in page
    },
    onError: (error) => {
      console.error('Registration error:', error);
      // Display error notification and reload the page after a delay of 3000 milliseconds (3 seconds)
      if (error.response && error.response.data && error.response.data.message) {
        handleErrorAndReloadWithDelay(`Registration failed: ${error.response.data.message}`, 3000);
      } else {
        handleErrorAndReloadWithDelay('Registration failed. Please try again.', 3000);
        handleAlertDismiss(); // Reset mutationError state to null
      }
    }
  });
};
export const useRegisterTeamMutation = (handleAlertDismiss, navigateToSignIn) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData) => { 
      return await RegisterToTeam(formData);
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      notifySuccess('Registration successful!');
      dispatch(setUser(res.user));
      navigateToSignIn(); // Navigate to sign-in page
    },
    onError: (error) => {
      console.error('Registration error:', error);
      // Display error notification and reload the page after a delay of 3000 milliseconds (3 seconds)
      if (error.response && error.response.data && error.response.data.message) {
        handleErrorAndReloadWithDelay(`Registration failed: ${error.response.data.message}`, 3000);
      } else {
        handleErrorAndReloadWithDelay('Registration failed. Please try again.', 3000);
        handleAlertDismiss(); // Reset mutationError state to null
      }
    }
  });
};
export const useRegisterRefMutation = (handleAlertDismiss, navigateToSignIn) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData) => { 
      return await RegisterRefered(formData);
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      notifySuccess('Registration successful!');
      dispatch(setUser(res.user));
      navigateToSignIn(); // Navigate to sign-in page
    },
    onError: (error) => {
      console.error('Registration error:', error);
      // Display error notification and reload the page after a delay of 3000 milliseconds (3 seconds)
      if (error.response && error.response.data && error.response.data.message) {
        handleErrorAndReloadWithDelay(`Registration failed: ${error.response.data.message}`, 3000);
      } else {
        handleErrorAndReloadWithDelay('Registration failed. Please try again.', 3000);
        handleAlertDismiss(); // Reset mutationError state to null
      }
    }
  });
};

export const Getfromtoken = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: async () => { 
      return await getUserInfo();
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      dispatch(setUser(res.user)); // Dispatch action to update user information in Redux store
      // Display success notification
      notifySuccess('Login successful!');
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Display error notification and reload the page after a delay of 2000 milliseconds (2 seconds)
      handleErrorAndReloadWithDelay('Login failed. Please try again.', 2000);
    }
  });

  return {
    mutate: mutation.mutate
  };
};
export const useFetchUserInfo = () => {
  const dispatch = useDispatch();

  const { mutate: mutateGetUserInfo } = useMutation({
    mutationFn: async () => { 
      return await getUserInfo();
    },
    onSuccess: async (res) => { 
      localStorage.setItem('token', res.token);
      dispatch(setUser(res.user));
      // Display success notification
      notifySuccess('User info retrieved successfully!');
    },
    onError: (error) => {
      console.error('User info retrieval error:', error);
      // Display error notification
      notifyError('Failed to retrieve user info.');
    }
  });

  return { mutateGetUserInfo };
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (email) => { 
      console.log("Forgot password email:", email);
      return await ForgotPassword(email);
    },
    onSuccess: async (res) => { 
      notifySuccess('Password reset link sent successfully!');
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
      notifyError('Failed to send password reset link.');
    }
  });
}


export const usePasswordResetMutation = () => {
  return useMutation({
    mutationFn: async (formData) => { 
      console.log("Password reset formData:", formData);
      return await PasswordReset(formData);
    },
    onSuccess: async (res) => { 
      notifySuccess('Password reset successful!');
    },
    onError: (error) => {
      console.error('Password reset error:', error);
      notifyError('Failed to reset password.');
    }
  });
}
