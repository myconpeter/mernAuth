import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useResetPasswordMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ChangePassword = () => {
    const { userId, resetString } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [user, setUser] = useState(userId)
    // const [string, setString] = useState(resetString)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const { userInfo } = useSelector((state) => state.auth)




    useEffect(() => {
        if (userInfo) {
            navigate('/')

        }
    }, [navigate, userInfo])

    const onSubmit = async (e) => {
        e.preventDefault()

        const res = await resetPassword({ password, confirmPassword, userId, resetString })


        if (res.error) {
            toast.error(res.error.data.message)

        } else {


            navigate('/login')
            toast.success(`Password Reset Successful, Please Log In To Continue`)

        }

    }

    return (
        <div className='loginPage'>

            <form onSubmit={onSubmit} className='LoginForm'>
                <div>
                    <h2>Reset Password</h2>
                </div>






                <div className='eachInput'>

                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => (setPassword(e.target.value))} />
                </div>


                <div className='eachInput'>

                    <label htmlFor="">Confirm Password</label>
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => (setConfirmPassword(e.target.value))} />
                </div>

                {isLoading ? <Loader /> : <button type='submit'>Reset</button>}






            </form>
        </div>
    )
}

export default ChangePassword