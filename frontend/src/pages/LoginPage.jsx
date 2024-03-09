import React, { useState } from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className='loginPage'>

            <form onSubmit={onSubmit} className='LoginForm'>
                <div>
                    <h2>Log In</h2>
                </div>

                <div className='eachInput'>

                    <label htmlFor="">Email Address</label>
                    <input type="email" placeholder='Enter Email' value={email} onChange={(e) => (setEmail(e.target.value))} />
                </div>


                <div className='eachInput'>

                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => (setPassword(e.target.value))} />
                </div>

                <button type='submit'>Log in</button>

                <div className='newCustomer'>
                    <p>New Customer?  </p>

                    <Link to='/signup'> Create Account</Link>
                </div>

            </form>
        </div>
    )
}

export default LoginPage