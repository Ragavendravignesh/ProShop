import express from 'express'
import { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders} from '../controller/orderController.js'
import protect from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').post(protect, addOrderItems)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderByID)
Router.route('/:id/pay').put(protect, updateOrderToPaid)

export default Router
