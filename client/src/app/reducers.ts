import { combineReducers } from "@reduxjs/toolkit";

import usersReducer from '../features/usersSlice'
import lobbiesReducer from '../features/lobbiesSlice'

export const rootReducer = combineReducers({
    users: usersReducer,
    lobbies: lobbiesReducer
})