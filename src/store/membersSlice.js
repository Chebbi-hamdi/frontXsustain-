// membersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setMembers } = membersSlice.actions;

export const selectMembers = (state) => state.members.members;

export default membersSlice.reducer;
