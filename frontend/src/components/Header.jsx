import './Header.css'
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice';



const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)


    const [logoutApiCall] = useLogoutMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/')


        } catch (err) {
            console.log(err)

        }
    }
    return (
        <div>
            <header className="header">
                <Link>
                    <h1 className='mern'>MERN AUTH</h1>
                </Link>

                {!userInfo ? (<>
                    <div className='userAction'>
                        <Link to='/login' className='eachAction' >

                            <MdLogin />

                            <p>LogIn</p>


                        </Link>

                        <Link to='/signup' className='eachAction' >

                            <FaUserPlus />

                            <p>SignUp</p>


                        </Link>

                    </div></>) : (<>
                        <div className='userAction'>
                            <Link className='eachAction' >
                                <div>
                                    <div onClick={logoutHandler}>{userInfo.data.name}</div>
                                </div>

                                <MdLogin />




                            </Link>



                        </div>

                    </>)}


            </header>

            <ToastContainer />
            <Outlet />
        </div>
    )
}

export default Header