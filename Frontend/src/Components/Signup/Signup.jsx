import '../Login/Login.scss'
import './ButtonAppBar.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = ({ handleInputChange, handleSubmit }) => {
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
                <input type='text' className='inputField' name='name' placeholder='Name' onChange={handleInputChange} required={true} />
                <input type='text' className='inputField' name='email' placeholder='E-Mail' onChange={handleInputChange} required={true} />
                <input type='password' className='inputField' name='password' placeholder='Password' onChange={handleInputChange} required={true} />
                <br></br>
                <button class='button button1' type='submit'>SignUp</button>
            </div>
        </form>
    )
}

export default Signup