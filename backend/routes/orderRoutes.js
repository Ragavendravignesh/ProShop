import express from 'express'
import { addOrderItems } from '../controller/orderController.js'
import protect from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems)

export default Router
