import { combineReducers } from "@reduxjs/toolkit"
import auth from "./auth/slice"
import settings from "./settings/slice"
import messages from "./messages/slice"
import layout from "./layout/slice"

export const reducers = combineReducers({ 
    auth,
    settings,
    messages,
    layout
})