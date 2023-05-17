import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { SettingsState, layoutTheme, sidebarLayout } from "./types";

const initialState: SettingsState = {
    sidebar: sidebarLayout[0],
    theme: layoutTheme[0]
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeSidebar: (state, action: PayloadAction<string>) => {
            state.sidebar = action.payload
        },
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        }
    },
});

export const { changeSidebar, changeTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
