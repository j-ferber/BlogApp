const blogController = require('../controllers/blogController')
const express = require('express')
const router = express.Router()
const verifyAuth = require('../middleware/verifyAuth')

router.route('/')
  .get(blogController.getAllPosts)

router.use(verifyAuth)

router.route('/')
  .post(blogController.createNewPost)

router.route('/user')
  .get(blogController.getUserPosts)

router.route('/:id')
  .get(blogController.getSinglePost)
  .patch(blogController.updatePost)
  .delete(blogController.deletePost)

module.exports = router