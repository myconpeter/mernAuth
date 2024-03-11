import './Header.css'
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Header = () => {
    return (
        <div>
            <header className="header">
                <Link>
                    <h1 className='mern'>MERN AUTH</h1>
                </Link>

                <div className='userAction'>
                    <Link to='/login' className='eachAction' >

                        <MdLogin />

                        <p>LogIn</p>


                    </Link>

                    <Link to='/signup' className='eachAction' >

                        <FaUserPlus />

                        <p>SignUp</p>


                    </Link>

                </div>
            </header>

            <ToastContainer />
            <Outlet />
        </div>
    )
}

export default Header