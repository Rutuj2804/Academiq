import { createSlice } from "@reduxjs/toolkit";
import { ClassState } from "./types";
import { getUniversityClass, getClass, createClass, getMyClassesCountOnTabNumbers } from "./actions";

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
    }
});

// export const {} = classSlice.actions;

export default classSlice.reducer;
