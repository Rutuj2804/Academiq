import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";
import { CreateDemandLetterRequest, DeleteDemandLetterRequest, GetDemandsRequest } from "./types";
import { getToken } from "../../utils/helpers";

export const getDemandsGlobal = createAsyncThunk(
    "getDemandsGlobal/Demand",
    async (getDemandsRequest: GetDemandsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/demand/get/`, getDemandsRequest, config);

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

export const getDemandsCount = createAsyncThunk(
    "getDemandsCount/Demand",
    async (getDemandsRequest: GetDemandsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/demand/count/`, getDemandsRequest, config);

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

export const getDemandTypes = createAsyncThunk(
    "getDemandTypes/Demand",
    async (universityID: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.get(`/config/demand-types/${universityID}`, config);

            const data = []
            for (let i = 0; i < res.data.data.length; i++) {
                data.push({
                    name: res.data.data[i].name,
                    value: res.data.data[i]._id
                })
            }

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
    }
);

export const createDemandLetter = createAsyncThunk(
    "createDemandLetter/Demand",
    async (createDemandLetterRequest: CreateDemandLetterRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/demand/`, createDemandLetterRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            createDemandLetterRequest.navigate("/demand-letters")

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

export const deleteDemandLetter = createAsyncThunk(
    "deleteDemandLetter/Demand",
    async (deleteDemandLetterRequest: DeleteDemandLetterRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/demand/delete`, deleteDemandLetterRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            thunkAPI.dispatch(getDemandsCount({ universityID: deleteDemandLetterRequest.universityID, isActive: "" }))

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
