import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)




    useEffect(() => {
        if (userInfo) {
            navigate('/')

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await login({ email, password })


        if (res.error) {
            toast.error(res.error.data.message)

        } else {

            dispatch(setCredentials({ ...res }))
            navigate('/')
            toast.success(`Welcome ${res.data.name}`)

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

                {isLoading ? <Loader /> : <button type='submit'>Log in</button>}



                <div className='newCustomer'>
                    <p>New Customer?  </p>

                    <Link to='/signup'> Create Account</Link>
                </div>

                <div className='newCustomer'>
                    <Link to='/resetpassword'> Forgotten Password ?  </Link>
                </div>

            </form>
        </div>
    )
}

export default LoginPage