import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { PayPalButton } from 'react-paypal-button-v2'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  
  const orderDetails = useSelector((state) => state.orderDetails)
  const { error, loading, order } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onLoad = () => { setSdkReady(true) }
      document.body.appendChild(script)
    }
    if (successPay || !order || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, orderId, dispatch, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult) 
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2> Shipping </h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
              {console.log(order)}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelievered ? (
              <Message variant='success'>
                Delievered on {order.isDelieveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delievered</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {order.paymentMethod}
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your order is Empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2> Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              { loadingPay && <Loader/> }
                <PayPalButton 
                amount = {order.totalPrice}
                onSuccess = {successPaymentHandler} />
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default OrderScreen
