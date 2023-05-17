import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "./types";

const initialState: LayoutState = {
    sidebar: true,
    settings: false,
    background: false,
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
        setSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload;
        },
    },
});

export const { setSettings, setSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
