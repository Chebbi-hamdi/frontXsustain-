//api/user.js
import { useDispatch } from 'react-redux';
import customAxios from '../axios/customAxios';
import { notifySuccess } from '../drawables/containers/errorCont';
import { setProfilePic } from '../store/profile';
import { setUploadProgress } from '../store/uploadSlice';
import { useSelector } from 'react-redux';
import { getUser } from '../store/tokenSlice';
export const LoginFn = async (email, password) => {
  try {
    const response = await customAxios.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId) => {
  try {
    const response =  await customAxios.get(`/users/getusebyId/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserByToken = async () => {
  try {
    const response =  await customAxios.get(`/users/getUser`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const Register = async (formData) => {
  try {

    const response =await customAxios.post('/auth/register',formData);
    return response.data;

  } catch (error) {
    throw error;
  }
};
export const RegisterToTeam = async (formData) => {
  try {
    const tokenteam = localStorage.getItem('tokenteam'); // Retrieve tokenteam from local storage
    if (!tokenteam) {
      throw new Error('tokenteam not found in local storage');
    }


    const response =await customAxios.post(`/auth/register/?tokenteam=${tokenteam}`,formData);
    return response.data;

  } catch (error) {
    throw error;
  }
};
export const RegisterRefered = async (formData) => {
  try {
    const tokenRef = localStorage.getItem('tokenRef'); // Retrieve tokenteam from local storage
    if (!tokenRef) {
      throw new Error('tokenteam not found in local storage');
    }


    const response =await customAxios.post(`/auth/register/?tokenRef=${tokenRef}`,formData);
    return response.data;

  } catch (error) {
    throw error;
  }
};


export const VerifyTokena = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storageù
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await customAxios.post('/users/verifyjwt', {}, {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      }
    });
    console.log('res',response.data)
    return (response.data);
  } catch (error) {
    throw error;
  }
};
export const UpdateProfilePic = async (file, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('image', file); // Append the file to FormData

    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await customAxios.put('/users/profilePic', formData, {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      },
    
    
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(setUploadProgress(percentCompleted));
        console.log('########################"',percentCompleted)
      },

    }
  );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await customAxios.patch('/users/updateProfile', formData, {
      headers: {
        Authorization: `Bearer ${token}` // Add the token in the Authorization header
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export const ForgotPassword = async (email) => {
  try {
    const response = await customAxios.post('/users/password-reset', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const PasswordReset = async (password, token) => {
  try {
    const response = await customAxios.post('/users/changeThePassword', { password, token });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const SendVerifEmail = async (user) => {
  try {
    console.log('-1')
    console.log('-0')
console.log(user)
    const email = user.user.email.primary
    console.log('00')
    const response = await customAxios.post('/users/requestEmailVerification', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
}