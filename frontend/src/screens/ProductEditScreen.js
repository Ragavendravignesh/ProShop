import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState('')

  const dispatch = useDispatch()

  const ProductDetails = useSelector((state) => state.ProductDetails)
  const { loading, error, product } = ProductDetails

  const ProductUpdate = useSelector((state) => state.ProductUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = ProductUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setPrice(product.price)
        setCountInStock(product.countInStock)
      }
    }
  }, [product, productId, dispatch, history, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock
      })
    )
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/productlist'>
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                value={name}
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='image'>
              <Form.Label>Image url:</Form.Label>
              <Form.Control
                type='text'
                value={image}
                placeholder='Enter image url'
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='description'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type='text'
                value={description}
                placeholder='Enter description'
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='brand'>
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                placeholder='Enter brand'
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='category'>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                value={category}
                placeholder='Enter category'
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='price'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                value={price}
                placeholder='Enter Price'
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='countInStock'>
              <Form.Label>Count In Stock:</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                placeholder='Enter count in stock'
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default ProductEditScreen
