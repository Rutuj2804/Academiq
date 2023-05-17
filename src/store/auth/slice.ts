import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
