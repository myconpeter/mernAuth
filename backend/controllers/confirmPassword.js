import asyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js"

import PasswordReset from "../models/passwordReset.js"

import resetLink from "../mailOptions/sendResetLink.js"

import path from 'path'
import express from 'express'
const app = express()
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'backend/views')))

import nodemailer from 'nodemailer';

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

const getResetLink = asyncHandler(async (req, res) => {

})


export {
    confirmEmail
}