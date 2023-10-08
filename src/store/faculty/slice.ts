import { createSlice } from "@reduxjs/toolkit";
import { FacultyState } from "./types";
import { deleteAllFaculty, deleteAllFacultyPermanent, deleteFaculty, deleteFacultyPermanent, getClassFaculty, getFacultyCountOnTabNumbers, getFacultyDetails, getUniversityFaculty, updateFacultyDetails } from "./actions";

const initialState: FacultyState = {
    faculties: [],
    faculty: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
    pagination: {
        currentDocuments: 0,
        currentPage: 0,
        totalDocuments: 0,
        totalPages: 0,
    }
};

export const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityFaculty.fulfilled, (s, a) => {
            s.faculties = a.payload.faculty
            s.pagination = a.payload.pagination
        });
        builder.addCase(getFacultyCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        });
        builder.addCase(getFacultyDetails.fulfilled, (s, a) => {
            s.faculty = a.payload
        });
        builder.addCase(getClassFaculty.fulfilled, (s, a) => {
            s.faculties = a.payload
        });
        builder.addCase(updateFacultyDetails.fulfilled, (s, a) => {
            s.faculty = a.payload
        })
        builder.addCase(deleteFaculty.fulfilled, (s, a) => {
            s.faculties = s.faculties.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = false
                    return t
                }
                return t
            })
            s.display.active = s.faculties.filter(t=>t.isActive === true).length
            s.display.deleted = s.display.all - s.display.active
        })
        builder.addCase(deleteFacultyPermanent.fulfilled, (s, a) => {
            s.faculties = s.faculties.filter(t=>!a.payload.includes(t._id))
            s.display.deleted = s.display.deleted - a.payload.length
            s.display.all = s.display.all - a.payload.length
        })
        builder.addCase(deleteAllFaculty.fulfilled, (s, a) => {
            s.faculties = s.faculties.map(t=>{
                t.isActive = false
                return t
            })
            s.display.active = 0
            s.display.deleted = s.display.all
        })
        builder.addCase(deleteAllFacultyPermanent.fulfilled, (s, a) => {
            s.faculties = []
            s.display.deleted = 0
            s.display.active = 0
            s.display.all = 0
        })
    }
});

// export const {} = facultySlice.actions;

export default facultySlice.reducer;
