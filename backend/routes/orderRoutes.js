import express from 'express'
import { addOrderItems, getOrderByID, updateOrderToPaid } from '../controller/orderController.js'
import protect from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems)
Router.route('/:id').get(protect, getOrderByID)
Router.route('/:id/pay').put(protect, updateOrderToPaid)

export default Router
