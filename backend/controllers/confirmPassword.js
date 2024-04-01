import User from '../models/userModels.js'
import ConfirmPassword from '../models/passwordRest.js'
import asyncHandler from 'express-async-handler'


import transporter from '../mailOptions/transporter.js'

// post request from the form

const confirmEmail = asyncHandler(async(req, res)=>{

    const {email} = req.body
   
    const findEmail = await User.findOne({email})

    if(findEmail){
        res.status(200).json({
            message: 'okk'
        })

    } else {
        res.status(401)
        throw new Error('Incorrect Email')
    }



}) 


export {
    confirmEmail
}