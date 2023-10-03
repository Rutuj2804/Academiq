import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { getToken } from "../../utils/helpers";
import { CreateFacultyRequest, DeleteFacultyRequest, GetUniversityFacultyRequest, UpdateFacultyRequest } from "./types";
import { setMessage } from "../messages/slice";
import { AxiosError } from "axios";
import { errorType } from "../messages/types";

export const getUniversityFaculty = createAsyncThunk(
    "getUniversityFaculty/Faculty",
    async (getUniversityFacultyRequest: GetUniversityFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/`, getUniversityFacultyRequest, config);

            thunkAPI.dispatch(updateLoading(-1));

            return res.data.data;
        } catch (err) {
            console.log(err);
            
            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getFacultyCountOnTabNumbers = createAsyncThunk(
    "getFacultyCountOnTabNumbers/Faculty",
    async (universityID: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/count/`, { universityID }, config);

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
                    "Authorization": `Bearer ${getToken()}`,
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

export const createFacultyDetails = createAsyncThunk(
    "createFacultyDetails/Faculty",
    async (body: CreateFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/faculty/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            body.navigate("/faculties")

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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
    async (body: UpdateFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.put(`/faculty/${body.facultyID}`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            body.navigate("/faculties")

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

            return res.data.data;
        } catch (err) {
            console.log(err);

            thunkAPI.dispatch(updateLoading(-1));

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteFaculty = createAsyncThunk(
    "deleteFaculty/Faculty",
    async (deleteFacultyRequest: DeleteFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/delete`, deleteFacultyRequest, config);

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

export const deleteAllFaculty = createAsyncThunk(
    "deleteAllFaculty/Faculty",
    async (deleteFacultyRequest: DeleteFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/delete/all`, deleteFacultyRequest, config);

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

export const deleteFacultyPermanent = createAsyncThunk(
    "deleteFacultyPermanent/Faculty",
    async (deleteFacultyRequest: DeleteFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/delete/permanent`, deleteFacultyRequest, config);

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

export const deleteAllFacultyPermanent = createAsyncThunk(
    "deleteAllFacultyPermanent/Faculty",
    async (deleteFacultyRequest: DeleteFacultyRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/faculty/delete/all/permanent`, deleteFacultyRequest, config);

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