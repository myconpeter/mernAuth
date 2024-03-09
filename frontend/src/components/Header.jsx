import './Header.css'
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <div>
            <header className="header">
                <div>
                    <h1>MERN AUTH</h1>
                </div>

                <div className='userAction'>
                    <Link to='/login' className='eachAction' >

                        <MdLogin />

                        <p>LogIn</p>


                    </Link>

                    <Link to='/register' className='eachAction' >

                        <FaUserPlus />

                        <p>SignUp</p>


                    </Link>

                </div>
            </header>
            <Outlet />
        </div>
    )
}

export default Header