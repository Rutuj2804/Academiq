import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { LoginData } from "./types";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";

export const loginUser = createAsyncThunk(
    "loginUser/Auth",
    async (data: LoginData, thunkAPI) => {
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

            const res = await axios.post(
                `/authentication/signin`,
                data,
                config
            );

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.token;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            if(err instanceof AxiosError){
                thunkAPI.dispatch(setMessage({
                    text: err?.response?.data.message,
                    type: errorType[0],
                    _id: Date.now().toString()
                }))
            }


            return thunkAPI.rejectWithValue(err);
        }
    }
);
