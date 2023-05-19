import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BreadcrumpsState } from "./types";

const initialState: BreadcrumpsState = {
    name: [],
    link: ""
};

export const breadcrumpsSlice = createSlice({
    name: "breadcrumps",
    initialState,
    reducers: {
        setBreadcrumps: (state, action: PayloadAction<BreadcrumpsState>) => {
            state.name = action.payload.name
            state.link = action.payload.link
        }
    },
});

export const { setBreadcrumps } = breadcrumpsSlice.actions;

export default breadcrumpsSlice.reducer;
