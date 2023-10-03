import { createSlice } from "@reduxjs/toolkit";
import { StudentState } from "./types";
import { createStudentDetails, deleteAllStudents, deleteAllStudentsPermanent, deleteStudents, deleteStudentsPermanent, getStudentDetails, getStudentsCountOnTabNumbers, getUniversityStudents } from "./actions";

const initialState: StudentState = {
    students: [],
    student: {},
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

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUniversityStudents.fulfilled, (s, a) => {
            s.students = a.payload.students
            s.pagination = a.payload.pagination
        });
        builder.addCase(getStudentDetails.fulfilled, (s, a) => {
            s.student = a.payload
        });
        builder.addCase(getStudentsCountOnTabNumbers.fulfilled, (s, a) => {
            s.display = a.payload
        });
        builder.addCase(createStudentDetails.fulfilled, (s, a) => {
            s.student = a.payload
        })
        builder.addCase(deleteStudents.fulfilled, (s, a) => {
            s.students = s.students.map(t=>{
                if(a.payload.includes(t._id)) {
                    t.isActive = false
                    return t
                }
                return t
            })
            s.display.active = s.students.filter(t=>t.isActive === true).length
            s.display.deleted = s.display.all - s.display.active
        })
        builder.addCase(deleteStudentsPermanent.fulfilled, (s, a) => {
            s.students = s.students.filter(t=>!a.payload.includes(t._id))
            s.display.deleted = s.display.deleted - a.payload.length
            s.display.all = s.display.all - a.payload.length
        })
        builder.addCase(deleteAllStudents.fulfilled, (s, a) => {
            s.students = s.students.map(t=>{
                t.isActive = false
                return t
            })
            s.display.active = 0
            s.display.deleted = s.display.all
        })
        builder.addCase(deleteAllStudentsPermanent.fulfilled, (s, a) => {
            s.students = []
            s.display.deleted = 0
            s.display.active = 0
            s.display.all = 0
        })
    }
});

// export const {} = studentSlice.actions;

export default studentSlice.reducer;
