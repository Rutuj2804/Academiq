import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";

export const getUniversityClass = createAsyncThunk(
    "getUniversityClass/Class",
    async (university: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const res = await axios.get(`/faculty/${university}`);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            if (err instanceof AxiosError) {
                thunkAPI.dispatch(
                    setMessage({
                        text: err?.response?.data.message,
                        type: errorType[0],
                        _id: Date.now().toString(),
                    })
                );
            }

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getClass = createAsyncThunk(
    "getClass/Class",
    async (classID: string | undefined, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem(
                        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                    )}`,
                },
            };

            const res = await axios.get(`/class/${classID}`, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));
            if (err instanceof AxiosError) {
                thunkAPI.dispatch(
                    setMessage({
                        text: err?.response?.data.message,
                        type: errorType[0],
                        _id: Date.now().toString(),
                    })
                );
            }

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const createClass = createAsyncThunk(
    "createClass/Class",
    async ({ name, description, navigate }: { name: string, description: string, navigate: NavigateFunction }, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem(
                        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                    )}`,
                },
            };

            const request = JSON.stringify({ name, description })

            const res = await axios.post(`/class`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

            thunkAPI.dispatch(updateLoading(-1));

            navigate(`/class/${res.data.data._id}`)

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            if (err instanceof AxiosError) {
                thunkAPI.dispatch(
                    setMessage({
                        text: err?.response?.data.message,
                        type: errorType[0],
                        _id: Date.now().toString(),
                    })
                );
            }

            return thunkAPI.rejectWithValue(err);
        }
    }
);