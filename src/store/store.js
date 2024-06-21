// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import tokenReducer from './tokenSlice';
import varReducer from './variablesSlice';
import teamReducer from './TeamSlice';
import taskReducer from './taskslice'; // Import the task slice
import socketReducer from './socketSlice'; // Import the task slice
import NotificationReducer from './notificationSlice'; // Import the task slice
import ProfilePicSlice from './profile'; // Import the task slice
import selectedTaskReducer from './selectedTaskSlice'; // Import the selectedTaskSlice reducer
import editReducer from './editSlice';
import ProgresSlice from './uploadSlice';
import projectReducer from './project';
import NotifSettingReducer from './settingsSlice';
import sidebarReducer from './sidebarSlice ';
import childReducer from './childSlice';
import Project_Task from './Project-Task-Slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], 
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

const store = configureStore({
  
  reducer: {
    token: persistedReducer,
    variables: varReducer,
    Team: teamReducer,
    tasks: taskReducer, // Add the task slice to the reducer
    sockets: socketReducer,
    profile: ProfilePicSlice,
    notification: NotificationReducer,// Add the task slice to the reducer
    selectedTask: selectedTaskReducer, // Add the selectedTaskSlice reducer
    edit: editReducer,
    upload: ProgresSlice,
    project: projectReducer,
    NotifSetting: NotifSettingReducer,
    sidebar: sidebarReducer,
    child: childReducer,
    Project_Task: Project_Task, // Ensure correct naming here

    
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload', 'register',"rehydrate"],
        // Ignore these paths in the state
        ignoredPaths: ['sockets.socket','register','rehydrate'],
      },
    }),
});

export const persistor = persistStore(store); 
export default store;
