import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import './AdminPage.scss'
import { deleteUserRedux, getUsers, } from '../../store/admin-actions';
const AdminPage = () => {
    const users = useSelector((state) => state.admin.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])
    const deleteUser = async (id) => {
        window.location.reload(true)
        dispatch(deleteUserRedux(id))
    }
    return (
        <div className='main'>
            <Navbar />
            <div className="body" >
                <p>USERS</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>Dr. {user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                <td>{user._id}</td>
                                <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPage


