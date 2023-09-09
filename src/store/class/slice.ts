import { createSlice } from "@reduxjs/toolkit";
import { ClassState } from "./types";
import { getUniversityClass, getClass, createClass } from "./actions";

const initialState: ClassState = {
    classes: [],
    class: {
        _id :"",
        name: "",
        description: "",
        createdBy: "",
        isActive: true
    }
};

export const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityClass.fulfilled, (s, a) => {
            s.classes = a.payload
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
