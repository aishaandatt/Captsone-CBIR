// import jwt from 'jsonwebtoken';
import { authActions } from "./auth-slice";
import { productActions } from "./product-slice";
import api from "../Components/api";
export const fetchUserName = () => async dispatch => {
    dispatch(authActions.pending())
    const token = localStorage.getItem('token')
    await api.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
        .then(respone => {
            console.log(respone.data)
            dispatch(authActions.fetchUser(respone.data))
            if (respone.data.isAdmin === true) {
                dispatch(authActions.adminFind())
            }
        })
        .catch(error => {
            console.log(error)
            dispatch(authActions.error())
        })

}

export const editUserProfile = (userId, name, email, oldPassword, newPassword, confirmPassword, isAdmin) => async dispatch => {
    dispatch(authActions.pending())
    if (newPassword !== confirmPassword) {
        alert("Passwords Don't Match")
    }
    else {
        // try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            name,
            email,
            oldPassword,
            newPassword
        })
        await api.put(`/api/users/${userId}`, body, config)
            .then(response => {
                localStorage.setItem('userInfo', JSON.stringify({ "_id": userId, "name": name, "email": email, "isAdmin": isAdmin }))
                // localStorage.setItem('token', token)
                alert('Profile Updated Successfully')
            })
            .catch(err => {
                console.log(err)
                dispatch(authActions.error())
            })
        // console.log(res)
        // }
        // catch (err) {
        //     console.log(err.respone.data)
        //     alert('Error Updating Profile')
        // }
    }


}
//Instead of Add/Fetch - Convert these to Add/Display and add Remove from Favourite Later


// //Add Product
// //Fetch product
// export const addProduct = (name, description, price) => async dispatch => {
//     dispatch(productActions.pending())
//     const token = localStorage.getItem('token')
//     await api.post('/admin/add', { name, description, price }, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             console.log(response.data)
//             dispatch(productActions.add())
//         })
//         .catch(error => {
//             console.log(error)
//             dispatch(productActions.error())
//         })
// }
// export const fetchProduct = () => async dispatch => {
//     const token = localStorage.getItem('token')
//     await api.get('/admin/fetch', {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             console.log(response.data)
//             dispatch(productActions.success(response.data))
//         })
// }