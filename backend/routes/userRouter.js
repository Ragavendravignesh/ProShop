import express from 'express'
import { authUser } from '../controller/userController.js'

const Router = express.Router()

Router.route('/login').post(authUser)

export default Router