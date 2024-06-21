// src/NotifSetting.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  NotifGlob: null,
  NotifMessagerie: null,
  NotifTaskk: null,
};

const NotifSetting = createSlice({
  name: 'NotifSetting',
  initialState,
  reducers: {
    setNotifGlob: (state, action) => {
      state.NotifGlob = action.payload;
    },
    setNotifMessagerie: (state, action) => {
      state.NotifMessagerie = action.payload;
    },
    setNotifTaskk: (state, action) => {
      state.NotifTaskk = action.payload;
    },
  },
});

export const { setNotifGlob, setNotifMessagerie, setNotifTaskk } = NotifSetting.actions;

export const getNotifGlob = (state) => state.NotifSetting.NotifGlob;
export const getNotifMessagerie = (state) => state.NotifSetting.NotifMessagerie;
export const getNotifTaskk = (state) => state.NotifSetting.NotifTaskk;

export default NotifSetting.reducer;
