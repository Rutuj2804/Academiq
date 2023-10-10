import { createSlice } from "@reduxjs/toolkit";
import { AssignmentState } from "./types";
import { getFacultyAssignments } from "./actions";

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
    }
});

// export const {} = assignmentSlice.actions;

export default assignmentSlice.reducer;
