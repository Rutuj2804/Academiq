import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState, errorType } from "./types";

const initialState: MessageState = {
    messages: [{ _id: "2", text: "Successfully executed transaction." , type: errorType[1] }],
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload];
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter(
                (m) => m._id !== action.payload
            );
        },
    },
});

export const { setMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
