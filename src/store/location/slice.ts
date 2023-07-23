import { createSlice } from "@reduxjs/toolkit";
import { LocationState } from "./types";
import { getCountries, getStates } from "./actions";

const initialState: LocationState = {
    state: [],
    country: []
};

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountries.fulfilled, (s, a) => {
            s.country = a.payload
        })
        builder.addCase(getStates.fulfilled, (s, a) => {
            s.state = a.payload
        })
    }
});

// export const {} = locationSlice.actions;

export default locationSlice.reducer;
