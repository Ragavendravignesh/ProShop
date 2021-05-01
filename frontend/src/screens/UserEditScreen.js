import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if(!user.name || user._id !== userId ) {
        dispatch(getUserDetails(userId))
    } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
  }, [user, userId, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <>
    <Link className='btn btn-light my-3' to='/admin/userlist'>Go Back</Link>
    { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
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
            <FormGroup controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen
