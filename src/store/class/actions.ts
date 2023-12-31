import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";
import { AddClassRequest, DeleteAllClassRequest, DeleteClassRequest, GetClassRequest, UpdateClassRequest } from "./types";
import { getToken } from "../../utils/helpers";

export const getUniversityClass = createAsyncThunk(
    "getUniversityClass/Class",
    async (getClassRequest: GetClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/class/`, getClassRequest,config);

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

export const getMyClassesCountOnTabNumbers = createAsyncThunk(
    "getMyClassesCountOnTabNumbers/Class",
    async (getClassRequest: GetClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/class/count`, getClassRequest, config);

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

export const createClass = createAsyncThunk(
    "createClass/Class",
    async ({ name, description, navigate, universityID }: AddClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ name, description, universityID })

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

export const updateClass = createAsyncThunk(
    "updateClass/Class",
    async ({ name, description, navigate, universityID, classID }: UpdateClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ name, description, universityID })

            const res = await axios.put(`/class/${classID}`, request, config);

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

export const deleteClass = createAsyncThunk(
    "deleteClass/Class",
    async ({ classID, universityID }: DeleteClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID, classID })

            const res = await axios.patch(`/class/delete`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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

export const deleteAllClass = createAsyncThunk(
    "deleteAllClass/Class",
    async ({ universityID }: DeleteAllClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID })

            const res = await axios.patch(`/class/delete/all`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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

export const deleteClassPermanent = createAsyncThunk(
    "deleteClassPermanent/Class",
    async ({ classID, universityID }: DeleteClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID, classID })

            const res = await axios.patch(`/class/delete/permanent`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data[0]
            }))

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

export const deleteAllClassPermanent = createAsyncThunk(
    "deleteAllClassPermanent/Class",
    async ({ universityID }: DeleteAllClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID })

            const res = await axios.patch(`/class/delete/all/permanent`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data[0]
            }))

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

export const reactivateClass = createAsyncThunk(
    "reactivateClass/Class",
    async ({ classID, universityID }: DeleteClassRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID, classID })

            const res = await axios.patch(`/class/reactivate`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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