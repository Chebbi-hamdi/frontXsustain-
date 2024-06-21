import customAxios from "../axios/customAxios";

export const ReferFriendByEmail = async (email) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    
      const response = await customAxios.put(`team/referFriend`,{email},{
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const GetLink = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    
      const response = await customAxios.put(`team/GetLinkRef`,{
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const GetReferedFriends = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    
      const response = await customAxios.put(`team/getFriendsRefered`,{
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const GetReferedFriendsTeam = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!token) {
          throw new Error('Token not found in local storage');
        }
    
      const response = await customAxios.put(`team/getFriendsReferedTeam`,{
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

//   return response.data;