import asyncHandler from "express-async-handler"

// desc @Auth user / set Token
// route POST api/users/auth
//@acess public

const authUser = asyncHandler(async (req, res) => {

    res.json({ msg: "Auth User" }).status(200)
})


// desc @Auth user / Register user
// route POST api/users/
//@acess public

const registerUser = asyncHandler(async (req, res) => {

    res.json({ msg: "Register User" }).status(200)
})


// desc @Auth user / Register user
// route POST api/users/logout
//@acess private

const logoutUser = asyncHandler(async (req, res) => {

    res.json({ msg: "Logout User" }).status(200)
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