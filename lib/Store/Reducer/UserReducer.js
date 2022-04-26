import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: []
};

const UserReducer = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userInfo = (action.payload)
        },
        removeUser: (state, action) => {
            state.userInfo = state.userInfo.filter((item) => item.id !== action.payload);
        }
    }
})

export default UserReducer.reducer
export const { saveUser, removeUser } = UserReducer.actions
export const selectUserList = state => state.users.userInfo
