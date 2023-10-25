import { createSlice } from "@reduxjs/toolkit";
import { ActivityState } from "./types";
import { getActivitiesGlobal, getActivity, getActivityCountOnTabNumbers, getActivityPendingSubmissions, getActivitySubmissions, getClassActivity } from "./actions";

const initialState: ActivityState = {
    activities: [],
    activity: {},
    submissions: [],
    pending: [],
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
    pagination: {
        totalPages: 0,
        currentPage: 0,
        totalDocuments: 0,
        currentDocuments: 0,
    }
};

export const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getActivitiesGlobal.fulfilled, (s, a) => {
            s.activities = a.payload.activity
            s.pagination = a.payload.pagination
        })
        builder.addCase(getActivityCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        })
        builder.addCase(getClassActivity.fulfilled, (s, a) => {
            s.activities = a.payload
        })
        builder.addCase(getActivitySubmissions.fulfilled, (s, a) => {
            s.submissions = a.payload
        })
        builder.addCase(getActivityPendingSubmissions.fulfilled, (s, a) => {
            s.pending = a.payload
        })
        builder.addCase(getActivity.fulfilled, (s, a) => {
            s.activity = a.payload
        })
    }
});

// export const {} = activitySlice.actions;

export default activitySlice.reducer;
