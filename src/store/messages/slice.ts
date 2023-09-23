import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, MessageState } from "./types";

const initialState: MessageState = {
    messages: [],
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
