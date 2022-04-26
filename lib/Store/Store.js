import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";

export const store = configureStore({
    reducer:{
        users: UserReducer
    }
})