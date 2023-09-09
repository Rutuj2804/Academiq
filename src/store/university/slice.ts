import { createSlice } from "@reduxjs/toolkit";
import { UniversityState } from "./types";
import { addUniversity, getUniversity } from "./actions";

const initialState: UniversityState = {
    state: [],
    country: [],
    universities: [],
    university: {
        name: "",
        value: ""
    },
};

export const universitySlice = createSlice({
    name: "university",
    initialState,
    reducers: {
        setUniversity(s, a) {
            s.university = a.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUniversity.fulfilled, (s, a) => {
            s.universities = a.payload;
        });
        builder.addCase(addUniversity.fulfilled, (s, a) => {
            s.university = a.payload;
            s.universities = [ a.payload, ...s.universities ]
        });
    },
});

export const { setUniversity } = universitySlice.actions;

export default universitySlice.reducer;
