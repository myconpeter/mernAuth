import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => (state.auth))

    useEffect(() => {
        if (userInfo) {

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
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