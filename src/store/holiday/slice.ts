import { createSlice } from "@reduxjs/toolkit";
import { HolidayState } from "./types";
import { getHolidayList } from "./actions";

const initialState: HolidayState = {
    holidays: []
};

export const holidaySlice = createSlice({
    name: "holiday",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHolidayList.fulfilled, (s, a) => {
            s.holidays = a.payload
        })
    }
});

// export const {} = holidaySlice.actions;

export default holidaySlice.reducer;
