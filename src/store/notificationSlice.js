import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    seen: null,
    last20Seen: null
};
    

const NotificationSlice = createSlice({
    name: 'notificationn',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notifications = action.payload;
            state.last20Seen = checkLast20Seen(action.payload);
        },
        setSeen: (state, action) => {
            state.seen = action.payload;
        },
        setLast20Seen: (state, action) => {
            state.last20Seen = action.payload;
        }
    }
});

export const checkLast20Seen = (notifications) => {
    if (!notifications || notifications.length < 20) return false;
    for (let i = 0; i < 20; i++) {
        if (notifications[i].seen===false) {
            return false;
        }
    }
    return true;
};

export const { setNotification, setSeen, setLast20Seen } = NotificationSlice.actions;

export const getNotification = (state) => state.notification.notifications;
export const getSeen = (state) => state.notification.seen;
export const getLast20Seen = (state) => state.notification.last20Seen;

export default NotificationSlice.reducer;
