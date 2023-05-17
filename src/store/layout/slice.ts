import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "./types";

const initialState: LayoutState = {
    sidebar: false,
    settings: true,
    background: true,
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
    },
});

export const { setSettings } = layoutSlice.actions;

export default layoutSlice.reducer;
