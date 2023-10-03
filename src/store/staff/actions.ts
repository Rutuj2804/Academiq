import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { getToken } from "../../utils/helpers";
import { CreateStaffRequest, DeleteStaffRequest, GetUniversityStaffRequest } from "./types";
import { setMessage } from "../messages/slice";
import { AxiosError } from "axios";
import { errorType } from "../messages/types";

export const getUniversityStaff = createAsyncThunk(
    "getUniversityStaff/Staff",
    async (getUniversityStaffRequest: GetUniversityStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/`, getUniversityStaffRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getStaffCountOnTabNumbers = createAsyncThunk(
    "getStaffCountOnTabNumbers/Staff",
    async (universityID: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/count`, { universityID },config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getStaffDetails = createAsyncThunk(
    "getStaffDetails/Staff",
    async (studentId: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.get(`/staff/${studentId}`, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const createStaffDetails = createAsyncThunk(
    "createStaffDetails/Staff",
    async (body: CreateStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/staff/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            body.navigate("/staffs")

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateStaffDetails = createAsyncThunk(
    "updateStaffDetails/Staff",
    async (body: {}, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/staff/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteStaff = createAsyncThunk(
    "deleteStaff/Staff",
    async (deleteStaffRequest: DeleteStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/delete`, deleteStaffRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;

        } catch (err) {
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

export const deleteAllStaff = createAsyncThunk(
    "deleteAllStaff/Staff",
    async (deleteStaffRequest: DeleteStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/delete/all`, deleteStaffRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;

        } catch (err) {
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

export const deleteStaffPermanent = createAsyncThunk(
    "deleteStaffPermanent/Staff",
    async (deleteStaffRequest: DeleteStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/delete/permanent`, deleteStaffRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;

        } catch (err) {
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

export const deleteAllStaffPermanent = createAsyncThunk(
    "deleteAllStaffPermanent/Staff",
    async (deleteStaffRequest: DeleteStaffRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/staff/delete/all/permanent`, deleteStaffRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;

        } catch (err) {
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