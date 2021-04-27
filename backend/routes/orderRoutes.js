import express from 'express'
import { addOrderItems, getOrderByID } from '../controller/orderController.js'
import protect from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems)
Router.route('/:id').get(protect, getOrderByID)

export default Router
