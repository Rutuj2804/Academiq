import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "./types";

const initialState: LayoutState = {
    sidebar: true,
    settings: false,
    background: false,
    background_modules: false,
    search: false,
    popup: false,
    profile: false,
    notifications: false,
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<boolean>) => {
            if (action.payload) state.background = true;
            else state.background = false;
            state.settings = action.payload;
        },
        setSearch: (state, action: PayloadAction<boolean>) => {
            if (action.payload) state.background_modules = true;
            else state.background_modules = false;
            state.popup = action.payload
            state.search = action.payload;
        },
        setSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload;
        },
        setProfile: (state, action: PayloadAction<boolean>) => {
            state.profile = action.payload;
        },
        setNotifications: (state, action: PayloadAction<boolean>) => {
            state.notifications = action.payload;
        },
    },
});

export const { setSettings, setSidebar, setSearch, setProfile, setNotifications } = layoutSlice.actions;

export default layoutSlice.reducer;
