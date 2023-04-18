// import { authActions } from "./auth-slice";
import { productActions } from "./product-slice";
import { adminActions } from "./admin-slice";
import api from "../Components/api";
import axios from "axios";

export const getUsers = () => async dispatch => {
    dispatch(adminActions.pending())
    const token = localStorage.getItem('token')
    await api.get('/admin/getall', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            // console.log('users are', response.data)
            dispatch(adminActions.successUsers(response.data))
        })
        .catch(error => {
            console.log(error)
            dispatch(adminActions.error())
        })
}

//Add Product
//Fetch product
export const addProduct = (image, name, breed, description, age, category) => async dispatch => {
    dispatch(productActions.pending())
    const token = localStorage.getItem('token')
    await api.post('/admin/add', { image, name, breed, description, age, category }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            console.log(response.data)
            dispatch(productActions.add())
        })
        .catch(error => {
            console.log(error)
            dispatch(productActions.error())
        })
}
export const storeImageInServer = (formData) => async dispatch => {
    dispatch(productActions.pending())
    try {
        const res = await axios.post('http://localhost:4000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res)
    }
    catch (err) {
        console.log(err)
        dispatch(productActions.error())
    }
}

//END Add 
//Start Fetch 
export const fetchProduct = () => async dispatch => {
    const token = localStorage.getItem('token')
    await api.get('/admin/fetch', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            // console.log(response.data)
            dispatch(productActions.success(response.data))
        }).catch(error => {
            console.log(error)
            dispatch(adminActions.error())
        })
}
//END Fetch
//Start Delete User
export const deleteUserRedux = (id) => async dispatch => {
    dispatch(adminActions.pending())
    try {
        const token = localStorage.getItem('token')
        const resp = await api.delete(`/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        dispatch(adminActions.deleteUserSuccess())
    }
    catch (err) {
        console.log(err)
        dispatch(adminActions.error())
    }
}
//END Delete User
//Start Delete Product
export const deleteProductRedux = (id) => async dispatch => {
    dispatch(adminActions.pending())
    try {
        const token = localStorage.getItem('token')
        const resp = await api.delete(`/admin/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp)
        alert('Deleted')
        dispatch(adminActions.deleteProductSuccess())
    }
    catch (err) {
        console.log(err)
        dispatch(adminActions.error())
    }

}
//END Delete Product
//Start Delete File From Server
export const deleteImageFromServer = (image) => async dispatch => {
    dispatch(adminActions.pending())
    {
        try {
            const resp = await axios.delete(`http://localhost:4000/uploads/${image}`)
            console.log(resp)
        }
        catch (err) {
            console.log("Image Not Delete Error", err)
            dispatch(adminActions.error())
        }
    }
}
//END Delete File From Server
export const editProductRedux = (userId, image, name, breed, description, age, category) => async dispatch => {
    dispatch(adminActions.pending())

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',

            }
        }
        const body = JSON.stringify({
            image,
            name,
            breed,
            description,
            age,
            category,
        })
        const res = await api.put(`/admin/products/edit/${userId}`, body, config);
        console.log(res)
        alert('Product Updated Successfully')
        dispatch(adminActions.editProductFormDone())

    }
    catch (err) {
        alert('Error Updating Profile')

    }


}
export const editProductCancel = () => async dispatch => {
    dispatch(adminActions.editProductFormDone())
}
export const editProductStart = () => async dispatch => {
    dispatch(adminActions.editProductForm())
}