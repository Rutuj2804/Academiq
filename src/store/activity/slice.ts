import { createSlice } from "@reduxjs/toolkit";
import { ActivityState } from "./types";
import { getActivitiesGlobal, getActivityCountOnTabNumbers } from "./actions";

const initialState: ActivityState = {
    activities: [],
    activity: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    }
};

export const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getActivitiesGlobal.fulfilled, (s, a) => {
            s.activities = a.payload
        })
        builder.addCase(getActivityCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        })
    }
});

// export const {} = activitySlice.actions;

export default activitySlice.reducer;
