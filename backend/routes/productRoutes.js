import express from 'express'
import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

const Router = express.Router()

Router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.send(products)
  })
)

Router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.send(product)
    } else {
      res.status(404);
      throw new Error('Product not found')
    }
  })
)

export default Router
