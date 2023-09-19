import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";
import { AddActivityRequest, GetActivityRequest } from "./types";
import { getToken } from "../../utils/helpers";

export const getActivitiesGlobal = createAsyncThunk(
    "getActivitiesGlobal/Activity",
    async (getActivityRequest: GetActivityRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ universityID: getActivityRequest.universityID, activityID: "" })

            const res = await axios.patch(`/activity/${getActivityRequest.isActive}`, body, config);

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

export const getActivityCountOnTabNumbers = createAsyncThunk(
    "getActivityCountOnTabNumbers/Activity",
    async (universityID: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ universityID: universityID, activityID: "" })

            const res = await axios.patch(`/activity/count/`, body, config);

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

export const getActivity = createAsyncThunk(
    "getActivity/Activity",
    async (classID: string | undefined, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
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

export const createActivity = createAsyncThunk(
    "createActivity/Activity",
    async ({ name, description, navigate, universityID, priority, deadline, sendEmailNotification, classID }: AddActivityRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ name, description, universityID, classID, priority, deadline, sendEmailNotification })

            const res = await axios.post(`/activity`, request, config); 

            if(res.data.statusCode === 200 || res.data.statusCode === 201)
                thunkAPI.dispatch(setMessage({
                    text: res.data.message,
                    type: errorType[1],
                    _id: res.data.data._id
                }))
            else
                thunkAPI.dispatch(setMessage({
                    text: res.data.message,
                    type: errorType[0],
                    _id: res.data.data._id
                }))

            thunkAPI.dispatch(updateLoading(-1));

            navigate(`/activities`)

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