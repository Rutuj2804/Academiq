import { combineReducers } from "@reduxjs/toolkit"
import auth from "./auth/slice"
import settings from "./settings/slice"

export const reducers = combineReducers({ 
    auth,
    settings
})