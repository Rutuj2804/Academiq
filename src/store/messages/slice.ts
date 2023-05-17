import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { MessageState, errorType } from "./types";

const initialState: MessageState = {
    text: "",
    type: errorType[1]
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<MessageState>) => {
            state.text = action.payload.text
            state.type = action.payload.type
        }
    },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
