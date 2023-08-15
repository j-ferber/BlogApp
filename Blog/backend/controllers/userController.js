const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({error: 'All fields are required'})
  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ error: 'No account with that username.' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: 'Incorrect password.' })
  const accessToken = jwt.sign(
    {_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3d'}
  )
  return res.status(200).json({username: user.username, accessToken})
}

const signup = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({error: 'All fields are required'})
  const match = await User.findOne({ username })
  if (match) return res.status(400).json({ error: 'That username is already in use.' })
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const newUser = await User.create({ username, password: hash })
  return res.status(200).json({user: newUser})
}

module.exports = {login, signup}