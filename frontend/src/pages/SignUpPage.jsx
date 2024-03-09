import React, { useState } from 'react'
import './SignUpPage.css'
import { Link } from 'react-router-dom'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className='loginPage'>

            <form onSubmit={onSubmit} className='LoginForm'>
                <div>
                    <h2>Sign Up</h2>
                </div>

                <div className='eachInput'>

                    <label htmlFor="">Email Address</label>
                    <input type="email" placeholder='Enter Email' value={email} onChange={(e) => (setEmail(e.target.value))} />
                </div>
                <div className='eachInput'>

                    <label htmlFor="">Full Name</label>
                    <input type="text" placeholder='Enter Full Name' value={name} onChange={(e) => (setName(e.target.value))} />
                </div>


                <div className='eachInput'>

                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => (setPassword(e.target.value))} />
                </div>
                <div className='eachInput'>

                    <label htmlFor="">Confirm Password</label>
                    <input type="password" placeholder='Enter Password' value={confirmpassword} onChange={(e) => (setConfirmpassword(e.target.value))} />
                </div>

                <button type='submit'>Register</button>

                <div className='newCustomer'>
                    <p>Already have an Account ? </p>

                    <Link to='/login'> Login</Link>
                </div>

            </form>
        </div>
    )
}

export default SignUpPage