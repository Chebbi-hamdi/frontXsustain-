// childSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChild: null,
};

const childSlice = createSlice({
  name: 'child',
  initialState,
  reducers: {
    selectChild(state, action) {
      state.selectedChild = action.payload;
    },
  },
});

export const { selectChild } = childSlice.actions;

export default childSlice.reducer;
