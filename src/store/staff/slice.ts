import { createSlice } from "@reduxjs/toolkit";
import { StaffState } from "./types";
import { getStaffCountOnTabNumbers, getStaffDetails, getUniversityStaff, updateStaffDetails } from "./actions";

const initialState: StaffState = {
    staffs: [],
    staff: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    }
};

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStaff.fulfilled, (s, a) => {
            s.staffs = a.payload
        });
        builder.addCase(getStaffCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        });
        builder.addCase(getStaffDetails.fulfilled, (s, a) => {
            s.staff = a.payload
        });
        builder.addCase(updateStaffDetails.fulfilled, (s, a) => {
            s.staff = a.payload
        })
    }
});

// export const {} = staffSlice.actions;

export default staffSlice.reducer;
