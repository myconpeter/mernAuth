import express from 'express'
import { authUser, userEdit, userProfile, logoutUser } from '../controllers/userControllers.js'
import{registerUser, verifyEmail, linkMessage} from '../controllers/userSignUpAndConfirm.js'
import { protect } from '../middleware/authMiddlewre.js'

const router = express.Router()

router.post('/auth', authUser);

router.post('/logout', logoutUser);

router.post('/', registerUser);

router.get('/verify/:userId/:uniqueString', verifyEmail)

router.get('/linkmessage', linkMessage)


router.route('/profile').get(protect, userProfile).put(protect, userEdit)


export default router