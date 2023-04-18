import { authActions } from "./auth-slice";
import api from "../Components/api";
export const loginFunc = (userData) => async dispatch => {
    dispatch(authActions.pending())
    try {
        const response = await api.post('/auth/login', userData)
        console.log(response)
        if (response.status === 200) {
            dispatch(authActions.login(response.data.user))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        }
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
    }
}

export const signupFunc = (userData) => async dispatch => {
    dispatch(authActions.pending())
    try {
        const response = await api.post('/auth/signup', userData);
        console.log(response.data)
        dispatch(authActions.login())
        localStorage.setItem('token', response.data.token)
        // console.log(response)
        localStorage.setItem('userInfo', JSON.stringify(response.data.newUser))
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
    }
}
export const logoutFunc = () => async dispatch => {
    try {
        dispatch(authActions.logout())
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
    }
    catch (error) {
        console.log(error.response, error)
        dispatch(authActions.error())
    }

}
export const tokenFunc = () => async dispatch => {
    try {
        if (localStorage.getItem('token')) {
            dispatch(authActions.tokenFind())
        }
    }
    catch (error) {
        dispatch(authActions.error())
    }
}
export const isAdminFunc = () => async dispatch => {
    try {
        const isAdmin = JSON.parse(localStorage.getItem('userInfo'))

        console.log("hi", isAdmin.isAdmin)
        if (isAdmin.isAdmin) {
            dispatch(authActions.adminFind())
        }
    }
    catch (error) {
        dispatch(authActions.error())
    }
}