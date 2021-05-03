import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

  res.send(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user.id,
    name: 'Sample Name',
    image: '/images/sample.jpg',
    description: 'Sample Description',
    brand: 'Test',
    category: 'Sample catergory',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()

  if (createProduct) {
    res.json(createdProduct)
  } else {
    res.status(401)
    throw new Error('Not able to create product')
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body

  if (product) {
    ;(product.user = req.user.id || product.id),
      (product.name = name || product.name),
      (product.image = image || product.image),
      (product.description = description || product.description),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.price = price || product.price),
      (product.countInStock = countInStock || product.countInStock),
      (product.rating = rating || product.rating),
      (product.numReviews = numReviews || product.numReviews)

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } else {
    res.status(401)
    throw new Error('Product not found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(401)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
