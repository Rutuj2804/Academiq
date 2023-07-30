import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { loginUser } from "./actions";

const initialState: AuthState = {
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(s) {
            localStorage.removeItem(`${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`)
            s.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (s, a) => {
            localStorage.setItem(`${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`, a.payload)
            s.isAuthenticated = true
        })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
