import User from '../models/userModels.js'
import ConfirmPassword from '../models/passwordRest.js'
import asyncHandler from 'express-async-handler'

import resetLink from '../mailOptions/sendResetLink.js'

import express from 'express'

const app = express()

app.use(resetLink)

// post request from the form

const confirmEmail = asyncHandler(async(req, res)=>{

    const {email} = req.body
   
    const foundUser = await User.findOne({email})

    if(foundUser){
       resetLink({foundUser, res})

    } else {
        res.status(401)
        throw new Error('Incorrect Email')
    }



}) 


export {
    confirmEmail
}