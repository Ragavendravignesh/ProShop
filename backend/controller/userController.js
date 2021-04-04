import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Email or password is incorrect')
  }
})

export { authUser }
