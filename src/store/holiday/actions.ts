import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";

export const getHolidayList = createAsyncThunk(
    "getHolidayList/Holiday",
    async (country: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const res = await axios.get(`/utils/holiday/${country.toUpperCase()}`);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);
