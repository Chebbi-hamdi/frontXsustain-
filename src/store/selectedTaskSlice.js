// selectedTaskSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const selectedTaskSlice = createSlice({
  name: 'selectedTask',
  initialState: {
    selectedTaskId: null,
    selectedDroppableId: null,
  },
  reducers: {
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setSelectedDroppableId: (state, action) => {
      state.selectedDroppableId = action.payload;
    },
  },
});

export const { setSelectedTaskId, setSelectedDroppableId } = selectedTaskSlice.actions;

export const selectSelectedTaskId = (state) => state.selectedTask.selectedTaskId;
export const selectSelectedDroppableId = (state) => state.selectedTask.selectedDroppableId;

export default selectedTaskSlice.reducer;
