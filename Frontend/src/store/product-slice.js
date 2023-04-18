import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: false,
        addProduct: false,
        fetchProducts: false,
        products: [],
        totalQty: 0,
        categoryQty: []
    },
    reducers: {
        pending(state, action) {
            state.loading = true
        },
        error(state, action) {
            state.error = true
            state.loading = false
        },
        success(state, action) {
            state.loading = false
            state.error = false
            state.products = action.payload
            state.fetchProducts = true
        },
        add(state) {
            state.addProduct = true
        }
    }
})
export const productActions = productSlice.actions
export default productSlice