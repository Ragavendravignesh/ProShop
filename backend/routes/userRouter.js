import express from 'express'
import { authUser, getUserProfile } from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/login').post(authUser)
Router.route('/profile').get(protect, getUserProfile)

export default Router