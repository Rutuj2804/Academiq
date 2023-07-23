import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: 0
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        updateLoading(s, a){
            s.isLoading += a.payload
        }
    },
});

export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
