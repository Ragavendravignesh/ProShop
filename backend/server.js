import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productsRouter from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is Running...')
})

app.use('/api/products', productsRouter)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode at Port ${PORT}`)
)
