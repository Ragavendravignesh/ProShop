import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controller/userController.js'
import {protect, admin } from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/login').post(authUser)
Router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
Router.route('/').post(registerUser)
Router.route('/').get(protect, admin, getUsers)
Router.route('/:id').delete(protect, admin, deleteUser)

export default Router
