import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import './ProfileEdit.scss'
import { useDispatch } from "react-redux";
import { logoutFunc } from '../../store/auth-actions';
import api from '../api';
import { editUserProfile } from '../../store/user-actions';
const ProfileEdit = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo._id
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: userInfo.name,
        email: userInfo.email,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const { name, email, oldPassword, newPassword, confirmPassword } = formData;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()
    const handleLogout = async () => {
        dispatch(logoutFunc())
        navigate('/')
        // setFlag(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(editUserProfile(userId, name, email, oldPassword, newPassword, confirmPassword, userInfo.isAdmin))
        // window.location.reload(true)
        // if (newPassword !== confirmPassword) {
        //     alert('Passwords do not match');
        // } else {
        //     try {
        //         const config = {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         };

        //         const body = JSON.stringify({
        //             name,
        //             email,
        //             oldPassword,
        //             newPassword,
        //         });

        //         const res = await api.put(`/api/users/${userId}`, body, config);

        //         console.log(res.data);
        //         alert('Profile updated successfully!');
        //     } catch (err) {
        //         console.error(err.response.data);
        //         alert('Error updating profile');
        //     }
        // }
    };
    return (
        <div>
            <Navbar onFireLogout={handleLogout} />
            <div className="update">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Old Password</label>
                        <input
                            type='password'
                            name='oldPassword'
                            value={oldPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type='password'
                            name='newPassword'
                            value={newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileEdit