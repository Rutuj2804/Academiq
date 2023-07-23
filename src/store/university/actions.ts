import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const addUniversity = createAsyncThunk("addUniversity/University", async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/university");

            return res.data.data;
        } catch (err) {
            return rejectWithValue(err)
        }
    }
);
