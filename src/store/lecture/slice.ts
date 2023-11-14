import { createSlice } from "@reduxjs/toolkit";
import { LocationState } from "./types";
import { getLectures } from "./actions";

const initialState: LocationState = {
    lectures: []
};

export const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLectures.fulfilled, (s, a) => {
            s.lectures = a.payload
        })
    }
});

// export const {} = lectureSlice.actions;

export default lectureSlice.reducer;
