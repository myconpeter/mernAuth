import React, { useState, useEffect } from 'react'
import './SignUpPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/userApiSlice'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error('Password do not Match')
        } else {
            const res = await register({ name, email, password })


            if (res.error) {
                toast.error(res.error.data.message)

            } else {

                
                navigate('/verifiedlink')
               

            }
        }
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

                {isLoading ? <Loader /> : <button type='submit'>Register</button>}

                <div className='newCustomer'>
                    <p>Already have an Account ? </p>

                    <Link to='/login'> Login</Link>
                </div>

            </form>
        </div>
    )
}

export default SignUpPage