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
    },
    extraReducers: builder => {
        builder.addCase(CreateLobby.fulfilled, (state, action) => {
            console.log("Fulfilled...")
            console.log(action.payload)
            if (!action.payload.error) {
                const { id, title, description, mode } = action.payload.lobby

                state.id = id
                state.title = title
                state.description = description
                state.mode = mode
            } else {
                alert(action.payload.error)
            }
        }).addCase(CreateLobby.rejected, () => {
            alert("Invalid Lobby set up...")
        }).addCase(EnterLobby.fulfilled, (state, action) => {
            console.log("Fulfilled...")
            console.log(action.payload)

            if (!action.payload.error) {
                const { id, title, description, mode } = action.payload.lobby

                state.id = id
                state.title = title
                state.description = description
                state.mode = mode
            } else {
                alert(action.payload.error)
            }
        }).addCase(QuitLobby.fulfilled, (state) => {

            state.id = null
            state.title = ''
            state.description = ''
            state.mode = ''
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

export const QuitLobby = createAsyncThunk('lobbies/quitLobby', async (lobby_id: number) => {

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