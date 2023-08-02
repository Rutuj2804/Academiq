import { createSlice } from "@reduxjs/toolkit";
import { FacultyState } from "./types";
import { getFacultyDetails, getUniversityFaculty, updateFacultyDetails } from "./actions";

const initialState: FacultyState = {
    faculties: [],
    faculty: {}
};

export const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityFaculty.fulfilled, (s, a) => {
            s.faculties = a.payload
        }),
        builder.addCase(getFacultyDetails.fulfilled, (s, a) => {
            s.faculty = a.payload
        }),
        builder.addCase(updateFacultyDetails.fulfilled, (s, a) => {
            s.faculty = a.payload
        })
    }
});

// export const {} = facultySlice.actions;

export default facultySlice.reducer;
