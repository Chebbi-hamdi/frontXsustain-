// ProfilePicSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePic: null,
  profileUpdate: null, // Add profileUpdate state
};

const profilePicSlice = createSlice({
  name: 'profilePic',
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    clearProfilePic: (state) => {
      state.profilePic = null;
    },
    setProfileUpdate: (state, action) => { // Add setProfileUpdate action
      state.profileUpdate = action.payload;
    },
  },
});

export const { setProfilePic, clearProfilePic, setProfileUpdate } = profilePicSlice.actions; // Export setProfileUpdate action
export const getProfilePic = (state) => state.profile.profilePic;
export const getProfileUpdate = (state) => state.profile.profileUpdate; // Selector for profileUpdate
export default profilePicSlice.reducer;