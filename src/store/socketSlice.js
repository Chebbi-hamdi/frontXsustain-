import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null,
    onlineUsers: null, // Initialize onlineUsers state
};
const socketSlice = createSlice({
name: 'counter',
initialState,
reducers: {
    setSocket: (state, action) => {
     state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
    }

}
});

export

const { setSocket ,setOnlineUsers} = socketSlice.actions;

export const getSocket = (state) =>  state.sockets.socket;
export const getOnlineUsers = (state) => state.sockets.onlineUsers;

export default socketSlice.reducer;