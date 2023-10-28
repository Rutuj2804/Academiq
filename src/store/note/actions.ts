import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { getToken } from "../../utils/helpers";
import { CreateNoteRequest, DeleteNoteRequest, GetNoteRequest, UpdateNoteRequest } from "./types";

export const createNote = createAsyncThunk(
    "createNote/Notes",
    async (createNoteRequest: CreateNoteRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/note`, createNoteRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateNote = createAsyncThunk(
    "updateNote/Notes",
    async (updateNoteRequest: UpdateNoteRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ title: updateNoteRequest.title, text: updateNoteRequest.text, isPinned: updateNoteRequest.isPinned })

            const res = await axios.put(`/note/${updateNoteRequest.noteID}`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getNotes = createAsyncThunk(
    "getNotes/Notes",
    async (getNoteRequest: GetNoteRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/note`, getNoteRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteNote = createAsyncThunk(
    "deleteNote/Notes",
    async (deleteNoteRequest: DeleteNoteRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            await axios.patch(`/note/${deleteNoteRequest.noteID}`, deleteNoteRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return deleteNoteRequest.noteID;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);
