import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false, //success only but name here loggedIn
        loading: false,
        error: false,
        token: false,
        isAdmin: false,
        data: {},
    },
    reducers: {
        pending(state, action) {
            state.loading = true
        },
        login(state, action) {
            state.loading = false
            state.error = false
            state.loggedIn = true
            state.token = true
            // state.data = action.payload
            // state.data = action.payload
        },
        error(state, action) {
            state.error = true
            state.loading = false
        },
        logout(state, action) {
            // state.data = null
            state.loggedIn = false
            state.token = false
            state.isAdmin = false
        },
        fetchUser(state, action) {
            state.data = action.payload
            state.loggedIn = true
            state.token = true
        },
        tokenFind(state, action) {
            state.token = true
        },
        adminFind(state, action) {
            state.isAdmin = true
        },
        updateInfo(state, action) {
            state.loading = false
        }

    }
})
export const authActions = authSlice.actions
export default authSlice