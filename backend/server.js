import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is Running...')
})

app.get('/api/products/', (req, res) => {
  res.send(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)

  res.send(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server is running ${process.env.NODE_ENV} mode at Port ${PORT}`)
)
