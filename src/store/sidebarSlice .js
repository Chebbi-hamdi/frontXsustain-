import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeItem: null,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveItem(state, action) {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = sidebarSlice.actions;

export const selectActiveItem = (state) => state.sidebar.activeItem;

export default sidebarSlice.reducer;
