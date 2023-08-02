import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";

export const getUniversityStudents = createAsyncThunk(
    "getUniversityStudents/Students",
    async (university: string, thunkAPI) => {
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

            const res = await axios.get(`/students/${university}`, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getStudentDetails = createAsyncThunk(
    "getStudentDetails/Students",
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

            const res = await axios.get(`/students/${studentId}`, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateStudentDetails = createAsyncThunk(
    "updateStudentDetails/Students",
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

            const res = await axios.post(`/students/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);
