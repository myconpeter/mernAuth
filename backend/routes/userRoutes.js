import express from 'express'
import { authUser, userEdit, userProfile, logoutUser, registerUser } from '../controllers/userControllers.js'

const router = express.Router()

router.post('/auth', authUser);

router.post('/logout', logoutUser);

router.post('/', registerUser);

// router.put('/profile', userEdit)

// router.get('/profile', userProfile)

router.route('/profile').get(userProfile).put(userEdit)


export default router