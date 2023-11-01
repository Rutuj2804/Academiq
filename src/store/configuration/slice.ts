import { createSlice } from "@reduxjs/toolkit";
import { ConfigurationsState } from "./types";
import { getDemandType, getDemandTypes } from "./actions";

const initialState: ConfigurationsState = {
    demandTypes: [],
    demandType: {},
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
};

export const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDemandTypes.fulfilled, (s, a) => {
            s.demandTypes = a.payload
        })
        builder.addCase(getDemandType.fulfilled, (s, a) => {
            s.demandType = a.payload
        })
    }
});

export default configurationSlice.reducer;
