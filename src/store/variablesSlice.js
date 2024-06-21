// tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabName:"overview",
    isCollapsed:false
};

const tabNameSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTabName: (state, action) => {
      state.tabName = action.payload;
    },
    setCollpased: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { setTabName,setCollpased } = tabNameSlice.actions;

export default tabNameSlice.reducer;
