import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";
import { getToken } from "../../utils/helpers";
import { CreateStudentRequest, DeleteStudentsRequest, GetUniversityStudentsRequest, UpdateStudentRequest } from "./types";
import { setMessage } from "../messages/slice";
import { errorType } from "../messages/types";
import { AxiosError } from "axios";

export const getUniversityStudents = createAsyncThunk(
    "getUniversityStudents/Students",
    async (getUniversityStudentsRequest: GetUniversityStudentsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/student/`, getUniversityStudentsRequest, config);

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

export const getStudentsCountOnTabNumbers = createAsyncThunk(
    "getStudentsCountOnTabNumbers/Students",
    async (universityID: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ universityID })

            const res = await axios.patch(`/student/count`, body, config);

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

export const getStudentDetails = createAsyncThunk(
    "getStudentDetails/Students",
    async (studentId: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.get(`/student/${studentId}`, config);

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

export const createStudentDetails = createAsyncThunk(
    "createStudentDetails/Students",
    async (body: CreateStudentRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.post(`/student/`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            body.navigate("/students")

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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

export const deleteStudents = createAsyncThunk(
    "deleteStudents/Students",
    async (deleteStudentRequest: DeleteStudentsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/student/delete`, deleteStudentRequest, config);

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

export const deleteAllStudents = createAsyncThunk(
    "deleteAllStudents/Students",
    async (deleteStudentRequest: DeleteStudentsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/student/delete/all`, deleteStudentRequest, config);

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

export const deleteStudentsPermanent = createAsyncThunk(
    "deleteStudentsPermanent/Students",
    async (deleteStudentRequest: DeleteStudentsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/student/delete/permanent`, deleteStudentRequest, config);

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

export const deleteAllStudentsPermanent = createAsyncThunk(
    "deleteAllStudentsPermanent/Students",
    async (deleteStudentRequest: DeleteStudentsRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.patch(`/student/delete/all/permanent`, deleteStudentRequest, config);

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

export const updateStudentDetails = createAsyncThunk(
    "updateStudentDetails/Students",
    async (updateStudentRequest: UpdateStudentRequest, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));

        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const body = JSON.stringify({ 
                universityID: updateStudentRequest.universityID,
                classID: updateStudentRequest.classID,
                email: updateStudentRequest.email,
                enrollnmentNo: updateStudentRequest.enrollnmentNo,
                admissionYear: updateStudentRequest.admissionYear,
                isActive: updateStudentRequest.isActive,
                address: updateStudentRequest.address,
                phone: updateStudentRequest.phone,
                alternatePhone: updateStudentRequest.alternatePhone,
                fathersName: updateStudentRequest.fathersName,
                mothersName: updateStudentRequest.mothersName,
                gender: updateStudentRequest.gender,
                bloodGroup: updateStudentRequest.bloodGroup,
                rollNumber: updateStudentRequest.rollNumber,
                extraField1: updateStudentRequest.extraField1,
                extraField2: updateStudentRequest.extraField2, 
            })

            const res = await axios.put(`/student/${updateStudentRequest.studentID}`, body, config);

            thunkAPI.dispatch(updateLoading(-1));

            updateStudentRequest.navigate("/students")

            thunkAPI.dispatch(setMessage({
                text: res.data.message,
                type: errorType[1],
                _id: res.data.data._id
            }))

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

export const getStudentFromClass = createAsyncThunk(
    "getStudentFromClass/Students",
    async (classId: string, thunkAPI) => {
        thunkAPI.dispatch(updateLoading(1));
        try {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
            };

            const res = await axios.get(`/student/c/${classId}`, config);

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
