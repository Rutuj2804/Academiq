import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { AxiosError } from "axios";
import { errorType } from "../messages/types";
import { CreateUniversity } from "./types";
import { setUniversity } from "./slice";

export const addUniversity = createAsyncThunk("addUniversity/University", async (createUniversity: CreateUniversity, thunkAPI) => {
    thunkAPI.dispatch(updateLoading(1));    
    try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                    )}`,
                },
            };
            
            const res = await axios.post("/university", createUniversity, config);

            thunkAPI.dispatch(updateLoading(-1));

            createUniversity.navigate('/')

            return {
                name: res.data.data.name,
                value: res.data.data._id,
            };
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

export const getUniversity = createAsyncThunk("getUniversity/University", async (_, thunkAPI) => {
    thunkAPI.dispatch(updateLoading(1));

    try {
        const config = {
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    `${process.env.REACT_APP_AUTHENTICATION_LOCALSTORAGE_KEY}`
                )}`,
            },
        };

        const res = await axios.get(`/university/`, config);
        
        const data = []
        for (let i = 0; i < res.data.data.length; i++) {
            data.push({
                name: res.data.data[i].name,
                value: res.data.data[i]._id
            })
        }

        if(data.length) thunkAPI.dispatch(setUniversity(data[0]))
        else window.location.href = "/university/create"

        thunkAPI.dispatch(updateLoading(-1));

        return data;
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
});