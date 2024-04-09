import asyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"

import UserVerification from "../models/userVerification.js"

import sendVerification from "../mailOptions/sendVerification.js"

import path from 'path'
import express from 'express'
const app = express()
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'backend/views')))



// desc @Auth user / Register user
// route POST api/users/
//@access public




const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    const newUser = await User.create({
        name,
        email,
        password,
        verified: false
    })

    if (newUser) {
        sendVerification(newUser, res)
    } else {
        res.status(401)
        throw new Error('User creation was unsuccessfully')
    }
})


// desc @Auth user / Register user
// route POST api/users/verify/:userId/:uniqueString
//@access private

const verifyEmail = asyncHandler(async (req, res) => {


    const { userId, uniqueString } = req.params
    const redirectLink = `http://localhost:3000/confirmverification/:${userId}/:${uniqueString}`

    const emailExist = await UserVerification.findOne({ userId })


    if (emailExist) {
        const expiresAt = emailExist.expiresAt
        const hashedUniqueString = emailExist.uniqueString

        if (expiresAt < Date.now()) {
            const deleteExpiredEmail = await UserVerification.deleteOne({ userId })
            if (deleteExpiredEmail) {
                //success
                const deleteUserRecord = User.deleteOne({ userId })

                if (deleteUserRecord) {
                    let message = 'Link has expired . Please register again'
                    return res.redirect(`${redirectLink}?error=true&message=${message}`)



                } else {
                    let message = 'Deleting user record failed'
                    return res.redirect(`${redirectLink}?error=true&message=${message}`)
                }



            } else {
                let message = 'Expired link not deleted'
                return res.redirect(`${redirectLink}?error=true&message=${message}`)
            }
        } else {
            const compareString = await bcrypt.compare(uniqueString, hashedUniqueString)

            if (compareString) {
                const updateUserData = await User.updateOne({ _id: userId }, { verified: true })
                if (updateUserData) {

                    const deleteUserVerification = await UserVerification.deleteOne({ userId })
                    if (deleteUserVerification) {

                        return res.redirect(redirectLink)
                    } else {
                        let message = 'Internal Error'
                        return res.redirect(`${redirectLink}?error=true&message=${message}`)
                    }


                } else {
                    let message = 'Internal error'
                    return res.redirect(`${redirectLink}?error=true&message=${message}`)
                }

            } else {
                let message = 'Invalid Verification details. Please check your Email '
                return res.redirect(`${redirectLink}?error=true&message=${message}`)

            }
        }



    } else {
        let message = 'Link cannot be found . Please register again'
        return res.redirect(`${redirectLink}?error=true&message=${message}`)

    }


})

const linkMessage = asyncHandler(async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'backend', 'views', 'index.html'))
})




export { registerUser, verifyEmail, linkMessage }


