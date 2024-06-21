// uploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progress: null,
};

const progressSlice = createSlice({
    name: 'UploadProgress',
    initialState,
    reducers: {
        setUploadProgress: (state, action) => {
            if (action.payload === 100) {
                state.progress = null; // Reset progress to 0 when it reaches 100
            } else {
                state.progress = action.payload;
            }
        },
    },
});

export const { setUploadProgress } = progressSlice.actions;
export const getProgressUpload = (state) => state.upload.progress;

export default progressSlice.reducer;
