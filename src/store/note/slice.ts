import { createSlice } from "@reduxjs/toolkit";
import { NoteState } from "./types";
import { createNote, deleteNote, getNotes, updateNote } from "./actions";

const initialState: NoteState = {
    notes: [],
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNote.fulfilled, (s, a) => {
            s.notes = [...s.notes, a.payload]
        });
        builder.addCase(updateNote.fulfilled, (s, a) => {
            s.notes = s.notes.map(t=>{
                if(t._id === a.payload._id) return a.payload
                else return t
            })
        });
        builder.addCase(deleteNote.fulfilled, (s, a) => {
            s.notes = s.notes.filter(t=>t._id !== a.payload)
        });
        builder.addCase(getNotes.fulfilled, (s, a) => {
            s.notes = a.payload
        });
    }
});

// export const {} = roleSlice.actions;

export default roleSlice.reducer;
