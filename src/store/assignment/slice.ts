import { createSlice } from "@reduxjs/toolkit";
import { AssignmentState } from "./types";
import { getCourseAssignments, getFacultyAssignments, removeFacultyFromClass } from "./actions";

const initialState: AssignmentState = {
    assignments: []
};

export const assignmentSlice = createSlice({
    name: "assignment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFacultyAssignments.fulfilled, (s, a) => {
            s.assignments = a.payload
        })
        builder.addCase(getCourseAssignments.fulfilled, (s, a) => {
            s.assignments = a.payload
        })
        // builder.addCase(addFacultyToClass.fulfilled, (s, a) => {
        //     s.assignments = [...s.assignments, a.payload]
        // })
        builder.addCase(removeFacultyFromClass.fulfilled, (s, a) => {
            s.assignments = s.assignments.filter(t=>t._id !== a.payload._id)
        })
    }
});

// export const {} = assignmentSlice.actions;

export default assignmentSlice.reducer;
