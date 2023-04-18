import '../Login/Login.scss'
import './ButtonAppBar.css'
const Signup = ({ handleInputChange, handleSubmit }) => {

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