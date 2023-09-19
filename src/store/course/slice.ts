import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "./types";
import { getCoursesGlobal, getMyCoursesCountOnTabNumbers } from "./actions";

const initialState: CourseState = {
    courses: [],
    course: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    }
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoursesGlobal.fulfilled, (s, a) => {
            s.courses = a.payload
        })
        builder.addCase(getMyCoursesCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        })
    }
});

// export const {} = courseSlice.actions;

export default courseSlice.reducer;
