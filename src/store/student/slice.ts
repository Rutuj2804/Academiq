import { createSlice } from "@reduxjs/toolkit";
import { StudentState } from "./types";
import { createStudentDetails, getStudentDetails, getStudentsCountOnTabNumbers, getUniversityStudents } from "./actions";
import { updateFacultyDetails } from "../faculty/actions";

const initialState: StudentState = {
    students: [],
    student: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    }
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStudents.fulfilled, (s, a) => {
            s.students = a.payload
        });
        builder.addCase(getStudentDetails.fulfilled, (s, a) => {
            s.student = a.payload
        });
        builder.addCase(getStudentsCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        });
        builder.addCase(updateFacultyDetails.fulfilled, (s, a) => {
            s.student = a.payload
        });
        builder.addCase(createStudentDetails.fulfilled, (s, a) => {
            s.student = a.payload
        })
    }
});

// export const {} = studentSlice.actions;

export default studentSlice.reducer;
