import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { updateLoading } from "../loading/slice";

export const getCountries = createAsyncThunk(
    "getCountries/University",
    async (_, thunkAPI) => {
        try {

            thunkAPI.dispatch(updateLoading(1))

            const res = await axios.get("/location");

            const countries = [];

            for (let i = 0; i < res.data.data.length; i++) {
                countries.push({
                    name: res.data.data[i].name,
                    value: res.data.data[i]._id,
                    iso2: res.data.data[i].iso2
                });
            }

            thunkAPI.dispatch(updateLoading(-1))
            
            return countries;
        } catch (err) {

            thunkAPI.dispatch(updateLoading(-1))

            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getStates = createAsyncThunk(
    "getStates/University",
    async (countryID: string, thunkAPI) => {
        try {

            thunkAPI.dispatch(updateLoading(1))

            const res = await axios.get(`/location/${countryID}`);

            const states = [];

            for (let i = 0; i < res.data.data.states.length; i++) {
                states.push({
                    name: res.data.data.states[i].name,
                    value: res.data.data.states[i]._id,
                });
            }

            thunkAPI.dispatch(updateLoading(-1))
            
            return states;
        } catch (err) {

            thunkAPI.dispatch(updateLoading(-1))
            
            return thunkAPI.rejectWithValue(err);
        }
    }
);
