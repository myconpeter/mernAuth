import asyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import bcrypt, { compare } from 'bcrypt'

import PasswordReset from "../models/passwordReset.js"

import resetLink from "../mailOptions/sendResetLink.js"

import path from 'path'
import express from 'express'
const app = express()
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'backend/views')))


import ConfirmPassword from "../models/passwordReset.js"

// post request from the form

const confirmEmail = asyncHandler(async (req, res) => {

    const { email } = req.body

    const foundUser = await User.findOne({ email })

    if (foundUser) {
        // console.log(foundUser)
        resetLink(foundUser, res)

    } else {
        res.status(401)
        throw new Error('Incorrect Email')
    }



})

/// check reset link

const checkResetLink = asyncHandler(async (req, res) => {
    const { userId, resetString } = req.params
    const redirectLink = `https://mernauth-p168.onrender.com/getPassword/:${userId}/:${resetString}`

    const checkResetLink = await ConfirmPassword.findOne({ userId })
    if (checkResetLink) {
        const expiresAt = checkResetLink.expiresAt
        const hashedResetString = checkResetLink.resetString
        if (expiresAt < Date.now()) {
            // it is expired
            const deleteExpiredLink = await ConfirmPassword.deleteOne({ userId })

            if (deleteExpiredLink) {
                let message = 'Password Link has expired . Please reset  your password again.'
                return res.redirect(`${redirectLink}?error=true&message=${message}`)

            } else {
                let message = 'cannot delete link . Please reset  your password again.'
                return res.redirect(`${redirectLink}?error=true&message=${message}`)
            }


        } else {
            // this link hasnt expired ooo
            // compare the resetString
            const compareResetString = await bcrypt.compare(resetString, hashedResetString)
            if (compareResetString) {
                return res.redirect(`http://localhost:3000/getPassword/${userId}/${resetString}`)

            } else {
                let message = 'fake link. Please reset  your password again.'
                return res.redirect(`${redirectLink}?error=true&message=${message}`)
            }
        }


    } else {
        let message = 'Password Link doesnt exist. Please reset  your password again.'
        return res.redirect(`${redirectLink}?error=true&message=${message}`)
    }

})



const getPassword = asyncHandler(async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'backend', 'views', 'index.html'))
})

const changePassword = asyncHandler(async (req, res) => {

    const { userId, resetString, password, confirmPassword } = req.body

    const checkUserId = await ConfirmPassword.findOne({ userId })
    // console.log(checkUserId.expiresAt)

    if (checkUserId) {
        if (checkUserId.expiresAt < Date.now()) {
            const deleteExpiredLink = await ConfirmPassword.deleteOne({ userId })
            if (deleteExpiredLink) {

            } else {
                res.status(406)
                throw new Error('cant delete')
            }
            // link has expired
        } else {
            // link hasnt expired
            const compareString = await bcrypt.compare(resetString, checkUserId.resetString)
            if (compareString) {
                if (password === confirmPassword) {
                    const updateUser = await User.findOne({ _id: userId })

                    if (updateUser) {

                        updateUser.password = password

                        const updatedPassword = await updateUser.save()

                        if (updatedPassword) {
                            const deletePassword = await ConfirmPassword.deleteOne({ userId })
                            if (deletePassword) {
                                res.status(200)
                                return res.json({ updatedPassword })
                            } else {
                                res.status(401)
                                throw new Error('cannot delete password')
                            }
                        } else {
                            res.status(401)
                            throw new Error('cannot update the user')
                        }
                    } else {
                        res.status(401)
                        throw new Error('User Not Found')
                    }

                } else {
                    res.status(401)
                    throw new Error('password doesnt no match')
                }

            } else {
                res.status(403)
                throw new Error('Incorrect reset string')
            }
        }


    } else {
        res.status(403)
        throw new Error('this userId doesnt exist')
    }

})


export {
    confirmEmail,
    checkResetLink,

    getPassword,
    changePassword
}