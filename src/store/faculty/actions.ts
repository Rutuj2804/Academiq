import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";

export const getUniversityFaculty = createAsyncThunk(
    "getUniversityFaculty/Faculty",
    async (university: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const res = await axios.get(`/faculty/${university}`);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getFacultyDetails = createAsyncThunk(
    "getFacultyDetails/Faculty",
    async (studentId: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    Bearer: `Bearer ${localStorage.getItem(
                        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                    )}`,
                },
            };

            const res = await axios.get(`/faculty/${studentId}`, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateFacultyDetails = createAsyncThunk(
    "updateFacultyDetails/Faculty",
    async (body: {}, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    Bearer: `Bearer ${localStorage.getItem(
                        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                    )}`,
                },
            };

            const res = await axios.post(`/faculty/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);
