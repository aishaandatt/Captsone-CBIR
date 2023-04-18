import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        error: false,
        getUsers: false,
        deleteUser: false,
        deleteProduct: false,
        editProductForm: false,
        users: [],
    },
    reducers: {
        pending(state, action) {
            state.loading = true
        },
        error(state, action) {
            state.error = true
            state.loading = false
        },
        successUsers(state, action) {
            state.loading = false
            state.error = false
            state.users = action.payload
            state.getUsers = true
        },
        deleteUserSuccess(state) {
            state.deleteUser = true
            state.loading = false
        },
        deleteProductSuccess(state) {
            state.deleteProduct = true
            state.loading = false
        },
        editProductForm(state) {
            state.editProductForm = true
        },
        editProductFormDone(state) {
            state.editProductForm = false
        }
    }
})
export const adminActions = adminSlice.actions
export default adminSlice

//Add Slices for CRUD Later after Testing them normally in AdminPage Component