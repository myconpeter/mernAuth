import asyncHandler from "express-async-handler"
import User from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"

// desc @Auth user / set Token
// route POST api/users/auth
//@acess public

const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            email: email,
            password: password
        })


    }
    else {
        res.status(401)
        throw new Error('Invaild email or password')
    }
})


// desc @Auth user / Register user
// route POST api/users/
//@acess public

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('User creation was unsuccefully')
    }
})


// desc @Auth user / Register user
// route POST api/users/logout
//@acess private

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.json({ msg: "User logged out" }).status(200)
})

// desc @Auth user / Register user
// route GET api/users/profile
//@acess private

const userProfile = asyncHandler(async (req, res) => {

    res.json({ msg: "Profile User" }).status(200)
})


// desc @Auth user / Register user
// route PUT api/users/profile
//@acess private

const userEdit = asyncHandler(async (req, res) => {

    res.json({ msg: "Edit User" }).status(200)
})

export { authUser, userEdit, userProfile, logoutUser, registerUser }