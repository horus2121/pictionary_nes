import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface InitialState {
    id: number | null,
    title: string,
    description: string,
    mode: string,
    userID: number | null
}

const initialState: InitialState = {
    id: null,
    title: '',
    description: '',
    mode: '',
    userID: null
}

const lobbiesSlice = createSlice({
    name: 'lobbies',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(CreateLobby.fulfilled, (state, action) => {
            if (!action.payload.error) {
                const { id, title, description, mode, user_id } = action.payload.lobby

                state.id = id
                state.title = title
                state.description = description
                state.mode = mode
                state.userID = user_id
            } else {
                console.log(action.payload.error)
            }
        }).addCase(CreateLobby.rejected, () => {
            alert("Invalid Lobby set up...")
        }).addCase(EnterLobby.fulfilled, (state, action) => {

            if (!action.payload.error) {
                const { id, title, description, mode, user_id } = action.payload.lobby

                state.id = id
                state.title = title
                state.description = description
                state.mode = mode
                state.userID = user_id
            } else {
                console.log(action.payload.error)
            }
        }).addCase(QuitLobby.fulfilled, (state) => {

            state.id = null
            state.title = ''
            state.description = ''
            state.mode = ''
            state.userID = null
        })
    }
})

export const EnterLobby = createAsyncThunk('lobbies/enterLobby', async (lobby_id: number) => {

    const res = await fetch('/enter_lobby', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lobby_id: lobby_id
        })
    })
    const json = res.json()

    return json
})

export const CreateLobby = createAsyncThunk('lobbies/createLobby', async (lobby: any) => {

    const res = await fetch('/lobbies', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: lobby.title,
            description: lobby.description,
            password: lobby.password,
            mode: lobby.mode
        })
    })
    const json = res.json()

    return json
})

export const QuitLobby = createAsyncThunk('lobbies/quitLobby', async (lobby_id: number | null) => {

    const res = await fetch('/quit_lobby', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lobby_id: lobby_id
        })
    })
    const json = res.json()

    return json
})

export default lobbiesSlice.reducer