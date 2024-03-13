import { useState, useEffect } from 'react'
import './SignUpPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/userApiSlice'


const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profile, { isLoading }] = useProfileMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        console.log(userInfo.data.name)
        setName(userInfo.data.name)
        setEmail(userInfo.data.email)


    }, [userInfo.setName, userInfo.setEmail])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error('Password do not Match')
        } else {
            const res = await profile({
                _id: userInfo._id,
                name,
                email,
                password


            })

            console.log(res)

            if (res.error) {
                toast.error(res.error.data.message)

            } else {

                dispatch(setCredentials({ ...res }))
                navigate('/')
                toast.success(`profile updated`)

            }

        }
    }

    return (
        <div className='loginPage'>

            <form onSubmit={onSubmit} className='LoginForm'>
                <div>
                    <h2>Update User</h2>
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

                <button type='submit'>Update</button>


            </form>
        </div>
    )
}

export default ProfilePage