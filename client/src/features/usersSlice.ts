import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isLoggedIn: boolean,
    id: number | null,
    username: string,
    authority: string,
    userStatus: number | null
}

const initialState: InitialState = {
    isLoggedIn: false,
    id: null,
    username: '',
    authority: '',
    userStatus: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, () => {
            console.log("Loading...")
        }).addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.logged_in) {
                const { id, username, authority } = action.payload.user

                state.isLoggedIn = true
                state.id = id
                state.username = username
                state.authority = authority
            } else {
                alert(action.payload.error)
            }
        }).addCase(loginUser.rejected, () => {
            console.log("Rejected...")
        }).addCase(SignUpUser.pending, () => {
            console.log("Loading...")
        }).addCase(SignUpUser.fulfilled, (state, action) => {
            if (action.payload.success) {
                // const { id, username, authority } = action.payload.user

                // state.isLoggedIn = true
                // state.id = id
                // state.username = username
                // state.authority = authority
                alert("You've created a new account!")
            } else {
                alert(action.payload.error)
            }
        }).addCase(SignUpUser.rejected, (state, action) => {
            console.log("Invalid username or password...")
        }).addCase(LogoutUser.fulfilled, (state) => {

            state.isLoggedIn = false
            state.id = null
            state.username = ''
            state.authority = ''
            state.userStatus = null
        })
    },
})


export const loginUser = createAsyncThunk('users/loginUser', async (user: any) => {

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password
        })
    })

    return res.json()
})

export const LogoutUser = createAsyncThunk('users/logoutUser', async () => {

    const res = await fetch('/logout', {
        method: "DELETE"
    })

})

export const SignUpUser = createAsyncThunk('users/signUpUser', async (user: any) => {

    const res = await fetch('/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: user.username,
                password: user.password,
                password_confirmation: user.password_confirmation
            }
        })
    })
    const json = res.json()

    return json
})

export default usersSlice.reducer