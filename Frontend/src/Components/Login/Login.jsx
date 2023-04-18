// import React, { useState } from 'react'
import './Login.scss'
import './ButtonAppBar.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ handleSubmit, handleInputChange }) => {
    // const [email, setEmail] = useState(null)
    // const [password, setPassword] = useState(null)
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const data = { email, password };
    //     props.onLogin(data);
    // }
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
        if (token) {
            navigate('/upload')
        }
    })
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="fields">
                <input type='text' className='inputField' name='email' placeholder='E-Mail' onChange={handleInputChange} required={true} />
                <input type='password' className='inputField' name='password' placeholder='Password' onChange={handleInputChange} required={true} />
                <br></br>
                <button className='button button1' type='submit'>Login</button>
            </div>
        </form>
    )
}

export default Login