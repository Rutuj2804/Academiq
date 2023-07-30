import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout() {
            localStorage.removeItem(`${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`)
        }
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
