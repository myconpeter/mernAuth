import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useResetEmailMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const RecoveryEmail = () => {
    const [email, setEmail] = useState('')



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [resetEmail, { isLoading }] = useResetEmailMutation()

    const { userInfo } = useSelector((state) => state.auth)




    useEffect(() => {
        if (userInfo) {
            navigate('/')

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await resetEmail({ email })


        if (res.error) {
            toast.error(res.error.data.message)

        } else {


            navigate('/verifiedlink')


        }

    }

    return (
        <div className='loginPage'>

            <form onSubmit={onSubmit} className='LoginForm'>
                <div>
                    <h2>Confirm Email Address</h2>
                </div>

                <div className='eachInput'>

                    <label htmlFor=""> Email Address</label>
                    <input type="email" placeholder='Enter Email' value={email} onChange={(e) => (setEmail(e.target.value))} />
                </div>

                {isLoading ? <Loader /> : <button type='submit'>Reset</button>}

            </form>
        </div>
    )
}

export default RecoveryEmail