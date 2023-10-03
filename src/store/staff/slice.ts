import { createSlice } from "@reduxjs/toolkit";
import { StaffState } from "./types";
import { deleteAllStaff, deleteAllStaffPermanent, deleteStaff, deleteStaffPermanent, getStaffCountOnTabNumbers, getStaffDetails, getUniversityStaff, updateStaffDetails } from "./actions";

const initialState: StaffState = {
    staffs: [],
    staff: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
    pagination: {
        currentDocuments: 0,
        currentPage: 0,
        totalDocuments: 0,
        totalPages: 0
    }
};

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStaff.fulfilled, (s, a) => {
            s.staffs = a.payload.staff
            s.pagination = a.payload.pagination
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
        builder.addCase(deleteStaff.fulfilled, (s, a) => {
            s.staffs = s.staffs.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = false
                    return t
                }
                return t
            })
            s.display.active = s.display.active - a.payload.length
            s.display.deleted = s.display.deleted + a.payload.length
        })
        builder.addCase(deleteStaffPermanent.fulfilled, (s, a) => {
            s.staffs = s.staffs.filter(t=>!a.payload.includes(t._id))
            s.display.deleted = s.display.deleted - a.payload.length
            s.display.all = s.display.all - a.payload.length
        })
        builder.addCase(deleteAllStaff.fulfilled, (s, a) => {
            s.staffs = s.staffs.map(t=>{
                t.isActive = false
                return t
            })
            s.display.active = 0
            s.display.deleted = s.display.all
        })
        builder.addCase(deleteAllStaffPermanent.fulfilled, (s, a) => {
            s.staffs = []
            s.display.deleted = 0
            s.display.active = 0
            s.display.all = 0
        })
    }
});

// export const {} = staffSlice.actions;

export default staffSlice.reducer;
