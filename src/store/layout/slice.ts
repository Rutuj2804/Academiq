import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    AddUpdateNote,
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
    notes: {
        isOpen: false,
        type: null,
        index: -1
    }
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
        setNotesPopup: (state, action: PayloadAction<AddUpdateNote>) => {
            state.background_modules = action.payload.isOpen;
            state.notes = action.payload;
            state.popup = action.payload.isOpen
        },
        setSearch: (state, action: PayloadAction<boolean>) => {
            state.background_modules = action.payload;
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
            state.background_modules = action.payload.isOpen;
            state.popup = action.payload.isOpen;
            state.delete.isOpen = action.payload.isOpen;
            state.delete.callback = action.payload.callback;
            state.delete.text = action.payload.text;
        },
        setAssignment: (state, action: PayloadAction<AssignmentModal>) => {
            state.background_modules = action.payload.isOpen;
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
    setNotesPopup,
} = layoutSlice.actions;

export default layoutSlice.reducer;
