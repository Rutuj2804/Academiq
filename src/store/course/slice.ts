import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "./types";
import { deleteAllCourse, deleteAllCoursePermanent, deleteCourse, deleteCoursePermanent, getCourse, getCoursesGlobal, getMyCoursesCountOnTabNumbers, reactivateCourse } from "./actions";

const initialState: CourseState = {
    courses: [],
    course: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
    pagination: {
        totalDocuments: 0,
        totalPages: 0,
        currentPage: 0,
        currentDocuments: 0
    }
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoursesGlobal.fulfilled, (s, a) => {
            s.courses = a.payload.courses
            s.pagination = a.payload.pagination
        })
        builder.addCase(getMyCoursesCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        })
        builder.addCase(getCourse.fulfilled, (s, a) => {
            s.course = a.payload
        })
        builder.addCase(deleteCourse.fulfilled, (s, a) => {
            s.courses = s.courses.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = false
                    return t
                }
                return t
            })
            s.display.active = s.display.active - a.payload.length
            s.display.deleted = s.display.deleted + a.payload.length
        })
        builder.addCase(reactivateCourse.fulfilled, (s, a) => {
            s.courses = s.courses.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = true
                    return t
                }
                return t
            })
            s.display.active = s.display.active + a.payload.length
            s.display.deleted = s.display.deleted - a.payload.length
        })
        builder.addCase(deleteCoursePermanent.fulfilled, (s, a) => {
            s.courses = s.courses.filter(t=>!a.payload.includes(t._id))
            s.display.deleted = s.display.deleted - a.payload.length
            s.display.all = s.display.all - a.payload.length
        })
        builder.addCase(deleteAllCourse.fulfilled, (s, a) => {
            s.courses = s.courses.map(t=>{
                    t.isActive = false
                    return t
                })
            s.display.active = 0
            s.display.deleted = s.display.all
        })
        builder.addCase(deleteAllCoursePermanent.fulfilled, (s, a) => {
            s.courses = []
            s.display.deleted = 0
            s.display.active = 0
            s.display.all = 0
        })
    }
});

// export const {} = courseSlice.actions;

export default courseSlice.reducer;
