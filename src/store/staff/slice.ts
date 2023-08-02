import { createSlice } from "@reduxjs/toolkit";
import { StaffState } from "./types";
import { getStaffDetails, getUniversityStaff, updateStaffDetails } from "./actions";

const initialState: StaffState = {
    staffs: [],
    staff: {}
};

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStaff.fulfilled, (s, a) => {
            s.staffs = a.payload
        }),
        builder.addCase(getStaffDetails.fulfilled, (s, a) => {
            s.staff = a.payload
        }),
        builder.addCase(updateStaffDetails.fulfilled, (s, a) => {
            s.staff = a.payload
        })
    }
});

// export const {} = staffSlice.actions;

export default staffSlice.reducer;
