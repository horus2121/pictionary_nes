import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    id: number | null,
    title: string,
    description: string,
    mode: string,
}

const initialState: InitialState = {
    id: null,
    title: '',
    description: '',
    mode: '',
}

const lobbiesSlice = createSlice({
    name: 'lobbies',
    initialState,
    reducers: {
        quitLobby(state) {
            state.id = null
            state.title = ''
            state.description = ''
            state.mode = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(CreateLobby.fulfilled, (state, action) => {
            console.log("Fulfilled...")
            console.log(action.payload)
            if (!action.payload.errors) {
                const { id, title, description, mode } = action.payload.lobby

                state.id = id
                state.title = title
                state.description = description
                state.mode = mode
            }
        })
    }
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

export const { quitLobby } = lobbiesSlice.actions

export default lobbiesSlice.reducer