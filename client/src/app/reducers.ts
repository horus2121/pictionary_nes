import { combineReducers } from "@reduxjs/toolkit";

import usersReducer from '../features/usersSlice'

export const rootReducer = combineReducers({
    users: usersReducer
})