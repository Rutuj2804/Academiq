import { combineReducers } from "@reduxjs/toolkit"
import auth from "./auth/slice"
import settings from "./settings/slice"
import messages from "./messages/slice"
import layout from "./layout/slice"
import breadcrumps from "./breadcrumps/slice"
import university from "./university/slice"
import location from "./location/slice"
import loading from "./loading/slice"
import holiday from "./holiday/slice"
import classR from "./class/slice"
import student from "./student/slice"
import faculty from "./faculty/slice"
import staff from "./staff/slice"
import roles from "./roles/slice"
import course from "./course/slice"
import activity from "./activity/slice"
import assignment from "./assignment/slice"
import note from "./note/slice"

export const reducers = combineReducers({ 
    auth,
    settings,
    messages,
    layout,
    breadcrumps,
    university,
    location,
    loading,
    holiday,
    class: classR,
    student,
    faculty,
    staff,
    roles,
    course,
    activity,
    assignment,
    note
})