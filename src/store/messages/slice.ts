import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./types";

const initialState: MessageState = {
    messages: [
        { _id: "1", text: "This is Success Message", type: "SUCCESS" },
        { _id: "2", text: "This is ERROR Message", type: "ERROR" },
    ],
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
