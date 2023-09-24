import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";
import { AddCourseRequest, GetCoursesRequest, GetCourseRequest, UpdateCourseRequest, DeleteCourseRequest, DeleteAllCourseRequest } from "./types";
import { getToken } from "../../utils/helpers";

export const getCoursesGlobal = createAsyncThunk(
    "getCoursesGlobal/Course",
    async (getCoursesRequest: GetCoursesRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/course/`, getCoursesRequest, config);

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

export const getMyCoursesCountOnTabNumbers = createAsyncThunk(
    "getMyCoursesCountOnTabNumbers/Course",
    async (getCoursesRequest: GetCoursesRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ universityID: getCoursesRequest.universityID })

            const res = await axios.patch(`/course/count/${getCoursesRequest.isActive}`, body, config);

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

export const getCourse = createAsyncThunk(
    "getCourse/Course",
    async (getCourseRequest: GetCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {

            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/course/co`, getCourseRequest, config);

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

export const createCourse = createAsyncThunk(
    "createCourse/Course",
    async ({ name, description, navigate, universityID }: AddCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ name, description, universityID })

            const res = await axios.post(`/course`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

            thunkAPI.dispatch(updateLoading(-1));

            navigate(`/courses`)

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

export const updateCourse = createAsyncThunk(
    "updateCourse/Course",
    async ({ name, description, navigate, universityID, courseID }: UpdateCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ name, description, universityID })

            const res = await axios.put(`/course/${courseID}`, request, config);

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

            thunkAPI.dispatch(updateLoading(-1));

            navigate(`/courses`)

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

export const deleteCourse = createAsyncThunk(
    "deleteCourse/Course",
    async (deleteCourseRequest: DeleteCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/course/delete`, deleteCourseRequest, config);

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

export const deleteAllCourse = createAsyncThunk(
    "deleteAllCourse/Course",
    async ({ universityID }: DeleteAllCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID })

            const res = await axios.patch(`/course/delete/all`, request, config);

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

export const deleteCoursePermanent = createAsyncThunk(
    "deleteCoursePermanent/Course",
    async ({ courseID, universityID }: DeleteCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID, courseID })

            const res = await axios.patch(`/course/delete/permanent`, request, config);

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

export const deleteAllCoursePermanent = createAsyncThunk(
    "deleteAllCoursePermanent/Course",
    async ({ universityID }: DeleteAllCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID })

            const res = await axios.patch(`/course/delete/all/permanent`, request, config);

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

export const reactivateCourse = createAsyncThunk(
    "reactivateCourse/Course",
    async ({ courseID, universityID }: DeleteCourseRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const request = JSON.stringify({ universityID, courseID })

            const res = await axios.patch(`/course/reactivate`, request, config);

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