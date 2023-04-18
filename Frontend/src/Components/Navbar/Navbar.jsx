import React, { useEffect } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logo from '../../assets/DALL.png'
import './Navbar.scss'
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import { useState } from 'react';
import { fetchUserName } from '../../store/user-actions';
import { isAdminFunc, loginFunc, logoutFunc, signupFunc, tokenFunc } from '../../store/auth-actions';
import { Modal } from '@mui/material';
const Navbar = (props) => {
    const data = useSelector((state) => state.auth.data)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
    };
    const [log, setLog] = useState('Login')
    const [userData, setUserData] = useState(null)
    const isAdm = useSelector((state) => state.auth.isAdmin)
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(loginFunc(userData))
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        dispatch(signupFunc(userData))
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const goToAdmin = () => {
        navigate('/admin')
    }
    useEffect(() => {
        dispatch(tokenFunc())
        dispatch(isAdminFunc())
        console.log(isAdm)
    })
    // useEffect(() => {
    //     if (token) {
    //         dispatch(fetchUserName())

    //     }
    // }, [])
    const handleLogout = async () => {
        dispatch(logoutFunc())
        navigate('/')

    }
    const goToEdit = async () => {
        navigate('/edit')
    }
    //MODAL
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>

            <div style={{ alignContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                        <Toolbar>
                            <a href='/upload'>

                                <img
                                    style={{ height: '51px', width: '58px', marginRight: '15px' }}
                                    src={logo}
                                    alt=''
                                // sx={{ mr: 2 }}

                                />
                            </a>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ color: '#143898', fontWeight: '500' }}>
                                Welcome {data ? data.name : ''}
                            </Typography>

                            {token ? <button className="button button1" onClick={handleLogout}>Logout</button> : <button onClick={handleOpen} className="button button1">Log In</button>}
                            {isAdm ? <button class="button button1" onClick={goToAdmin}>Admin</button> : ""}
                            {token ? <button className='button button1' onClick={goToEdit}>Edit</button> : ''}
                        </Toolbar>
                    </AppBar>
                </Box>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button onClick={(e) => setLog('Login')} style={log === 'Login' ? { borderBottom: '2px', borderColor: '#ffbd59' } : {}}>Login</Button>
                                <Button onClick={(e) => setLog('Signup')} style={log === 'Signup' ? { borderBottom: '2px', borderColor: '#ffbd59' } : {}}>SignUp</Button>
                            </div>
                        </div>
                        {log === 'Login' ?
                            <Login handleInputChange={handleInputChange} handleSubmit={handleLogin} />
                            :
                            <Signup handleInputChange={handleInputChange} handleSubmit={handleSignup} />
                        }
                        {/* {JSON.stringify(isLog)} */}
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Navbar