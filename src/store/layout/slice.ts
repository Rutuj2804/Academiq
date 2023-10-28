import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    AssignmentModal,
    DeleteModal,
    EventPostModal,
    LayoutState,
} from "./types";

const initialState: LayoutState = {
    sidebar: true,
    settings: false,
    background: false,
    background_modules: false,
    search: false,
    popup: false,
    profile: false,
    notifications: false,
    delete: {
        isOpen: false,
        callback: () => {},
        text: "",
    },
    assignment: {
        isOpen: false,
        type: null,
    },
    event: {
        isOpen: false,
        id: "",
    },
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<boolean>) => {
            if (action.payload) state.background = true;
            else state.background = false;
            state.settings = action.payload;
        },
        setSearch: (state, action: PayloadAction<boolean>) => {
            if (action.payload) state.background_modules = true;
            else state.background_modules = false;
            state.popup = action.payload;
            state.search = action.payload;
        },
        setEventPost: (state, action: PayloadAction<EventPostModal>) => {
            state.background_modules = action.payload.isOpen;
            state.popup = action.payload.isOpen;
            state.event.id = action.payload.id;
            state.event.isOpen = action.payload.isOpen;
        },
        setDelete: (state, action: PayloadAction<DeleteModal>) => {
            if (action.payload.isOpen) state.background_modules = true;
            else state.background_modules = false;
            state.popup = action.payload.isOpen;
            state.delete.isOpen = action.payload.isOpen;
            state.delete.callback = action.payload.callback;
            state.delete.text = action.payload.text;
        },
        setAssignment: (state, action: PayloadAction<AssignmentModal>) => {
            if (action.payload.isOpen) state.background_modules = true;
            else state.background_modules = false;
            state.popup = action.payload.isOpen;
            state.assignment.isOpen = action.payload.isOpen;
            state.assignment.type = action.payload.type;
        },
        setSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload;
        },
        setProfile: (state, action: PayloadAction<boolean>) => {
            state.profile = action.payload;
        },
        setNotifications: (state, action: PayloadAction<boolean>) => {
            state.notifications = action.payload;
        },
    },
});

export const {
    setSettings,
    setSidebar,
    setSearch,
    setProfile,
    setNotifications,
    setDelete,
    setAssignment,
    setEventPost,
} = layoutSlice.actions;

export default layoutSlice.reducer;
