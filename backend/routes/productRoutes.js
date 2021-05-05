import express from 'express'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const Router = express.Router()

Router.route('/').get(getProducts).post(protect, admin, createProduct)
Router.route('/:id/reviews').post(protect, createProductReview)
Router.route('/top').get(getTopProducts)
Router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default Router
