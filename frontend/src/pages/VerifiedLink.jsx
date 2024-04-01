import './VerifiedLink.css'
import { IoMdMail } from "react-icons/io";

const VerifiedLink = () => {
  return (
    <div className='body'>
        <div className="card">
      <div className='cardContent'>
        <i className="checkmark"><IoMdMail /></i>
      </div>
        <h1 className='.h1'>Confirm Email</h1> 
        <p className='p'>We have sent you a confirmation Email ;<br/> Please click the verification link to confirm your account!</p>
        <a href="https://www.gmail.com"> Email</a>
      </div>
    </div>
  )
}

export default VerifiedLink