import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>

            <div className='home'>
                <div>
                    <h2> MERN Authentication</h2>
                </div>

                <div>
                    <p className='text'>

                        This  project is a simple example of how to build authentication into a MERN application. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam cupiditate tenetur laborum dolore, suscipit enim voluptas, error et est cumque nemo tempore quia dolores iste non unde sit autem ipsum.
                    </p>
                </div>

                <div className='buttons'>

                    <Link to='/login' className='login'>LogIn</Link>
                    <Link to='/signup' className='register'>Register</Link>
                </div>
            </div>


        </div>

    )
}

export default HomePage