import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Token is not correct')
    }
  } else {
    res.status(404)
    throw new Error('Authorization token not found')
  }
})

const admin = asyncHandler (async (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  }else {
    res.status(401)
    throw new Error('User is not an Admin')
  }
})

export { protect, admin }
