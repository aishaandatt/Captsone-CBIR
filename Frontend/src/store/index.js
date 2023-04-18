import { configureStore } from "@reduxjs/toolkit";
import adminActions from "./admin-slice";
import authActions from "./auth-slice";
import productActions from "./product-slice";

const store = configureStore({
    reducer: {
        auth: authActions.reducer,
        product: productActions.reducer,
        admin: adminActions.reducer
    }
})

export default store