import { createSlice } from "@reduxjs/toolkit";
import { EventState } from "./types";
import { getEvents } from "./actions";

const initialState: EventState = {
    events: []
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (s, a) => {
            s.events = a.payload
        })
    }
});

// export const {} = eventSlice.actions;

export default eventSlice.reducer;
