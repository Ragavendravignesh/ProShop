import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import {notFound, errorHandler } from './middleware/errorMiddleware.js'

import productsRouter from './routes/productRoutes.js'
import userRouter from './routes/userRouter.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is Running...')
})

app.use('/api/products', productsRouter)
app.use('/api/users', userRouter)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode at Port ${PORT}`)
)
