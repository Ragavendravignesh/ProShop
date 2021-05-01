import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, userId, dispatch, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/userlist'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          { loadingUpdate && <Loader/> }
          { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
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
