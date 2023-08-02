import { createSlice } from "@reduxjs/toolkit";
import { StudentState } from "./types";
import { getStudentDetails, getUniversityStudents } from "./actions";
import { updateFacultyDetails } from "../faculty/actions";

const initialState: StudentState = {
    students: [],
    student: {}
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStudents.fulfilled, (s, a) => {
            s.students = a.payload
        }),
        builder.addCase(getStudentDetails.fulfilled, (s, a) => {
            s.student = a.payload
        }),
        builder.addCase(updateFacultyDetails.fulfilled, (s, a) => {
            s.student = a.payload
        })
    }
});

// export const {} = studentSlice.actions;

export default studentSlice.reducer;
