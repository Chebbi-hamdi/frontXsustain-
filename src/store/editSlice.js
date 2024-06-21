// editSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edit',
  initialState: {
    value: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.value = action.payload;
    },
    toggleEdit: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setEdit, toggleEdit } = editSlice.actions;

export const selectEdit = (state) => state.edit.value;

export default editSlice.reducer;
