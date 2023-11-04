import { createSlice } from "@reduxjs/toolkit";
import { DemandState } from "./types";
import { deleteDemandLetter, getDemandDetails, getDemandTypes, getDemandsCount, getDemandsGlobal, setResponseOnDemand } from "./actions";

const initialState: DemandState = {
    demands: [],
    demand: {},
    demandTypes: [],
    display: {
        all: 0,
        active: 0,
        deleted: 0
    },
    pagination: {
        currentDocuments: 0,
        currentPage: 0,
        totalDocuments: 0,
        totalPages: 0
    }
};

export const demandSlice = createSlice({
    name: "demand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDemandsGlobal.fulfilled, (s, a) => {
            s.demands = a.payload.demandLetters
            s.pagination = a.payload.pagination
        })
        builder.addCase(getDemandsCount.fulfilled, (s, a) => {
            s.display = a.payload
        })
        builder.addCase(getDemandTypes.fulfilled, (s, a) => {
            s.demandTypes = a.payload
        })
        builder.addCase(deleteDemandLetter.fulfilled, (s, a) => {
            s.demands = s.demands.filter(t=>!a.payload.includes(t._id))
        })
        builder.addCase(getDemandDetails.fulfilled, (s, a) => {
            s.demand = a.payload
        })
        builder.addCase(setResponseOnDemand.fulfilled, (s, a) => {
            s.demand = a.payload
        })
    }
});

// export const {} = demandSlice.actions;

export default demandSlice.reducer;
