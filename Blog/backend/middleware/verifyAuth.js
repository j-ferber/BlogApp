const jwt = require('jsonwebtoken')
const User = require('../models/User')


const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = authorization.split(' ')[1]
  try {
    const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = await User.findOne({ _id })
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({error: 'Previous login expired.'})
  }
}

module.exports = verifyAuth