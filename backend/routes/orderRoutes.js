import express from 'express'
import { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} from '../controller/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderByID)
Router.route('/:id/pay').put(protect, updateOrderToPaid)
Router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default Router
