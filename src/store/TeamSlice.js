// teamSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  team:null
};

const teamSlice = createSlice({
  name: 'Team', 
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    clearTeam: (state) => {
      state.team = null;
    },
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;
