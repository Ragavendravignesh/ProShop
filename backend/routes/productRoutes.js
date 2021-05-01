import express from 'express'
import { getProducts, getProductById, deleteProduct } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').get(getProducts)
Router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default Router
