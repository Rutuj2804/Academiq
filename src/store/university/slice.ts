import { createSlice } from "@reduxjs/toolkit";
import { UniversityState } from "./types";

const initialState: UniversityState = {
    state: [],
    country: []
};

export const universitySlice = createSlice({
    name: "university",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
});

// export const {} = universitySlice.actions;

export default universitySlice.reducer;
