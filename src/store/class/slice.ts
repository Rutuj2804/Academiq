import { createSlice } from "@reduxjs/toolkit";
import { ClassState } from "./types";
import { getUniversityClass, getClass, createClass, getMyClassesCountOnTabNumbers, deleteClass, reactivateClass, deleteClassPermanent } from "./actions";

const initialState: ClassState = {
    classes: [],
    class: {},
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

export const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityClass.fulfilled, (s, a) => {
            s.classes = a.payload.classes
            s.pagination = a.payload.pagination
        })
        builder.addCase(getMyClassesCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        })
        builder.addCase(getClass.fulfilled, (s, a) => {
            s.class = a.payload
        })
        builder.addCase(createClass.fulfilled, (s, a) => {
            s.class = a.payload
        })
        builder.addCase(deleteClass.fulfilled, (s, a) => {
            s.classes = s.classes.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = false
                    return t
                }
                return t
            })
            s.display.active = s.display.active - a.payload.length
            s.display.deleted = s.display.deleted + a.payload.length
        })
        builder.addCase(reactivateClass.fulfilled, (s, a) => {
            s.classes = s.classes.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = true
                    return t
                }
                return t
            })
            s.display.active = s.display.active + a.payload.length
            s.display.deleted = s.display.deleted - a.payload.length
        })
        builder.addCase(deleteClassPermanent.fulfilled, (s, a) => {
            s.classes = s.classes.filter(t=>!a.payload.includes(t._id))
            s.display.deleted = s.display.deleted - a.payload.length
            s.display.all = s.display.all - a.payload.length
        })
    }
});

// export const {} = classSlice.actions;

export default classSlice.reducer;
